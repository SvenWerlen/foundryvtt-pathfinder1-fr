
/**
 * Hidden function to update compendium data from JSON files
 */
async function pf1frLoadData() {
  
  console.log(`PF1-FR | Updating Data`);
  
  // load JSON data
  const dClasses   = await fetch("/data/classes.json").then(r => r.json()) 
  const dFeats     = await fetch("/data/feats.json").then(r => r.json()) 
  const dFeatures  = await fetch("/data/classfeatures.json").then(r => r.json()) 
  const dSpells    = await fetch("/data/spells.json").then(r => r.json()) 
  const dWeapons   = await fetch("/data/weapons.json").then(r => r.json()) 
  const dArmors    = await fetch("/data/armors.json").then(r => r.json()) 
  const dMagic     = await fetch("/data/magic.json").then(r => r.json()) 
  const dEquipment = await fetch("/data/equipment.json").then(r => r.json()) 
  
  // create compendiums
  let pClasses = await Compendium.create({label: "ImportClasses", entity: "Item"})
  let pFeats = await Compendium.create({label: "ImportFeats", entity: "Item"})
  let pFeatures = await Compendium.create({label: "ImportClassFeatures", entity: "Item"})
  let pItems = await Compendium.create({label: "ImportItems", entity: "Item"})
  let pSpells = await Compendium.create({label: "ImportSpells", entity: "Item"})
  
  // retrieve compendiums
  const packClasses = game.packs.find(p => p.metadata.label === "ImportClasses"); 
  const packFeats = game.packs.find(p => p.metadata.label === "ImportFeats");
  const packFeatures = game.packs.find(p => p.metadata.label === "ImportClassFeatures"); 
  const packItems = game.packs.find(p => p.metadata.label === "ImportItems"); 
  const packSpells = game.packs.find(p => p.metadata.label === "ImportSpells"); 
  
  // import data
  await packClasses.createEntity(dClasses);
  await packFeats.createEntity(dFeats);
  await packFeatures.createEntity(dFeatures);
  await packItems.createEntity(dWeapons);
  await packItems.createEntity(dArmors);
  await packItems.createEntity(dMagic);
  await packItems.createEntity(dEquipment);
  await packSpells.createEntity(dSpells);
  
  console.log(`PF1-FR | Done`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Hidden function to import a character from JSON file
 */
async function pf1frLoadCharacter(path) {
  
  const yamlData = await fetch(path).then(content => content.text()) // Load your YAML data
  pj = YAML.parse(yamlData)
  //console.log(pj)
  //const pj = await fetch(path).then(r => r.json()) // Load your JSON data

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
      attributes: {
        speed: { 
          land:   { base: pj['Vitesse'] },
          climb:  { base: pj['Vitesse'] / 4 },
          swim:   { base: pj['Vitesse'] / 4 },
          burrow: { base: pj['VitesseCreusement'] },
          fly:    { base: pj['VitesseVol'] }
        }
      },
      skills: {},
      currency: {
        pp: pj['Richesses']['pp'],
        gp: pj['Richesses']['po'],
        sp: pj['Richesses']['pa'],
        cp: pj['Richesses']['pc']
      },
    },
    token: {},
    items: [],
    flags: {}
  }
  
  pj['Caracs'].forEach(c => Importer.setAbility(cdata.data.abilities, Object.keys(c)[0], Object.values(c)[0]))
  pj['Compétences'].forEach(sk => Importer.setSkill(cdata.data.skills, sk['Nom'], sk['Rang']))
  
  // class abbreviation
  let classAbbr = []
  
  if(1) {
    let actor = await Actor.create(cdata)
    await game.actors.insert(actor)
    actor = game.actors.get(actor.id);
    actor.update({}) // force update!
    
    let items = []
    
    // add class(es)
    const packClasses = game.packs.find(p => p.collection === "pf1-fr.classesfr");
    await packClasses.getIndex()
    for(var i = 0; i < pj['Classes'].length; i++) {
      const idx = packClasses.index.find(f => f.name === pj['Classes'][i]['Nom']);
      if(idx) {
        const cl = await packClasses.getEntity(idx._id);
        cl.data.data.levels = pj['Classes'][i]['Niveau']
        items.push(cl)
        // generate abbr
        let abbr = cl.data.name.substring(0,3)
        if(cl.data.name in Importer.CL_ABBR) {
          abbr = Importer.CL_ABBR[cl.data.name]
        }
        classAbbr.push(abbr)
      } else {
        console.log("PF1-FR | WARNING: class '" + pj['Classes'][i]['Nom'] + "' not found in compendium")
      }
    }
    
    // add feat(s)
    const packFeats = game.packs.find(p => p.collection === "pf1-fr.featsfr");
    await packFeats.getIndex()
    for(var i = 0; i < pj['Dons'].length; i++) {
      const idx = packFeats.index.find(f => f.name === pj['Dons'][i]['Nom']);
      if(idx) {
        const feat = await packFeats.getEntity(idx._id);
        items.push(feat)
      } else {
        console.log("PF1-FR | WARNING: feat '" + pj['Dons'][i]['Nom'] + "' not found in compendium")
      }
    }

    // add feature(s)
    const packFeatures = game.packs.find(p => p.collection === "pf1-fr.classfeaturesfr");
    await packFeatures.getIndex()
    for(var i = 0; i < pj['Aptitudes'].length; i++) {
      // search feature in dict
      const idx = packFeatures.index.find(function(f) {
        let name = f.name.substring(f.name.indexOf(":")+2)
        return name === pj['Aptitudes'][i]['Nom'] && (classAbbr.includes(f.name.substring(0,3)));
      });
      if(idx) {
        const feature = await packFeatures.getEntity(idx._id);
        items.push(feature)
      } else {
        console.log("PF1-FR | WARNING: class feature '" + pj['Aptitudes'][i]['Nom'] + "' not found in compendium")
      }
    }

    // add spell(s)
    const packSpells = game.packs.find(p => p.collection === "pf1-fr.spellsfr");
    await packSpells.getIndex()
    for(var i = 0; i < pj['Sorts'].length; i++) {
      const idx = packSpells.index.find(f => f.name === pj['Sorts'][i]['Nom']);
      if(idx) {
        const spell = await packSpells.getEntity(idx._id);
        items.push(spell)
      } else {
        console.log("PF1-FR | WARNING: spell '" + pj['Sorts'][i]['Nom'] + "' not found in compendium")
      }
    }
    
    // add global buff(s)
    Importer.addBuffs(items, pj['Modifs'], "")
    
    // add items, attacks, ...
    const packItems = game.packs.find(p => p.collection === "pf1-fr.itemsfr");
    await packItems.getIndex()
    for(var i = 0; i < pj['Inventaire'].length; i++) {
      let name = pj['Inventaire'][i]['Référence']
      if( name ) {
        const itemName = Importer.getItemReferenceName(name)
        const idx = packItems.index.find(f => f.name === itemName);
        if(idx) {
          const item = await packItems.getEntity(idx._id);
          // buff specific to a weapon / equipment
          if(item.data.type == "weapon" || item.data.type == "equipment") {
            Importer.updateEquipmentWithBonus(item, pj['Inventaire'][i]['Modifs'])
          } 
          // generic buff
          else {
            Importer.addBuffs(items, pj['Inventaire'][i]['Modifs'], pj['Inventaire'][i]['Nom'] + ": ")
          }
          // add as equipment
          item.data.name = pj['Inventaire'][i]['Nom']
          items.push(item)
          // add as attack (if weapon)
          if( name && name.startsWith('Arme')) {
            let ismelee = item.data.data.weaponData.isMelee
            let data = {
              name: item.name,
              type: "attack",
              data: {
                description: {
                  value: item.data.data.description.value,
                },
                source: item.data.data.source,
                activation: {
                  cost: 1,
                  type: "attack"
                },
                actionType: ismelee ? "mwak" : "rwak",
                damage: {
                  parts: [
                    [
                      item.data.data.weaponData.damageRoll,
                      item.data.data.weaponData.damageType
                    ]
                  ]
                },
                ability: {
                  attack: ismelee ? "str" : "dex",
                  damage: "",
                  damageMult: 1,
                  critRange: Number(item.data.data.weaponData.critRange),
                  critMult: Number(item.data.data.weaponData.critMult)
                },
                range: {
                  value: ismelee ? null : item.data.data.weaponData.range,
                  units: ismelee ? "touch" : "ft"
                },
                attackType: "weapon",
                proficient: true,
                primaryAttack: true
              },
              img: item.img,
            }
            Importer.updateAttackWithBonus(data, pj['Inventaire'][i]['Modifs'])
            items.push(data)
          }
        } else {
          console.log("PF1-FR | WARNING: item '" + name + "' not found in compendium")
        }
      }
    }
    
    actor.createEmbeddedEntity("OwnedItem", items)
    
    console.log(`PF1 | Actor Added!`);
    
  } else {
    console.log(cdata);
  }
}
