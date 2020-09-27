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
    data.skillbonus = this.actor.data.data.skills[this.skill].mod
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
      this.actor.rollSkill(this.skill, {event: event, skipDialog: true});
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
  
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "skillchecks",
      title: "Test de compétence",
      template: "modules/pf1-fr/templates/skillchecks-dialog.html",
      //width: 650,
      height: "auto",
      closeOnSubmit: false,
      submitOnClose: false,
    });
  }
  
  async getData() {
    let data = {}
    data.checks = []
    const pack = game.packs.get("pf1-fr.macrosfr");
    await pack.getIndex()
    let promises = []
    for( let i = 0; i < pack.index.length; i++ ) {
      if( pack.index[i].name.startsWith("Test d") && pack.index[i].name != "Test de compétence" ) {
        const macro = await pack.getEntry(pack.index[i]._id)
        data.checks.push( { name: macro.name, icon: macro.img } )
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
    this.close()
    if( name ) {
      MacrosPF1.macroExec(name)
    }
  }  

}

