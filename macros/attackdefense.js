Id: 1IqmhS75L8bVcNqp
Name: Combattre sur la défensive
Icon: systems/pf1/icons/feats/improved-shield-bash.jpg
MarkerTooltip: Combattre normalement
MarkerIcon: systems/pf1/icons/feats/improved-shield-bash.jpg
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
const BUFFNAME = "Combattre sur la défensive"

///// SCRIPT
async function macroToggleTotalDefense() {

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
          "value": "Un personnage peut choisir de combattre sur la défensive lorsqu'il attaque. Dans ce cas, il subit un malus de -4 sur toutes ses attaques du round mais bénéficie alors d’un bonus d’esquive de +2 à la CA jusqu'au début de son prochain tour.",
        },
        "changes": [
          {
            "formula": "-4",
            "operator": "add",
            "target": "attack",
            "subTarget": "attack",
            "modifier": "penalty",
            "priority": 0,
            "value": 0
          },
          {
            "formula": "2",
            "operator": "add",
            "target": "ac",
            "subTarget": "ac",
            "modifier": "dodge",
            "priority": 0,
            "value": 0
          }
        ],
        "contextNotes": [
          { 
            "text" : "Sur la défensive",
            "target" : "attacks",
            "subTarget" : "attack"
          }
        ],
        "buffType": "temp",
        "active": false,
      },
      "img": "systems/pf1/icons/feats/improved-shield-bash.jpg"
    }

    const created = await hero.createEmbeddedEntity("OwnedItem", buff);
    buff = hero.items.find( i => i.type === "buff" && i.name === BUFFNAME )
  }

  if( !buff ) { return ui.notifications.error("Modification non-disponible. Quelquechose ne fonctionne pas comme prévu.") }
  let active = getProperty(buff.data, "data.active");
  if (active == null) active = false;
  buff.update({ "data.active": !active });
  if( !active ) { buff.roll(); }
}

macroToggleTotalDefense();

------------

const actors = MacrosPF1.getActors()
if( actors.length > 0 ) {
  const hero = actors[0];
  const buff = hero.items.find( i => i.type === "buff" && i.name === "Combattre sur la défensive" )
  return buff && getProperty(buff.data, "data.active")
} 
return false
