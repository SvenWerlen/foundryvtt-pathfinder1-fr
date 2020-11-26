Id: X2jPhX9mxq8seUf2
Name: Aperçu des PJs
Icon: systems/pf1/icons/items/inventory/tabard-blue.jpg
------------
///// INFORMATIONS
//
// Cette macro présente une vue d'ensemble des PJs
//
// Base : Foundry VTT (0.7.7)
// Système : Pathfinder 1 (0.76.4)
// Module(s) nécessaire(s) : pf1-fr
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

// CONFIGURATION
// - skills: liste de compétences à afficher
// - display: liste de tous les éléments à afficher
// 
const SKILLS = [ "Acr", "Spl", "Blf", "KDu", "KLo", "KGe", "KHi", "KEn", "KAr", "KNa", "KNo", "KPl", "KRe", "Dis", "Dip", "Ste", "Han", "Rid", "Clm", "Slt", "Apr", "Esc", "Int", "Lin", "Swm", "Per", "Hea", "Sen", "Dev", "Sur", "UMD", "Fly" ]

SKILLS.sort(function(a,b) { return game.i18n.localize("PF1.Skill" + a).localeCompare(game.i18n.localize("PF1.Skill" + b));  })

// affichage par défaut
function formatSolo(actor, val) {
  return val[0].toString()
}

// affichage par défaut
function formatSoloWithSign(actor, val) {
  return (val[0] >= 0 ? "+" : "") + val[0].toString()
}

// fonction pour afficher les pv
function formatPv(actor, val) {
  return `${val[0]}/${val[1]}`
}

// fonction pour afficher la classe d'armure
function formatCA(actor, val) {
  return `${val[0]} (${val[1]}/${val[2]})`
}

// fonction pour afficher les statistiques au format "12 (+1)"
function formatAbilities(actor, val) {
  const mod = (val[1] >= 0 ? "+" : "") + val[1].toString()
  return `${mod} (${val[0].toString()})`
}

// fonction pour afficher les compétences au format "+3 (2)"
function formatSkill(actor, val) {
  const sk = val[0]
  if( !sk || (sk.rt && !sk.rank) ) return ""
  const rank = sk.rank > 0 ? sk.rank.toString() : "-"
  const mod = (sk.mod >= 0 ? "+" : "") + sk.mod.toString()
  return `${mod} (${rank})`
}

// action pour les jets de caractéristiques
async function rollAbility(actors, row) {
  for (let a = 0; a < actors.length; a++) {
    let o = actors[a];
    await o.rollAbility(row.ability, { event: new MouseEvent({}), noSound: a > 0, });
  }
}

// action pour les compétences
async function rollSkill(actors, row) {
  for (let a = 0; a < actors.length; a++) {
    let o = actors[a];
    let info = o.getSkillInfo(row.skill);
    if (!info || row.outputs[a].length == 0) continue;
    await o.rollSkill(row.skill, { event: new MouseEvent({}), skipDialog: true, noSound: a > 0, });
  }
}

// action pour les jets de sauvegarde
async function rollSaving(actors, row) {
  for (let a = 0; a < actors.length; a++) {
    let o = actors[a];
    await o.rollSavingThrow(row.saving, { event: new MouseEvent({}), noSound: a > 0, });
  }
}


const DISPLAY = [
  { label: '', path: ['name'], th: true, format: formatSolo },
  { label: "XP", path: ['data.data.details.xp.value'], format: formatSolo },
  
  { label: game.i18n.localize("PF1.Attributes"), th: true },
  { label: game.i18n.localize("PF1.AbilityShortStr"), path: ['data.data.abilities.str.total', 'data.data.abilities.str.mod'], format: formatAbilities, ability: 'str', action: rollAbility },
  { label: game.i18n.localize("PF1.AbilityShortDex"), path: ['data.data.abilities.dex.total', 'data.data.abilities.dex.mod'], format: formatAbilities, ability: 'dex', action: rollAbility },
  { label: game.i18n.localize("PF1.AbilityShortCon"), path: ['data.data.abilities.con.total', 'data.data.abilities.con.mod'], format: formatAbilities, ability: 'con', action: rollAbility },
  { label: game.i18n.localize("PF1.AbilityShortInt"), path: ['data.data.abilities.int.total', 'data.data.abilities.int.mod'], format: formatAbilities, ability: 'int', action: rollAbility },
  { label: game.i18n.localize("PF1.AbilityShortWis"), path: ['data.data.abilities.wis.total', 'data.data.abilities.wis.mod'], format: formatAbilities, ability: 'wis', action: rollAbility },
  { label: game.i18n.localize("PF1.AbilityShortCha"), path: ['data.data.abilities.cha.total', 'data.data.abilities.cha.mod'], format: formatAbilities, ability: 'cha', action: rollAbility },

  { label: game.i18n.localize("PF1.ItemTypeAttack"), th: true },
  { label: game.i18n.localize("PF1.Initiative"), path: ['data.data.attributes.init.total'], format: formatSoloWithSign },
  { label: game.i18n.localize("PF1.CMBAbbr"), path: ['data.data.attributes.cmb.total'], format: formatSoloWithSign },

  { label: game.i18n.localize("PF1.Defenses"), th: true },
  { label: game.i18n.localize("PF1.HPShort"), path: ['data.data.attributes.hp.value', 'data.data.attributes.hp.max'], format: formatPv },
  { label: game.i18n.localize("PF1.ACNormal"), path: ['data.data.attributes.ac.normal.total', 'data.data.attributes.ac.touch.total', 'data.data.attributes.ac.flatFooted.total'], format: formatCA },
  { label: game.i18n.localize("PF1.SavingThrowRef"), path: ['data.data.attributes.savingThrows.ref.total'], format: formatSoloWithSign, saving: "ref", action: rollSaving },
  { label: game.i18n.localize("PF1.SavingThrowFort"), path: ['data.data.attributes.savingThrows.fort.total'], format: formatSoloWithSign, saving: "fort", action: rollSaving },
  { label: game.i18n.localize("PF1.SavingThrowWill"), path: ['data.data.attributes.savingThrows.will.total'], format: formatSoloWithSign, saving: "will", action: rollSaving },
  { label: game.i18n.localize("PF1.CMDAbbr"), path: ['data.data.attributes.cmd.total'], format: formatSolo },

  { label: game.i18n.localize("PF1.Skills"), th: true },
]


SKILLS.forEach( s => DISPLAY.push( 
  { 
    label: game.i18n.localize("PF1.Skill" + s), 
    path: [`data.data.skills.${s.toLowerCase()}`], 
    format: formatSkill, skill: s.toLowerCase(), 
    action: rollSkill 
  } 
));

// SCRIPT
// Do NOT change unless you know what you're doing!

let actorIds = []
game.users.forEach( function(u) { if( !u.isGM ) { actorIds.push(u.data.character) } } )
const actors = game.actors.filter( a => actorIds.indexOf( a.id ) >= 0 )

new NPCOverview(null, { actors: actors, display: DISPLAY }).render(true)
