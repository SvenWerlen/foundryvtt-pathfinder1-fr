
/**
 * Hidden function to update compendium data from JSON files
 */
async function pf1frLoadData() {
  
  console.log(`PF1-FR | Updating Data`);
  
  // load JSON data
  const dClasses  = await fetch("/data/classes.json").then(r => r.json()) // Load your JSON data
  const dFeats    = await fetch("/data/feats.json").then(r => r.json()) // Load your JSON data
  const dFeatures = await fetch("/data/classfeatures.json").then(r => r.json()) // Load your JSON data
  const dSpells   = await fetch("/data/spells.json").then(r => r.json()) // Load your JSON data
  const dWeapons  = await fetch("/data/weapons.json").then(r => r.json()) // Load your JSON data
  const dArmors   = await fetch("/data/armors.json").then(r => r.json()) // Load your JSON data
  const dMagic    = await fetch("/data/magic.json").then(r => r.json()) // Load your JSON data
  
  // create compendiums
  let pClasses = await Compendium.create({label: "ImportClasses", entity: "Item"})
  let pFeats = await Compendium.create({label: "ImportFeats", entity: "Item"})
  let pFeatures = await Compendium.create({label: "ImportFeatures", entity: "Item"})
  let pItems = await Compendium.create({label: "ImportItems", entity: "Item"})
  let pSpells = await Compendium.create({label: "ImportSpells", entity: "Item"})
  
  // retrieve compendiums
  const packClasses = game.packs.find(p => p.metadata.label === "ImportClasses"); 
  const packFeats = game.packs.find(p => p.metadata.label === "ImportFeats");
  const packFeatures = game.packs.find(p => p.metadata.label === "ImportFeatures"); 
  const packItems = game.packs.find(p => p.metadata.label === "ImportItems"); 
  const packSpells = game.packs.find(p => p.metadata.label === "ImportSpells"); 
  
  // import data
  await packClasses.createEntity(dClasses);
  await packFeats.createEntity(dFeats);
  await packFeatures.createEntity(dFeatures);
  await packItems.createEntity(dWeapons);
  await packItems.createEntity(dArmors);
  await packItems.createEntity(dMagic);
  await packSpells.createEntity(dSpells);
  
  console.log(`PF1-FR | Done`);
}

/**
 * Hidden function to import a character from JSON file
 */
async function pf1frLoadCharacter() {
  const pj = await fetch("/personnage.pfc").then(r => r.json()) // Load your JSON data

  let cdata = {
    name: pj['Nom'],
    type: "character",
    sort: 12000,
    data: {
      abilities: {},
      details: {
        //level: {
          //value: 1,
        //},
        alignment: pj['Alignement'],
        xp: {
          value: pj['Expérience'],
        },
        race: pj['Race'],
        //"raceType": "",
        height: pj['Taille'] > 0 ? pj['Taille'] + " cm" : "",
        weight: pj['Poids'] > 0 ? pj['Poids'] + " kg" : "",
        gender: pj['Sexe'],
        deity: pj['Divinité'],
        age: pj['Âge'] > 0 ? pj['Âge'] + " ans" : ""
      },
      hp: {
        value: pj['PointsVie'],
      },
      speed: {
        land: {
          base: pj['Vitesse'],
        },
        climb: {
          base: pj['Vitesse'] / 4,
        },
        swim: {
          base: pj['Vitesse'] / 4,
        },
        burrow: {
          base: pj['VitesseCreusement'],
        },
        fly: {
          base: pj['VitesseVol'],
          //maneuverability: "average"
        }
      },
      skills: {}
    },
    token: {},
    items: [],
    flags: {}
  }
  
  const AB_MAP = { 'Force': "str", 'Dextérité': "dex", 'Constitution': "con", 'Intelligence': "int", 'Sagesse': "wis", 'Charisme': "cha" }
  const SK_SPEC = { 'crf' : "int", 'pro' : "wis", 'prf' : "cha" }
  const SK_MAP = { 
    'Acrobaties': "acr", 'Estimation': "apr", 'Bluff': "blf", 'Escalade': "clm", 'Artisanat': "crf", 'Diplomatie': "dip", 'Sabotage': "dev",
    'Déguisement': "dis", 'Évasion': "esc", 'Vol': "fly", 'Dressage': "han", 'Premiers secours': "hea", 'Intimidation': "int", 'Connaissances (mystères)': "kar",
    'Connaissances (exploration souterraine)': "kdu", 'Connaissances (ingénierie)': "ken", 'Connaissances (géographie)': "kge", 'Connaissances (histoire)': "khi", 
    'Connaissances (folklore local)': "klo", 'Connaissances (nature)': "kna", 'Connaissances (noblesse)': "kno", 'Connaissances (plans)': "kpl",
    'Connaissances (religion)': "kre", 'Linguistique': "lin", 'Perception': "per", 'Représentation': "prf", 'Profession': "pro", 'Équitation': "rid",
    'Psychologie': "sen", 'Escamotage': "slt", 'Art de la magie': "spl", 'Discrétion': "ste", 'Survie': "sur", 'Natation': "swm", 'Utilisation d\'objets magiques': "umd"
  }  
  
  pj['Caracs'].forEach(function(c) {
    const key = Object.keys(c)[0]
    cdata.data.abilities[AB_MAP[key]] = { 'value': c[key] }
  });
  pj['Compétences'].forEach(function(sk) {
    let key = SK_MAP[sk['Nom']];
    if(key in SK_SPEC) {
      cdata.data.skills[key] = { 'value': 0, 'subSkills': {} }
      cdata.data.skills[key]['subSkills'][key.concat('1')] = { 'name': '??', 'rank': sk['Rang'], 'ability': SK_SPEC[key] }
    } else {
      cdata.data.skills[key] = { 'rank': sk['Rang'] }
    }
    
  });
  
  
  if(1) {
    let actor = await Actor.create(cdata)
    await game.actors.insert(actor)
    actor = game.actors.get(actor.id);
    actor.update({}) // force update!
    
    // add class(es)
    const packClasses = game.packs.find(p => p.collection === "pf1-fr.classesfr");
    packClasses.getIndex().then(function(idx) {
      pj['Classes'].forEach(function(cl) {
        const cla = packClasses.index.find(c => c.name === cl['Nom']);
        packClasses.getEntity(cla._id).then(function(c) {
          c.data.data.levels = cl['Niveau']
          actor.createEmbeddedEntity("OwnedItem",c)
        });
      });
    });
    // add feat(s)
    const packFeats = game.packs.find(p => p.collection === "pf1-fr.featsfr");
    packFeats.getIndex().then(function(idx) {
      pj['Dons'].forEach(function(feat) {
        const fea = packFeats.index.find(f => f.name === feat['Nom']);
        packFeats.getEntity(fea._id).then(function(f) {
          actor.createEmbeddedEntity("OwnedItem",f)
        });
      });
    });
    
    console.log(`PF1 | Actor Added!`);
    
  } else {
    console.log(cdata);
  }
}
