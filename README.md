# Moulinette Foundry VTT module for pathfinder1

Ce dépôt est un module pour foundry VTT (https://foundryvtt.com/).
Le module améliore le système pathfinder1 pour le français, en s'appuyant notamment sur les données du site www.pathfinder-fr.org.

Ce module fait partie de la suite d'outils [Moulinette](https://github.com/SvenWerlen/moulinette).

Compendiums supportés:
* classes
* dons
* sorts
* équipements
* bestiaire
* modifications
* aptitudes
* races
* ...

_(Voir le projet [pathfinderfr-data](https://github.com/SvenWerlen/pathfinderfr-data/blob/master/foundryvtt/README.md) pour plus de détails)_

![Compendiums](/doc/img/compendiums.jpg)
![Armors](/doc/img/armors.jpg)

## Pré-requis

Ce module assume que les extensions suivantes sont installées:
* Pathfinder 1 (system): https://foundryvtt.com/packages/pf1/
* Translation French (Core): https://foundryvtt.com/packages/fr-FR/

## Comment installer?

### Installer le module 

* Configurations et Paramètres | Installer un Module
* URL du Manifest: `https://raw.githubusercontent.com/SvenWerlen/foundryvtt-pathfinder1-fr/master/module.json`
* Installation

### Activer le module dans le monde

* Configurations | Manage Modules
* Activer le module
* Sauvegarder les paramètres

![Config](/doc/img/config.jpg)

### Désactiver les compendiums d'origine (en anglais)

* Onglet "Compendiums"
* Changer la visibilité de chaque pack d'origine (pf1)

### Supprimer les compendiums d'origine (en anglais)

Si vous voulez ne plus voir les compendiums en anglais, il n'existe pas d'autres moyens que de modifier le fichier
de configuration du système `systems/pf1/system.json`.
