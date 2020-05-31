
/**
 * Hidden function to update compendium data from JSON files
 */
async function pf1frLoadData() {
  
  console.log(`PF1-FR | Updating Data`);
  
  //   // classes
  //   const dClasses   = await fetch("/data/classes.json").then(r => r.json()) 
  //   let pClasses = await Compendium.create({label: "ImportClasses", entity: "Item"})
  //   const packClasses = game.packs.find(p => p.metadata.label === "ImportClasses"); 
  //   await packClasses.createEntity(dClasses);
  // 
  //   // feats
  //   const dFeats     = await fetch("/data/feats.json").then(r => r.json()) 
  //   let pFeats = await Compendium.create({label: "ImportFeats", entity: "Item"})
  //   const packFeats = game.packs.find(p => p.metadata.label === "ImportFeats");
  //   await packFeats.createEntity(dFeats);
  // 
    // features
    const dFeatures  = await fetch("/data/classfeatures.json").then(r => r.json()) 
    let pFeatures = await Compendium.create({label: "ImportClassFeatures", entity: "Item"})
    const packFeatures = game.packs.find(p => p.metadata.label === "ImportClassFeatures"); 
    await packFeatures.createEntity(dFeatures);
  //   
//     // spells
//     const dSpells    = await fetch("/data/spells.json").then(r => r.json()) 
//     let pSpells = await Compendium.create({label: "ImportSpells", entity: "Item"})
//     const packSpells = game.packs.find(p => p.metadata.label === "ImportSpells"); 
//     await packSpells.createEntity(dSpells);
  
  // weapons
//   const dWeapons = await fetch("/data/weapons.json").then(r => r.json()) 
//   let pWeapons = await Compendium.create({label: "ImportWeapons", entity: "Item"})
//   const packWeapons = game.packs.find(p => p.metadata.label === "ImportWeapons"); 
//   await packWeapons.createEntity(dWeapons);
  
  // armors
//   const dArmors = await fetch("/data/armors.json").then(r => r.json()) 
//   let pArmors = await Compendium.create({label: "ImportArmors", entity: "Item"})
//   const packArmors = game.packs.find(p => p.metadata.label === "ImportArmors"); 
//   await packArmors.createEntity(dArmors);
   
//   // magic items
//   const dMagic = await fetch("/data/magic.json").then(r => r.json()) 
//   let pMagic = await Compendium.create({label: "ImportMagic", entity: "Item"})
//   const packMagic = game.packs.find(p => p.metadata.label === "ImportMagic"); 
//   await packMagic.createEntity(dMagic);
//   
//   //equipment
//   const dEquipment = await fetch("/data/equipment.json").then(r => r.json()) 
//   let pEquipment = await Compendium.create({label: "ImportEquipment", entity: "Item"})
//   const packEquipment = game.packs.find(p => p.metadata.label === "ImportEquipment"); 
//   await packEquipment.createEntity(dEquipment);
    
//   // beastiary  
//   const dBeastiary = await fetch("/data/beastiary.json").then(r => r.json()) 
//   let pBeastiary = await Compendium.create({label: "ImportBeastiary", entity: "Actor"})
//   const packBeastiary = game.packs.find(p => p.metadata.label === "ImportBeastiary"); 
//   await packBeastiary.createEntity(dBeastiary);
  
  console.log(`PF1-FR | Done`);
}


/**
 * Hidden function to import a character from JSON file
 */
