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

/************************************************
 * Spellcaster utility for casting prepared spells
 ************************************************/

class MacrosPF1SkillTestDialog extends FormApplication {
  
  constructor(object, options) {
    super(object, options);
    
    if(options) {
      this.skill = options.skillId
      this.tests = options.tests
      this.actor = game.actors.find( a => a._id == options.actorId )
      this.rollMode = options.rollMode
    }
  }
  
  static get defaultOptions() {
    console.log(super.defaultOptions)
    return mergeObject(super.defaultOptions, {
      id: "skilltest",
      title: "Test de compétence",
      template: "modules/pf1-fr/templates/skilltest-dialog.html",
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
    data.tests = this.tests
    
    console.log(this.actor.getContextNotesParsed("@Compendium[pf1-fr.skillsfr.QpgRsB4cDWDbeaeP]{Art de la magie}"))
    return data
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.test').click(event => this._onTest(event));
  }
  
  async _onTest(event) {
    event.preventDefault();
    const idx = event.currentTarget.closest(".test").dataset.idx;
    if( idx >= 0 && idx < this.tests.length ) {
      const test = this.tests[idx]
      // changer le template de traduction et le mode de lancer par défaut
      const oldTransl = game.i18n.translations.PF1.SkillCheck
      const oldRollMode = this.rollMode && game.settings.get("core", "rollMode") != this.rollMode ? game.settings.get("core", "rollMode") : null
      if( oldRollMode ) {
        await game.settings.set("core", "rollMode", this.rollMode)
      }
      game.i18n.translations.PF1.SkillCheck = `<b>{0}</b> <i>${test.name}</i><br/>DD : ${test.dd}`
      this.actor.rollSkill(this.skill, {event: event, skipDialog: true});
      game.i18n.translations.PF1.SkillCheck = oldTransl
      if( oldRollMode ) {
        await game.settings.set("core", "rollMode", oldRollMode)
      }
    }
    this.close()
  }  
  
}

