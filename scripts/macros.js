/**
 * Utility functions for macros
 */
function MacrosPF1 () {}


/**
 * Returns the selected actors on scene that the player owns
 * If none selected, returns all the actors that player owns
 */
MacrosPF1.getActors = function () {
  const tokens = canvas.tokens.controlled;
  let actors = tokens.map(o => o.actor);
  if (!actors.length) actors = game.actors.entities.filter(o => o.hasPerm(game.user, "OWNER"));
  actors = actors.filter(o => o.hasPerm(game.user, "OWNER"));
  return actors
}

/**
 * Checks that required modules are available
 */
MacrosPF1.hasModule = function (moduleName) {
  return game.modules.has(moduleName) && game.modules.get(moduleName).active
}

/**
 * Checks that required modules are available
 */
MacrosPF1.applyBuff = function (command) {
  window.macroChain = [command]
  const macro = game.macros.find(o => o.name == "effet");
  if( !macro ) {
    return ui.notifications.warn("La macro <i>effet</i> n'a pas été importée ou vous ne disposez pas des permissions pour l'exécuter.");
  }
  macro.execute();
}

/**
 * Checks that required modules are available
 */
MacrosPF1.macroExec = function (macroName) {
  const pack = game.packs.get("pf1-fr.macrosfr");
  pack.getIndex().then( () => {
    console.log(macroName)
    const macro = pack.index.find(e => e.name === macroName);
    if( macro ) {
      console.log(macro._id)
      pack.getEntity(macro._id).then( m => m.execute() );
    }
  })
}

/************************************************
 * Dialog for skill check
 ************************************************/

class MacrosPF1SkillCheckDialog extends FormApplication {
  
  constructor(object, options) {
    super(object, options);
    
    if(options) {
      this.skill = options.skillId
      this.subskill = options.subSkillId
      this.checks = options.checks
      this.actor = game.actors.find( a => a._id == options.actorId )
      this.rollMode = options.rollMode
    }
  }
  
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "skillcheck",
      title: "Test de compétence",
      template: "modules/pf1-fr/templates/skillcheck-dialog.html",
      width: 650,
      height: "auto",
      closeOnSubmit: false,
      submitOnClose: false,
    });
  }
  
  async getData() {
    let data = {}
    data.actor = this.actor
    // sélectionner le bon bonus basé sur la spécialité
    if( this.subskill ) {
      data.skillbonus = this.actor.data.data.skills[this.skill].subSkills[this.subskill].mod
      data.subSkillName = this.actor.data.data.skills[this.skill].subSkills[this.subskill].name
    } else {
      data.skillbonus = this.actor.data.data.skills[this.skill].mod
    }
    
    data.checks = this.checks
    
    const pack = game.packs.get("pf1-fr.skillsfr");
    await pack.getIndex()
    
    const skillName = game.i18n.localize("PF1.Skill" + this.skill.charAt(0).toUpperCase() + this.skill.slice(1))
    let skillIdx = pack.index.find(e => e.name.toLowerCase() === skillName.toLowerCase());
    if( skillIdx ) {
      data.skillRef = TextEditor.enrichHTML(`@Compendium[pf1-fr.skillsfr.${skillIdx._id}]{${skillIdx.name}}`)
    }
    return data
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.check').click(event => this._onTest(event));
  }
  
  async _onTest(event) {
    event.preventDefault();
    const idx = event.currentTarget.closest(".check").dataset.idx;
    if( idx >= 0 && idx < this.checks.length ) {
      const check = this.checks[idx]
      // changer le template de traduction et le mode de lancer par défaut
      const oldTransl = game.i18n.translations.PF1.SkillCheck
      const oldRollMode = this.rollMode && game.settings.get("core", "rollMode") != this.rollMode ? game.settings.get("core", "rollMode") : null
      if( oldRollMode ) {
        await game.settings.set("core", "rollMode", this.rollMode)
      }
      game.i18n.translations.PF1.SkillCheck = `<b>{0}</b> <i>${check.name}</i><br/>DD : ${check.dd}`
      // sélectionner la bonne spécialité
      if( this.subskill ) {
        this.actor.rollSkill(`${this.skill}.subSkills.${this.subskill}`, {event: event, skipDialog: true});
      } else {
        this.actor.rollSkill(this.skill, {event: event, skipDialog: true});
      }
      game.i18n.translations.PF1.SkillCheck = oldTransl
      if( oldRollMode ) {
        await game.settings.set("core", "rollMode", oldRollMode)
      }
    }
    this.close()
  }  
  
}

