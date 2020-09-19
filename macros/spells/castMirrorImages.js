Id: FgnRmbsZ0zuxNbBw
Name: Incanter le sort "Image miroir"
Icon: systems/pf1/icons/feats/improved-feint.jpg
MarkerTooltip: Sort "Image miroir" actif!
MarkerIcon: systems/pf1/icons/feats/improved-feint.jpg
MarkerColor: #edc412
------------

///// CONFIGURATION
const spellName = "Image miroir";
const messagePrefix = "Nombre d'images miroir générées: ";

///// INFORMATIONS
// Base : Foundry VTT (0.6.6)
// Système : Pathfinder 1 (0.73.7)
// Module(s) nécessaire(s) : Magic Token FX (0.4.2b)
// Modules(s) optionnel(s) : Macro Marker (voir NOTES)
// Auteur(s) : Alexandre Nizoux (deurk#5568), Sven Werlen (Dorgendubal#3348), Noon

///// SCRIPT
function macroCastMirrorImages() {
    
    // Récupérer l'acteur sélectionné
    const actors = MacrosPF1.getActors()
   
    // Vérifier que l'acteur existe
    if (!actors.length) return ui.notifications.error("Vous ne possédez aucun acteur! Veuillez contacter votre MJ.");
    const hero = actors[0];

    // Vérifier qu'un jeton de l'acteur existe
    const token = canvas.tokens.placeables.find(token => token.actor.id === hero.id);
    if (!token) return ui.notifications.error(`L'acteur nommé <i>${hero.name}</i> n'a pas de jeton sur la scène`);

    // Vérifier que l'acteur dispose bien du sort
    const spell = hero.items.find(item => item.type === "spell" && item.name === spellName);
    if (!spell) return ui.notifications.error(`L'acteur <i>${hero.name}</i> ne dispose pas du sort <i>${spellName}</i>`);
        
    // WORKAROUND : useSpell ne différencie pas les exécutions réussies ou ratées (BUG),
    // on se base sur les notifications pour déterminer le résultat du lancement de sort

    // Lancer le sort et consommer l'emplacement
    const notifLength =  ui.notifications.active.length;
    hero.useSpell(spell, {}, {skipDialog: true}).then(result => {

        if (ui.notifications.active.length != notifLength) return;
        
        // Definir le nombre d'images à afficher
        const rollData = spell.getRollData();
        let imagesRoll = new Roll("1d4 + floor(@cl/3)", rollData).roll();
        const mirrorImages = Math.min(imagesRoll.total, 8);

        // Afficher un message annoncant le nombre d'images générées
        imagesRoll.toMessage({
            speaker: ChatMessage.getSpeaker({actor: hero}),
            flavor: messagePrefix,
            rollMode: game.settings.get("core", "rollMode")
        });

        // Sauvegarder le nombre d'images pour traitement ultérieur
        hero.setFlag("pf1", "spells", {"mirrorImages": mirrorImages});

        // Activer l'effet visuel sur le jeton
        let params = [{
            filterType: "images",
            filterId: "myMirrorImages",
            time: 0,
            nbImage: mirrorImages,
            alphaImg: 0.6,
            alphaChr: 1.0,
            blend: 4,
            ampX: 0.20,
            ampY: 0.35,
            zOrder: 20,
            animated : {
                time: { 
                    active: true, 
                    speed: 0.0010, 
                    animType: "move" 
                }
            }
        }];
        TokenMagic.addUpdateFilters(token, params); 
    });  
}

macroCastMirrorImages();

------------

const actors = MacrosPF1.getActors()
return actors.length > 0 && actors[0].getFlag("pf1", "spells.mirrorImages");
