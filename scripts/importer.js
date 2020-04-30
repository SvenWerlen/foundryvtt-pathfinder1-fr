/**
 * Utility class for importing a character from PathfinderFR-Android application
 * See: https://github.com/SvenWerlen/pathfinderfr-android
 */
function Importer () {}
  
Importer.AB_MAP = { 'Force': "str", 'Dextérité': "dex", 'Constitution': "con", 'Intelligence': "int", 'Sagesse': "wis", 'Charisme': "cha" }
Importer.AB_KEYS = ["str","dex","con","int","wis","cha"]
Importer.SK_SPEC = { 'crf' : "int", 'pro' : "wis", 'prf' : "cha" }
Importer.SK_MAP = { 
  'Acrobaties': "acr", 'Estimation': "apr", 'Bluff': "blf", 'Escalade': "clm", 'Artisanat': "crf", 'Diplomatie': "dip", 'Sabotage': "dev",
  'Déguisement': "dis", 'Évasion': "esc", 'Vol': "fly", 'Dressage': "han", 'Premiers secours': "hea", 'Intimidation': "int", 'Connaissances (mystères)': "kar",
  'Connaissances (exploration souterraine)': "kdu", 'Connaissances (ingénierie)': "ken", 'Connaissances (géographie)': "kge", 'Connaissances (histoire)': "khi", 
  'Connaissances (folklore local)': "klo", 'Connaissances (nature)': "kna", 'Connaissances (noblesse)': "kno", 'Connaissances (plans)': "kpl",
  'Connaissances (religion)': "kre", 'Linguistique': "lin", 'Perception': "per", 'Représentation': "prf", 'Profession': "pro", 'Équitation': "rid",
  'Psychologie': "sen", 'Escamotage': "slt", 'Art de la magie': "spl", 'Discrétion': "ste", 'Survie': "sur", 'Natation': "swm", 'Utilisation d\'objets magiques': "umd"
}
Importer.SK_KEYS = Object.keys(Importer.SK_MAP).sort(function (a, b) { return a.localeCompare(b); });
Importer.CL_ABBR = { "Barbare": "Brb", "Prêtre combattant": "Prc", "Archer-mage": "ArM", "Champion occultiste": "Chp", "Magus": "Mgs", "Chaman": "Chm" }
Importer.ITEMS_KIND = ["Arme", "Armure", "Équipement", "Objet magique"]

/**
 * Sets the ability for the provided key
 */
Importer.setAbility = function (abilities, ability, value) {
  abilities[Importer.AB_MAP[ability]] = { 'value': value }
}

/**
 * Sets the skills
 */
Importer.setSkill = function (skills, name, rank) {
  let key = Importer.SK_MAP[name];
  // specialized skill (has sub-skill)
  if(key in Importer.SK_SPEC) {
    skills[key] = { 'value': 0, 'subSkills': {} }
    skills[key]['subSkills'][key.concat('1')] = { 'name': '??', 'rank': rank, 'ability': Importer.SK_SPEC[key] }
  } else {
    skills[key] = { 'rank': rank }
  }
}

/**
 * Retrieves the original reference name
 */
Importer.getItemReferenceName = function (name) {
  for (var i = 0; i < Importer.ITEMS_KIND.length; i++) {
    if(name.startsWith(Importer.ITEMS_KIND[i])) {
      return name.substring(Importer.ITEMS_KIND[i].length+1)
    }
  }
  return name;
}

/**
 * Adds a generic buff to the provided list
 */
Importer.addBuff = function (list, bonId, bonus) {
  // all abilities
  if(bonId == 1) {
    Importer.AB_KEYS.forEach( a => list.push([bonus.toString(), "ability", a, "base" ]));
  }
  // ability (specific)
  else if(bonId >= 2 && bonId <= 7 ) {
    list.push([bonus.toString(), "ability", Importer.AB_KEYS[bonId-2], "base" ])
  }
  // saves
  else if(bonId >= 11 && bonId <= 14 ) {
    let val = ["allSavingThrows", "ref", "fort", "will"][bonId-11]
    list.push([bonus.toString(), "savingThrows", val, "base" ])
  }
  // saves (magic)
  else if(bonId >= 15 && bonId <= 18 ) {
    let val = ["allSavingThrows", "ref", "fort", "will"][bonId-15]
    list.push([bonus.toString(), "savingThrows", val, "base" ])
  }
  // initiative
  else if(bonId == 21 ) {
    list.push([bonus.toString(), "misc", "init", "base" ])
  }
  // AC
  else if(bonId == 22 ) {
    list.push([bonus.toString(), "ac", "ac", "base" ])
  }
  // Magic resistance
  else if(bonId == 23 ) {
    console.log( "PF1-FR | WARNING: bonus for magic resistance not supported by module!" )
  }
  // Hit points
  else if(bonId == 24 ) {
    list.push([bonus.toString(), "misc", "mhp", "base" ])
  }
  // Hit points
  else if(bonId == 25 ) {
    list.push([bonus.toString(), "speed", "allSpeeds", "base" ])
  }
  // AC (armor, shield, natural)
  else if(bonId >= 26 && bonId <= 28 ) {
    let val = ["aac", "sac", "nac"][bonId-26]
    list.push([bonus.toString(), "ac", val, "base" ])
  }
  // AC (parade)
  else if(bonId == 29 ) {
    console.log( "PF1-FR | WARNING: bonus for AC (parade) not supported by module. Generic bonus added!" )
    list.push([bonus.toString(), "ac", "ac", "base" ])
  }
  // Attack
  else if(bonId >= 31 && bonId <= 32 ) {
    let val = ["mattack", "rattack"][bonId-31]
    list.push([bonus.toString(), "attack", val, "base" ])
  }
  // CMB & CMD
  else if(bonId >= 33 && bonId <= 34 ) {
    let val = ["cmb", "cmd"][bonId-33]
    list.push([bonus.toString(), "misc", val, "base" ])
  }
  // Damages
  else if(bonId >= 35 && bonId <= 36 ) {
    list.push([bonus.toString(), "damage", "damage", "base" ])
  }
  // Critical
  else if(bonId >= 37 && bonId <= 38 ) {
    console.log( "PF1-FR | WARNING: bonus for critical (generic) not supported by module!" )
  }
  // Skills (all)
  else if(bonId >= 41 && bonId <= 47 ) {
    let val = ["skills", "strSkills", "dexSkills", "conSkills", "intSkills", "wisSkills", "chaSkills"][bonId-31]
    list.push([bonus.toString(), "skills", val, "base" ])
  }
  // Magic level
  else if(bonId == 123 ) {
    console.log( "PF1-FR | WARNING: bonus for magic level not supported by module!" )
  }
  
  // skills (specific)
  else if(bonId >= 200) {
    list.push([bonus.toString(), "skill", "skill." + Importer.SK_MAP[Importer.SK_KEYS[bonId-201]], "base" ])
  }
};


