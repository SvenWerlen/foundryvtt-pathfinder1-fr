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