/************************************************
 * Dialog for selecting skill to check
 ************************************************/

class MacrosPF1SkillChecksDialog extends FormApplication {
  
  static skillSpecialty = null
  static rollMode = null
  
  constructor(object, options) {
    super(object, options);
    
    this.rollMode = null
    
    if(options) {
      this.rollMode = options.rollMode
    }
  }
  
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "skillchecks",
      title: "Test de compétence",
      template: "modules/pf1-fr/templates/skillchecks-dialog.html",
      width: 720,
      height: 685,
      closeOnSubmit: false,
      submitOnClose: false,
    });
  }
  
  async getData() {
    let data = {}
    data.checks = []
    data.checksknow = []
    data.checksspec = []
    const pack = game.packs.get("pf1-fr.macrosfr");
    await pack.getIndex()
    let promises = []
    
    const actors = MacrosPF1.getActors()
    const actor = actors.length > 0 ? actors[0] : null
    
    for( let i = 0; i < pack.index.length; i++ ) {
      if( pack.index[i].name.startsWith("Test : ") ) {
        const macro = await pack.getEntry(pack.index[i]._id)
        const abbr = pack.index[i].name.slice(7)
        const skill = Object.keys(CONFIG.PF1.skills).find(key => abbr.toLowerCase().startsWith(CONFIG.PF1.skills[key].toLowerCase()))
        const bonus = skill && actor ? actor.data.data.skills[skill].mod : 0
        
        if( abbr.startsWith("Connaissance") ) {
          var regExp = /\(([^)]+)\)/;
          var matches = regExp.exec(abbr);
          data.checksknow.push( { name: pack.index[i].name, abbr: matches[1], icon: macro.img, bonus: bonus } )
        } else if( abbr.endsWith("*") ) {
          if( skill && actor ) {
            let hasSubSkill = false
            Object.keys(actor.data.data.skills[skill].subSkills).forEach( sk => {
              const subskill = actor.data.data.skills[skill].subSkills[sk]
              data.checksspec.push( { name: pack.index[i].name, abbr: `${abbr.slice(0, -1)} : ${subskill.name}`, icon: macro.img, bonus: subskill.mod, specialty: sk } )
              hasSubSkill = true
            });
            if( !hasSubSkill ) {
              data.checksspec.push( { name: pack.index[i].name, abbr: `Aucune spécialité en ${abbr.slice(0, -1)}`, icon: macro.img, bonus: bonus } )
            }
          }
          
        } else {
          data.checks.push( { name: pack.index[i].name, abbr: abbr, icon: macro.img, bonus: bonus } )
        }
      }
    }
    return data
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.check').click(event => this._onTest(event));
  }
  
  async _onTest(event) {
    event.preventDefault();
    const name = event.currentTarget.closest(".check").dataset.name;
    const specialty = event.currentTarget.closest(".check").dataset.specialty;
    this.close()
    if( name ) {
      // keep choice in storage
      if (typeof(Storage) !== "undefined") {
        localStorage.skillSpecialty = specialty
        localStorage.rollMode = this.rollMode
      } else {
        MacrosPF1SkillChecksDialog.skillSpecialty = specialty
        MacrosPF1SkillChecksDialog.rollMode = this.rollMode
      }
      
      MacrosPF1.macroExec(name)
    }
  }  

}

