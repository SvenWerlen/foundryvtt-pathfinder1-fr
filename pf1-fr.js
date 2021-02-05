import { SemanticVersion } from "/systems/pf1/module/semver.js";
import { ChangeLogWindow } from "./scripts/change-log.js";

Hooks.once("init", () => {

  console.log("PF1-fr | Init")
  
  game.settings.register("pf1-fr", "pf1frDisableENPacks", {
    name: "Désactiver les compendiums EN", 
    hint: "Désactive les compendiums du système d'orgine (pf1) afin d'accélérer la performance et la lisibilité de la bibliothèque", 
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => window.location.reload() });
  
  game.settings.register("pf1-fr", "pf1frHidePackDetails", {
    name: "Affichage compact", 
    hint: "Masque les détails des compendiums afin d'améliorer la lisibilité", 
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => ui.compendium.render() });
  
  game.settings.register("pf1-fr", "pf1frHighlightCombatant", {
    name: "Couleur de mise en évidence (combat)", 
    hint: "Met en évidence le jeton à qui c'est le tour de jouer (requiert le module Token Magic FX). Spécifiez la couleur souhaitée ou laisser vide pour désactiver cette fonctionnalité.", 
    scope: "world",
    config: true,
    default: "0xf9d907",
    type: String });
  
  /**
   * Track when the last changelog was shown
   */
  game.settings.register("pf1-fr", "changelogVersion", {
    name: "Changelog Version",
    scope: "client",
    config: false,
    type: String,
    default: "1.3.53",
  });
  
  game.settings.register("pf1-fr", "dontShowChangelog", {
    name: "Don't Automatically Show Changelog",
    scope: "client",
    config: false,
    type: Boolean,
    default: false,
  });
});

// Render Sidebar
Hooks.on("renderSidebarTab", (app, html) => {
  if (app instanceof Settings) {
    // Add changelog button
    let button = $(`<button>Changements PF1-fr</button>`);
    html.find("#game-details").append(button);
    button.click(() => {
      new ChangeLogWindow().render(true);
    });
  }
});

/** Remplace les liens vers les compétences **/
Hooks.once("ready", () => {
  const pack = game.packs.get("pf1-fr.skillsfr");
  pack.getIndex().then( () => {
    Object.keys(CONFIG.PF1.skills).forEach( id => {
      const skillName = game.i18n.localize(CONFIG.PF1.skills[id])
      let skill = pack.index.find(e => e.name.toLowerCase() === skillName.toLowerCase());
      if( skill ) {
        CONFIG.PF1.skillCompendiumEntries[id] = `pf1-fr.skillsfr.${skill._id}`
      }
    });
  })

  // Show changelog
  if (!game.settings.get("pf1-fr", "dontShowChangelog")) {
    const v = game.settings.get("pf1-fr", "changelogVersion") || "0.0.1";
    const changelogVersion = SemanticVersion.fromString(v);
    
    const curVersion = SemanticVersion.fromString(game.modules.get("pf1-fr").data.version);

    if (curVersion.isHigherThan(changelogVersion)) {
      const app = new ChangeLogWindow(changelogVersion);
      app.render(true);
      game.settings.set("pf1-fr", "changelogVersion", curVersion.toString());
    }
  }
  
});

Hooks.on("canvasInit", async function() {
  if( game.settings.get("pf1-fr", "pf1frDisableENPacks") ) {
    let toRemove = []
    await game.packs.forEach(function(p) { if( p.collection.startsWith("pf1.") ) { toRemove.push(p.collection) } });
    await toRemove.forEach( p => game.packs.delete(p))
    console.log("PF1-fr | Packs d'orgine (PF1) ont été retirés!")
  }
});

Hooks.on("renderCompendiumDirectoryPF", function(app, html, data) {
  if( game.settings.get("pf1-fr", "pf1frHidePackDetails") ) {
    html.find('footer.compendium-footer').hide();
  } else {
    html.find('footer.compendium-footer').show();
  }
});

