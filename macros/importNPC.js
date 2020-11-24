Id: YPJRPXci1uCUiRO6
Name: Importer un PNJ
Icon: icons/environment/people/commoner.webp
------------
///// INFORMATIONS
//
// Cette macro permet d'importer un PNJ en copiant un bloc de statistiques depuis 
// un livre (PDF) ou le site www.pathfinder-fr.org. Testez-le avec:
// https://www.pathfinder-fr.org/Wiki/Pathfinder-RPG.G%C3%A9ant%20des%20collines.ashx
//
// Base : Foundry VTT (0.7.7)
// Système : Pathfinder 1 (0.75.13)
// Module(s) nécessaire(s) : -
// Auteur(s) : Sven Werlen (Dorgendubal#3348)

///// CONFIGURATION

//// SCRIPT
let html = `<textarea id="pf1frImport" placeholder="Copier le bloc de texte ici\n\nRappel: vous devez ajouter ## devant chaque ligne contenant une liste de sorts à importer!!" rows="15"></textarea>`

let buttons = { 
  test: {
    icon: '<i class="fas fa-vial fa-fw"></i>',
    label: "Tester (simulation)",
    callback: () => {
      console.log("L'erreur qui suit est normale! Elle permet d'éviter que la fenêtre de dialogue se ferme ;-)")
      const data = MacrosPF1.extractCharacter(document.getElementById("pf1frImport").value)
      MacrosPF1.importCharacter(data, true)
      throw "N'oubliez pas d'importer!"
    }
  },
  import: {
    icon: '<i class="fas fa-file-import fa-fw"></i>',
    label: "Importer",
    callback: () => {
      const data = MacrosPF1.extractCharacter(document.getElementById("pf1frImport").value)
      MacrosPF1.importCharacter(data)
    }
  }
}

new Dialog({
    title: "Importer un PNJ",
    content: html,
    buttons: buttons,
  }, { width: 800 }).render(true);
