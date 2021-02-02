Id: PU6SI51uGcZGPbSt
Name: Bestiaire - Configurer les images
Icon: icons/environment/creatures/gargoyle-grey-stone.webp
------------
///// INFORMATIONS
//
// Cette macro modifie le bestiaire en spécifiant un chemin vers des images et jeton
// pour chacune d'entre elle.
//
// Base : Foundry VTT (0.7.9)
// Système : Pathfinder 1 (0.77.2)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

// CONFIG

// chemin vers le répertoire dans lequel se trouvent les images
const PATH = "bestiaire/"

// SCRIPT

if(!game.user.isGM) {
  ui.notifications.error("Macro pour le MJ uniquement!")
}
else {
  Dialog.confirm({
    title: "Modification du Bestiaire",
    content: `Cette macro va modifier le compendium <em>Bestiaire</em> et spécifier une image et un jeton pour chaque créature. Attention, vous devez disposez des images et celles-ci doivent se trouver dans le bon répertoire!<ul><li>Cette opération <b>prend plusieurs minutes</b></li><li>À exécuter après chaque mise à jour du module pf1-fr</li><li><b>N'accédez</b> pas au bestiaire pendant l'exécution.</li><li>Ne pas exécuter 2x la macro en même temps</li></ul>`,
      yes: function() {
        let pack = game.packs.get("pf1-fr.bestiaryfr")
        // déverrouiller le pack
        pack.configure({locked: false})
        // modifier toutes les images
        pack.getIndex().then(async function(index) {
          const json = await fetch(`modules/pf1-fr/packs/bestiary-img.json`).then(r => r.json()) 
          for( const entity of index ) {
            const data = json.find( e => e.id === entity._id)
            if(data) {
              let e = await pack.getEntity(entity._id)
              let changes = {}
              if(data.img.indexOf("mystery-man.svg")<0) { changes["img"] = PATH + data.img }
              if(data.token.indexOf("mystery-man.svg")<0) { changes["token"] = { img: PATH + data.token } }
              if(Object.keys(changes).length>0) {
                await e.update(changes)
                console.log(`${e.name} mis à jour!`)
              }
            }
          }
          pack.configure({locked: true})
          ui.notifications.info("Modifications complétées!")
        });
      },
      no: () => {}
  });
}

