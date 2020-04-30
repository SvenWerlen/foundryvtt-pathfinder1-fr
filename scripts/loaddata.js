
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

/**
 * Hidden function to import a character from JSON file
 */
async function pf1frLoadCharacter() {
  //const pj = await fetch("/personnage.pfc").then(r => r.json()) // Load your JSON data
  const pj = await fetch("/pjs/cassandre.json").then(r => r.json()) // Load your JSON data

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
    

//     // add class(es)
//     const packClasses = game.packs.find(p => p.collection === "pf1-fr.classesfr");
//     packClasses.getIndex().then(function(idx) {
//       pj['Classes'].forEach(function(cl) {
//         const cla = packClasses.index.find(c => c.name === cl['Nom']);
//         packClasses.getEntity(cla._id).then(function(c) {
//           c.data.data.levels = cl['Niveau']
//           actor.createEmbeddedEntity("OwnedItem",c)
//         });
//         // generate abbr
//         let abbr = cl['Nom'].substring(0,3)
//         if(cl['Nom'] in Importer.CL_ABBR) {
//           abbr = Importer.CL_ABBR[cl['Nom']]
//         }
//         classAbbr.push(abbr)
//       });
//     });
//     // add feat(s)
//     const packFeats = game.packs.find(p => p.collection === "pf1-fr.featsfr");
//     packFeats.getIndex().then(function(idx) {
//       pj['Dons'].forEach(function(feat) {
//         const fea = packFeats.index.find(f => f.name === feat['Nom']);
//         packFeats.getEntity(fea._id).then(function(f) {
//           actor.createEmbeddedEntity("OwnedItem",f)
//         });
//       });
//     });
//     // add feature(s)
//     const packFeatures = game.packs.find(p => p.collection === "pf1-fr.classfeaturesfr");
//     packFeatures.getIndex().then(function(idx) {
//       pj['Aptitudes'].forEach(function(feature) {
//         // search feature in dict
//         const fea = packFeatures.index.find(function(f) {
//           let name = f.name.substring(f.name.indexOf(":")+2)
//           return name === feature['Nom'] && (classAbbr.includes(f.name.substring(0,3)));
//         });
//         if (typeof fea != "undefined") {
//           packFeatures.getEntity(fea._id).then(function(f) {
//             actor.createEmbeddedEntity("OwnedItem",f)
//           });
//         } else {
//           console.log("NOT FOUND: " + feature['Nom'])
//         }
//       });
//     });
//     // add spells
//     const packSpells = game.packs.find(p => p.collection === "pf1-fr.spellsfr");
//     packSpells.getIndex().then(function(idx) {
//       pj['Sorts'].forEach(function(spell) {
//         const sp = packSpells.index.find(f => f.name === spell['Nom']);
//         packSpells.getEntity(sp._id).then(function(f) {
//           actor.createEmbeddedEntity("OwnedItem",f)
//         });
//       });
//     });
    // add items, attacks, ...
    const packItems = game.packs.find(p => p.collection === "pf1-fr.itemsfr");
    packItems.getIndex().then(function(idx) {
      pj['Inventaire'].forEach(function(item) {
        let name = item['Référence']
        if( name ) {
          const itemName = Importer.getItemReferenceName(name)
          const i = packItems.index.find(f => f.name === itemName);
          if(!i) {
            console.log( "PF1-FR | WARNING: no item with name '" + itemName + "' found!" )
            return
          }
          packItems.getEntity(i._id).then(function(item) {
            // add as equipment
            actor.createEmbeddedEntity("OwnedItem",item)
            
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
              actor.createEmbeddedEntity("OwnedItem",data)
            }
          });
        }
      });
    });
//     
//     // buffs
//     pj['Modifs'].forEach(function(mod) {
//     
//       buff = {
//         name: mod['Nom'],
//         type: "buff",
//         data: { changes: [], buffType: "perm", active: mod['Activé'] == "Oui" }
//       }
//       
//       mod['Bonus'].forEach(function(bon) {
//         Importer.addBuff(buff.data.changes, bon['Id'], bon['Valeur'])       
//       });
//       
//       actor.createEmbeddedEntity("OwnedItem",buff)
//     });
        
    console.log(`PF1 | Actor Added!`);
    
  } else {
    console.log(cdata);
  }
}