Hooks.on("updateCombat", async function (data, delta) {
  if(!game.user.isGM) return;
         
  const color = game.settings.get("pf1-fr", "pf1frHighlightCombatant")
  if (color && typeof TokenMagic !== "undefined") { 
    // remove existing glow select
    for( let token of canvas.tokens.placeables.filter( t => t.TMFXhasFilterId("nextCombatant") ) ) {
      await token.TMFXdeleteFilters("nextCombatant");
    }
      
    // glow select current
    if( !game.combats.active ) return;
    const c = game.combats.active.combatant
    if( c && c.tokenId) {
      let combatant = canvas.tokens.placeables.find( t => t.id === c.tokenId )
      let params =
        [{
            filterType: "glow",
            filterId: "nextCombatant",
            color: color,
            animated: null
        }];
        await combatant.TMFXaddUpdateFilters(params);
    }
  }
})

Hooks.on("deleteCombat", async function (data, delta) {
  if(!game.user.isGM) return;
         
  const color = game.settings.get("pf1-fr", "pf1frHighlightCombatant")
  if (color && typeof TokenMagic !== "undefined") { 
    // remove existing glow select
    for( let token of canvas.tokens.placeables.filter( t => t.TMFXhasFilterId("nextCombatant") ) ) {
      await token.TMFXdeleteFilters("nextCombatant");
    }
  }
})

/**
 * Once the entire VTT framework is initialized, overwrite existing functions
 */
Hooks.on("renderActorSheet", async function( context, html, data) {
  if( !CONFIG.Actor.sheetClasses.character["PF1.Personnage"]) {
    return;
  }
  let sheetClass = CONFIG.Actor.sheetClasses.character["PF1.Personnage"].cls.prototype
  if(!sheetClass.pf1fr) {
    sheetClass.pf1fr = true;
    sheetClass.__proto__._onItemCreate = function(event) {
      event.preventDefault();
      const header = event.currentTarget;
      const type = header.dataset.type;
      const actor = this.actor;
      if(type == "attack") {
        
        // Show dialog
        renderTemplate("modules/pf1-fr/templates/attack-create-dialog.html", {}).then(dlg => {
          new Dialog({
            title: "Initialiser l'attaque",
            content: dlg,
            buttons: {
              create: {
                label: "Créer",
                callback: async function(html) {
                  let attack = html.find('#attack').val()
                  let ismelee = html.find('#cac')[0].checked
                  let attackType = header.dataset.attackType
                  let itemData = {
                    name: `New ${type.capitalize()}`,
                    type: type,
                    data: duplicate(header.dataset)
                  };
                  delete itemData.data["type"];
                  
                  if(attack.length == 0) {
                    return actor.createOwnedItem(itemData);
                  }
                  else {
                    let attackStr = attack
                    let attackList = []
                    let count = 0;
                    while(count++ < 10) {
                      const data = attackStr.match(/^(.*?) ([\+-][\+0-9/]+) (contact )?\((.*?)\)/)
                      if(data) {
                        attackStr = attackStr.substring(data[0].length)
                        const name = data[1].replace(/,/g, '').trim()
                        const dmg = data[4].match(/([\d\+d]+)(\/\d+-20)?(\/x\d)?/)
                        let bonusStr = data[2]
                        
                        // convert bonus +13/+8 into [13,8]
                        let bonusList = []
                        let countB = 0;
                        while(countB++ < 10) {
                          bonus = bonusStr.match(/^\/?([\+\d]+)/)
                          if(bonus) {
                            bonusStr = bonusStr.substring(bonus[0].length)
                            bonusList.push(Number(bonus[1]))
                          } else { break; }
                        }
                        console.log(bonusList)
                        
                        if(bonusList.length > 0 && dmg) {
                          const damages = dmg[1]
                          const crit = dmg[2] ? dmg[2].match(/\/(\d+)-20/)[1] : 20
                          const mult = dmg[3] ? Number(dmg[3].match(/\/x(\d)/)[1]) : 2
                          itemData = Importer.createAttack(
                            name, 
                            attack, 
                            "",     // no source
                            ismelee, 
                            "",     // no stat
                            damages, 
                            "?",
                            bonusList, 
                            crit, 
                            mult,
                            0);
                          itemData.data.attackType = attackType
                          await actor.createOwnedItem(itemData)
                        }
                      } else { break; }
                    }
                    return true
                  }
                }
              },
            },
          }).render(true);
        });
        
        return true;
      }
      // default behaviour (from system)
      const itemData = {
        name: `New ${type.capitalize()}`,
        type: type,
        data: duplicate(header.dataset)
      };
      delete itemData.data["type"];
      return this.actor.createOwnedItem(itemData);
    }
  }
});
