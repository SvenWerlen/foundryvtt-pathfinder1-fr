Id: lhSoNvhUMvfYYVh2
Name: Canalisation d'énergie
Icon: systems/pf1/icons/feats/extra-mercy.jpg
------------
///// INFORMATIONS
//
// Cette macro lance une canalisation d'énergie en permettant de choisir s'il s'agit
// d'un soin ou de dégâts. Techniquement, la macro va changer le type d'attaque sur
// l'aptitude en question avant de l'exécuter.
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

///// CONFIGURATION
const FEATNAME = "Prê  1 : Canalisation d'énergie 1d6"

///// SCRIPT
function macroChannelEnergy() {

  // Récupérer l'acteur sélectionné
  const actors = MacrosPF1.getActors()
    
  // Vérifier que l'acteur existe
  if (!actors.length) return ui.notifications.error("Vous ne possédez aucun acteur! Veuillez contacter votre MJ.");
  const hero = actors[0];

  let feat = hero.items.find( i => i.type === "feat" && i.name === FEATNAME )
  if( !feat ) {
    ui.notifications.error(`Le PJ <i>${hero.name}</i> ne possède pas l'aptitude <i>${FEATNAME}</i>. Veuillez l'ajouter!`);
  } else {
    new Dialog({
        title: "Soigner ou blesser",
        content: `Cette macro exécutera l'aptitude <i>${FEATNAME}</i> avec le PJ <i>${hero.name}</i>, après avoir modifié le type d'attaque (soin/autre). Choisissez le type de canalisation d'énergie.`,
        buttons: {
          one: {
            icon: '<i class="fas fa-heart"></i>',
            label: "Soigner",
            callback: () => { feat.data.data.actionType = "heal"; feat.use({ev: null}) } 
          },
          two: {
            icon: '<i class="fas fa-skull"></i>',
            label: "Blesser",
            callback: () => { feat.data.data.actionType = "other"; feat.use({ev: null}) } 
          }
        },
        default: "one",
      }).render(true);
  }
}

macroChannelEnergy();