async function importCharacter(path, override = false) {
  
  const yamlData = await fetch(path).then(content => content.text()) // Load your YAML data
  pj = YAML.parse(yamlData)
  //console.log(pj)
  //const pj = await fetch(path).then(r => r.json()) // Load your JSON data

  let actor = await game.actors.getName(pj['Nom']);
  let currentHP = 0;
  
  // base data
  let cdata = {
    name: pj['Nom'],
    type: "character",
    data: {
      abilities: {},
      details: {
        alignment: pj['Alignement'],
        race: pj['Race'],
        height: pj['Taille'] > 0 ? pj['Taille'] + " cm" : "",
        weight: pj['Poids'] > 0 ? pj['Poids'] + " kg" : "",
        gender: pj['Sexe'],
        deity: pj['Divinité'],
        age: pj['Âge'] > 0 ? pj['Âge'] + " ans" : ""
      },
      attributes: {
        speed: { land: { base: pj['Vitesse'] } }
      },
      skills: {},
      currency: {},
      items: []
    },
  }
  
  pj['Caracs'].forEach(c => Importer.setAbility(cdata.data.abilities, Object.keys(c)[0], Object.values(c)[0]))
  pj['Compétences'].forEach(sk => Importer.setSkill(cdata.data.skills, sk['Nom'], sk['Rang']))
  
  if(!actor || override) {
    cdata.data.details.xp = { value: pj['Expérience'] }
    cdata.data.attributes.hp = { value: pj['PointsVie'] }
    cdata.data.currency = {
      pp: pj['Richesses']['pp'],
      gp: pj['Richesses']['po'],
      sp: pj['Richesses']['pa'],
      cp: pj['Richesses']['pc']
    }
  }
  
  // create new actor if doesn't already exist
  if(!actor) {
    actor = await Actor.create(cdata)
    await game.actors.insert(actor)
    actor = await game.actors.get(actor.id);
    actor.update({}) // force update!
  }
  // update if already exists
  else {
    // update
    actor.update(cdata)
    console.log("PF1-FR | Character main attributes updated!")
    // remove all items
    let ids = []
    actor.data.items.forEach( item => ids.push(item._id) );
    actor.deleteEmbeddedEntity("OwnedItem", ids)
  }
  
  currentHP = actor.data.data.attributes.hp.value
  
  // class abbreviation
  let classAbbr = []
  let items = []
  let totalLevel = 0
  
  // add class(es)
  const packClasses = game.packs.find(p => p.collection === "pf1-fr.classesfr");
  await packClasses.getIndex()
  for(var i = 0; i < pj['Classes'].length; i++) {
    const idx = packClasses.index.find(f => f.name === pj['Classes'][i]['Nom']);
    if(idx) {
      const cl = await packClasses.getEntity(idx._id);
      cl.data.data.levels = pj['Classes'][i]['Niveau']
      cl.data.data.hp = 0
      totalLevel += pj['Classes'][i]['Niveau']
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
  
  // update hitpoints on classes to reflect the correct total HP
  if(totalLevel > 0) {
    const hpConst = Importer.getMod('Constitution', pj) * totalLevel;  // number of HP based on Con mod and total level
    const hpRolled = pj['PointsVie'] - hpConst
    items[items.length - 1].data.data.hp = hpRolled
  }
  
  actor.createEmbeddedEntity("OwnedItem", items)
  items = []
  
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
          // (name, description, source, ismelee, stat, damageRoll, damageType, bonus, critRange, critMult, range) {
          let bonus = [0]
          let bab = actor.data.data.attributes.bab.total
          while(bab > 5) {
            bonus.push(-5 * bonus.length)
            bab -= 5
          }
          let data = Importer.createAttack(
            item.name, 
            item.data.data.description.value, 
            item.data.data.source, 
            item.data.data.weaponData.isMelee, 
            item.data.data.weaponData.isMelee ? "for" : "dex",
            item.data.data.weaponData.damageRoll, 
            item.data.data.weaponData.damageType,
            bonus, 
            item.data.data.weaponData.critRange, 
            item.data.data.weaponData.critMult,
            item.data.data.weaponData.range);
          Importer.updateAttackWithBonus(data, pj['Inventaire'][i]['Modifs'])
          items.push(data)
        }
      } else {
        console.log("PF1-FR | WARNING: item '" + name + "' not found in compendium")
      }
    } 
    // items (manually created)
    else {
      item = { 
        name: pj['Inventaire'][i]['Nom'],
        type: "loot",
        data: { 
          description: { value: "-" },
          weight: pj['Inventaire'][i]["Poids"]/1000,
          price: pj['Inventaire'][i]["Prix"]/1000
        },
        source: "-",
        identified: true,
        img: "modules/pf1-fr/icons/other-equip.png"
      }
      Importer.addBuffs(items, pj['Inventaire'][i]['Modifs'], pj['Inventaire'][i]['Nom'] + ": ")
      items.push(item)
    }
  }
  
  actor.createEmbeddedEntity("OwnedItem", items)
  
  actor.data.data.attributes.hp.value = currentHP
  actor.update({})
  
  console.log(`PF1 | Actor Added!`);

}


