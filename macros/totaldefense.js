Id: Tta2l2WwXVnBObxA
Name: Activer Défense Totale
Icon: systems/pf1/icons/feats/shield-slam.jpg
MarkerTooltip: Désactiver Défense Totale
MarkerIcon: systems/pf1/icons/feats/shield-slam.jpg
MarkerColor: #bba8a8
------------
///// INFORMATIONS
//
// Cette macro permet d'activer ou de désactiver la défense totale sur un personnage
//
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

///// CONFIGURATION
const BUFFNAME = "Défense totale"

///// SCRIPT
function macroToggle(buff) {
  if( !buff ) { return ui.notifications.error("Modification non-disponible. Quelquechose ne fonctionne pas comme prévu.") }
  let active = getProperty(buff.data, "data.active");
  if (active == null) active = false;
  buff.update({ "data.active": !active });
  if( !active ) { buff.roll(); }
}

function macroToggleTotalDefense() {

  // Récupérer l'acteur sélectionné
  const actors = MacrosPF1.getActors()
    
  // Vérifier que l'acteur existe
  if (!actors.length) return ui.notifications.error("Vous ne possédez aucun acteur! Veuillez contacter votre MJ.");
  const hero = actors[0];

  let buff = hero.items.find( i => i.type === "buff" && i.name === BUFFNAME )
  if( !buff ) {
    buff = {
      "name": BUFFNAME,
      "type": "buff",
      "data": {
        "description": {
          "value": "Un personnage peut consacrer une action simple à sa défense, ce qui lui confère un bonus d'esquive de +4 à la CA pendant 1 round. Sa CA s’améliore dès le début de son action. Le personnage ne peut pas cumuler une défense totale avec un combat sur la défensive ou avec le don Expertise du combat. Un personnage en défense totale ne peut pas faire d’attaques d’opportunité.",
        },
        "changes": [
          {
            "formula": "4",
            "operator": "add",
            "target": "ac",
            "subTarget": "ac",
            "modifier": "dodge",
            "priority": 0,
            "value": 0
          }
        ],
        "buffType": "temp",
        "active": false,
      },
      "img": "systems/pf1/icons/feats/shield-slam.jpg"
    }

    Dialog.confirm({
    title: "Ajouter un effet",
    content: `Cette macro tente d'activer l'effet <i>${BUFFNAME}</i> qui n'existe pour le PJ <i>${actor.name}</i>. Voulez-vous que la macro crée automatiquement cet effet (+4 CA)? Répondez <i>oui</i> pour ajouter l'effet et l'activer. Répondez <i>non</i> pour annuler l'action.`,
      yes: async function() {
        const created = await hero.createEmbeddedEntity("OwnedItem", buff);
        buff = hero.items.find( i => i.type === "buff" && i.name === BUFFNAME )
        macroToggle(buff)
      },
      no: () => {}
    });
  } else {
    macroToggle(buff)
  }
}

macroToggleTotalDefense();

------------

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  const hero = actors[0];
  const buff = hero.items.find( i => i.type === "buff" && i.name === "Défense totale" )
  return buff && getProperty(buff.data, "data.active")
} 
return false
