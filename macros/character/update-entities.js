Id: UN955S6O6dX0xzmM
Name: Mettre à jour les aptitudes
Icon: systems/pf1/icons/skills/blue_18.jpg
------------
///// INFORMATIONS
//
// Cette macro ajoute les aptitudes sur un PJ (basé sur ses classes) 
// À utiliser typiquement après un passage de niveau ou à la création.
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

// SCRIPT

function getAbbr(name) {
  if(name == "Barbare") { return "Brb" }
  else if(name == "Prêtre combattant") { return "Prc" }
  else if(name == "Prêtre combattant") { return "Prc" }
  else if(name == "Archer-mage") { return "ArM" }
  else if(name == "Champion occultiste") { return "Chp" }
  else if(name == "Magus") { return "Mgs" }
  else if(name == "Chaman") { return "Chm" }
  else { return name.substring(0,3) }
};

const actors = MacrosPF1.getActors()

if (actors.length != 1) { 
  ui.notifications.error("Veuillez choisir un personnage dans la scène!")
} else {
  let actor = actors[0]

  Dialog.confirm({
    title: "Mise à jour des aptitudes",
    content: `Des aptitudes seront automatiquement ajoutées à <b>${actor.name}</b> en fonction de ses classes.`,
      yes: function() {

        let classes = []
        let classfeatures = []
        for(let i=0; i<actor.data.items.length; i++) {
          const item = actor.data.items[i]
          if(item.type == "feat" && item.data.featType == "classFeat") {
            classfeatures.push(item.name)
          } else if(item.type == "class") {
            classes.push(item)
          }
        }
        
        if(classes.length > 0) {
          const pack = game.packs.get("pf1-fr.classfeaturesfr");
          pack.getIndex().then(index => {
            let features = []
            classes.forEach(c => {
              let abbr = getAbbr(c.name)
              let level = Number(c.data.level)
              for(let lvl=1; lvl<=level; lvl++) {
                for(const i in index) { 
                  const f = index[i]
                  if(f.name.startsWith(`${abbr} ${lvl}:`) && classfeatures.indexOf(f.name) < 0) {
                    features.push(pack.getEntity(f._id))
                  }
                }
              }
            });
            Promise.all(features).then(list => {
              let toAdd = []
              list.forEach( f => { if(f.data.data.tags[0].indexOf("De base") >= 0) { toAdd.push(f) } } );
              actor.createEmbeddedEntity("OwnedItem", toAdd)
              ui.notifications.info(`${toAdd.length} aptitude(s) ajoutées!`)
            });
          });
        }
      },
      no: () => {}
  });
}