/**
 * Once the entire VTT framework is initialized, overwrite existing functions
 */
Hooks.on("renderActorSheet", async function( context, html, data) {
  if( !CONFIG.Actor.sheetClasses.character["PF1.Personnage"]) {
    return;
  }
  let sheetClass = CONFIG.Actor.sheetClasses.character["PF1.Personnage"].cls.prototype
  if(!sheetClass.pf1fr) {
    sheetClass.pf1fr = true;
    sheetClass.__proto__._onItemCreate = function(event) {
      event.preventDefault();
      const header = event.currentTarget;
      const type = header.dataset.type;
      const actor = this.actor;
      if(type == "attack") {
        
        // Show dialog
        renderTemplate("modules/pf1-fr/templates/attack-create-dialog.html", {}).then(dlg => {
          new Dialog({
            title: "Initialiser l'attaque",
            content: dlg,
            buttons: {
              create: {
                label: "Créer",
                callback: async function(html) {
                  let attack = html.find('#attack').val()
                  let ismelee = html.find('#cac')[0].checked
                  let attackType = header.dataset.attackType
                  let itemData = {
                    name: `New ${type.capitalize()}`,
                    type: type,
                    data: duplicate(header.dataset)
                  };
                  delete itemData.data["type"];
                  
                  if(attack.length == 0) {
                    return actor.createOwnedItem(itemData);
                  }
                  else {
                    let attackStr = attack
                    let attackList = []
                    let count = 0;
                    while(count++ < 10) {
                      const data = attackStr.match(/^(.*?) ([\+-][\+0-9/]+) (contact )?\((.*?)\)/)
                      if(data) {
                        attackStr = attackStr.substring(data[0].length)
                        const name = data[1].replace(/,/g, '').trim()
                        const dmg = data[4].match(/([\d\+d]+)(\/\d+-20)?(\/x\d)?/)
                        let bonusStr = data[2]
                        
                        // convert bonus +13/+8 into [13,8]
                        let bonusList = []
                        let countB = 0;
                        while(countB++ < 10) {
                          bonus = bonusStr.match(/^\/?([\+\d]+)/)
                          if(bonus) {
                            bonusStr = bonusStr.substring(bonus[0].length)
                            bonusList.push(Number(bonus[1]))
                          } else { break; }
                        }
                        console.log(bonusList)
                        
                        if(bonusList.length > 0 && dmg) {
                          const damages = dmg[1]
                          const crit = dmg[2] ? dmg[2].match(/\/(\d+)-20/)[1] : 20
                          const mult = dmg[3] ? Number(dmg[3].match(/\/x(\d)/)[1]) : 2
                          itemData = Importer.createAttack(
                            name, 
                            attack, 
                            "",     // no source
                            ismelee, 
                            "",     // no stat
                            damages, 
                            "?",
                            bonusList, 
                            crit, 
                            mult,
                            0);
                          itemData.data.attackType = attackType
                          await actor.createOwnedItem(itemData)
                        }
                      } else { break; }
                    }
                    return true
                  }
                }
              },
            },
          }).render(true);
        });
        
        return true;
      }
      // default behaviour (from system)
      const itemData = {
        name: `New ${type.capitalize()}`,
        type: type,
        data: duplicate(header.dataset)
      };
      delete itemData.data["type"];
      return this.actor.createOwnedItem(itemData);
    }
  }
});
