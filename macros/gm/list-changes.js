Id: FfWkiIJmr6J0Aoh2
Name: MJ - Afficher les changements actifs
Icon: systems/pf1/icons/skills/blue_10.jpg
------------
///// INFORMATIONS
//
// Cette macro affiche dans les changements actifs sur un personnage joueur (PJ)
//
// Base : Foundry VTT (0.7.9)
// Système : Pathfinder 1 (0.77.2)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

// CONFIG

// SCRIPT

let actors = MacrosPF1.getActors()
if(actors.length != 1) {
  ui.notifications.error("Veuillez choisir un personnage dans la scène!")
} else {
  let content = ""
  const SORT = { "class": 1, "race": 2, "feat": 4, "equipment": 5, "weapon": 6, "buff": 10 }
  var list = actors[0].items.filter( i => i.data.data.changes && i.data.data.changes.length > 0 )
  var feats = actors[0].items.filter( i => i.type == "feat" && i.data.data.featType == "feat" )
  var traits = actors[0].items.filter( i => i.type == "feat" && i.data.data.featType == "trait" )
  var classFeat = actors[0].items.filter( i => i.type == "feat" && i.data.data.featType == "classFeat" )
  var skillRanks = 0
  for (var key in actors[0].data.data.skills) {
       skillRanks += actors[0].data.data.skills[key].rank
  }
  list.sort( (a,b) => {
    if(a.type != b.type) return SORT[a.type]-SORT[b.type]
    else a.name.localeCompare(b.name)
  })
  list.forEach( i => {
    const changes = getProperty(i.data, "data.changes")
    // not equipped
    if(["weapon", "equipment"].includes(i.type) && !i.data.data.equipped) return;
    // buff not enabled
    if(i.type == "buff" && !i.data.data.active) return;
    content += `<tr><th colspan="3" title="${i.type}">${i.name}<th></tr>`
    changes.forEach(c => {
      const formula = isNaN(c.formula) ? "@" : c.formula
      content += `<tr><td>${c.target}</td><td>${c.subTarget}</td><td title="${c.modifier}">${c.modifier.substring(0,2)}</td><td title="${isNaN(c.formula) ? c.formula : ''}">+${formula}</td></tr>`
    })
  })

  let data = {
    flavor: `${actors[0].name} - ${traits.length} traits, ${feats.length} dons, ${classFeat.length} aptitudes, ${skillRanks} degrés`,
    content: `<table>${content}</table>`
  }

  if(game.settings.get("core", "rollMode") != "roll") {
    data['whisper'] = ChatMessage.getWhisperRecipients("GM")
    data['blind'] = true
  }

  ChatMessage.create(data);
}
