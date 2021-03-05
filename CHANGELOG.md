# Changelog

Changements apportés au module `pf1-fr`.
Le format est basé sur [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
Ce projet adhère aux principes du [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.21.0] - 2021-03-05
### Changed
- Harmonisation des races (merci @Sarès#1604!)
- Renommage du module pour "Moulinette - Pathfinder 1 - Improvements for french" afin d'harmoniser les dépôts.
- Ajout des dons de race pour les monstres: Férocité, Retenir son souffle, Besoin d'eau et Croc-en-jambe (merci @Sarès#1604!)
- Mise à jour selon Let's contribute
- Ajout du bestiaire avec instructions pour utilisation de la macro

## [1.20.1] - 2021-02-27
### Fixé
- Opérateur non-défini dans les changements de certains dons provoque des comportements inattendus dans la feuille de personnage
- Acrobate des corniches
- Adroit et rapide
- Anonyme
- Aptitude magique (mythique)
- Armure de la Fosse
- Armure naturelle supérieure
- Art du bouclier
- Art du bouclier (mythique)
- Art du bouclier supérieur
- Ascendance aquatique
- Athlétisme
- Athlétisme (mythique)
- Autonome
- Autonome (mythique)
- Chair angélique
- Discret
- Robustesse

## [1.20.0] - 2021-02-21
### Ajouté
- Let's contribute : Gnome, Aasimar, Repousser la mort, Toucher du bien
- Nouveau compendium : templates pour attaques naturelles

## [1.19.0] - 2021-02-16
### Ajouté
- Compendium pour les DV raciaux (merci Almarane#8025!)

## [1.18.0] - 2021-02-13
### Ajouté
- Macro pour générer/mettre à jour le compendium du bestiaire (a été externalisé)
### Fixé
- Problème avec la macro d'importation de personnages avec les attaques multiples
### Supprimé
- Compendiums du bestiaire ne sont plus inclus directement dans le module
- Retrait de la configuration en lien avec les images du bestiaire (géré désormais par la macro)

## [1.17.0] - 2021-02-12
### Ajouté
- Compendium pour les archétypes de classe

## [1.16.3] - 2021-02-10
### Fixé
- Importer un PNJ : lorsque le bonus est négatif, l'attaque n'était pas importé
- Importer un PNJ : les compétences de type "Connaissances" n'étaient pas importées

## [1.16.2] - 2021-02-10
### Fixé
- Impossible d'ouvrir la fiche de certains monstres suite à la mise à jour de `pf1` (ex: cambion)

## [1.16.1] - 2021-02-09
### Fixé
- Retrait des gemmes du compendium des biens de consommation (car déjà dans compendium séparé)
- Problème avec la macro d'importation de personnages avec les bonus d'attaque négatifs

## [1.16.0] - 2021-02-07
### Ajouté
- Compendium : gemmes (pierres précieuses)

## [1.15.0] - 2021-02-07
### Ajouté
- Effet de rage : berserker

## [1.14.0] - 2021-02-07
### Ajouté
- Classes : associations des aptitudes par niveau
- Configuration pour permettre de choisir quand les associations doivent être ajoutées ou non
### Fixé
- Macro "Importer un PNJ" brisée suite à la mise à jour `0.77.7` de `pf1`.

## [1.13.0] - 2021-02-07
### Changé
- Mise à jour des compendiums incluant les récentes contributions (Lets'Contribute)

## [1.12.3] - 2021-02-06
### Ajouté
- Styles CSS de www.pathfinder-fr.org pour améliorer l'affichage des descriptions (bestiaire)
### Changé
- Bestiaire avec images (merci à gobbhile#41770)
- Configuration pour basculer entre le compendium avec/sans images
- Retrait de la macro qui servait à mettre à jour le compendium

## [1.11.1] - 2021-02-04
### Fixé
- Erreur d'accès durant les combats en raison de la mise en évidence

## [1.11.0] - 2021-02-01
### Ajouté
- Nouveau bestiaire (merci à gobbhile#41770)
- Macro pour configurer les images (non-incluses)
- Mise en évidence du jeton du combatant à qui c'est le tour (piste d'initiative)
- Macro de MJ : afficher les effets actifs sur les PJs
- Macro de MJ : lister les changements actifs sur un PJ
- Macro de MJ : afficher les richesses des PJs
- Macro de MJ : afficher les propriétés principales des PJs

## [1.10.0] - 2021-01-16
### Ajouté
- Mise à jour des compendiums incluant les récentes contributions (Lets'Contribute)

## [1.9.0] - 2021-01-01
### Ajouté
- Ajout des gemmes dans les produits de consommation

## [1.8.0] - 2020-12-31
### Changé
- Mise à jour des compendiums incluant les récentes contributions (Lets'Contribute)

## [1.7.1] - 2020-12-13
### Fixé
- La couleur dégradée pour les descriptions dans les messages n'est pas adaptée au mode de jet
- Les macros dans la description ne sont pas cliquables (ex: 3d6)

## [1.7.0] - 2020-12-12
### Ajouté
- Intégration des contributions de Almarane et Chibi Zaké (aptitudes/sorts)

## [1.6.1] - 2020-12-12
### Fixé
- Correction des expressions invalides dans les compendiums (ex: D8 => 1d8)
- Macro "Jets de compétence" corrigée pour permettre de prendre le mode de lancer sélectionné

## [1.6.0] - 2020-12-05
### Ajouté
- Nouvelle macro pour automatiquement mettre à jour la description des éléments d'un acteur

### Changé
- Les effets (modifications) des monstres du bestiaire sont désormais masquées du token (par défaut)

### Fixé
- #8 ajustements des pnj du bestiaire

## [1.5.1] - 2020-11-30
### Fixé
- Changelog mis à jour

## [1.5.0] - 2020-11-30
### Changé
- Mise à jour des données et retrait des doublons 
- Affichage optimisé des cartes dans le chat. Description complète en passant la souris dessus.

## [1.4.0] - 2020-11-29
### Ajouté
- Gestion des changements (écran + notification)

---

*Les versions antérieures à 1.4+ sont anciennes et n'ont pas été maintenues selon les règles de l'art. Seuls les changements les plus pertinents ont été mentionnés et les numéros de version ne respectent pas toujours le [Semantic Versioning](https://semver.org/spec/v2.0.0.html)*

---

## [1.3.55] - 2020-11-28
### Fixé
- Macro d'effet ajouté dans les sorts non-fonctionnelle

## [1.3.53] - 2020-11-28
### Ajouté
- Nouvelle macro pour gérer les effets

## [1.3.52] - 2020-11-28
### Ajouté
- Nouveaux effets : Peau d'écorce, Résistance, Endurance de l'ours, Aide, Splendeur de l'aigle, Inspiration vaillante, Bouclier de la foi, Force de taureau

## [1.3.51] - 2020-11-26
### Changé
- Ajout du lancer individuel à la macro "Aperçu des PJs"

## [1.3.50] - 2020-11-25
### Changé
- Refonte de la macro "Aperçu des PJs" pour permettre le lancer de dés pour tous

## [1.3.33] - 2020-09-26
### Ajouté
- Macros pour les comptéences

## [1.3.15] - 2020-08-04
### Ajouté
- Support pour le système métrique (kg/m)

## [1.3.10] - 2020-07-17
### Ajouté
- Compendium pour les races

## [1.3.9] - 2020-07-17
### Ajouté
- Compendiums pour les armes et armures magiques

## [1.3.6] - 2020-07-13
### Changé
- Description HTML (affichage amélioré)

## [1.3.3] - 2020-07-10
### Ajouté
- Compendium pour les compétences

## [1.3.0] - 2020-07-10
### Ajouté
- Configuration pour masquer les compendiums anglophones (pf1)
- Configuration pour un affichage plus compact des compendiums
### Changé
- Mise à jour des données depuis pathfinder-fr.org
- Retrait des effets conditionnels (remplacés par des notes de contexte)

## [1.2.0] - 2020-06-30
### Ajouté
- Effets conditionnels (macros) pour les dons

## [1.1.0] - 2020-06-28
### Ajouté
- Effets pour les dons (ex: Discret)

## [1.0.1] - 2020-06-22 
### Ajouté
- Première release officielle sur FoundryVTT.com

### Fixé
- CHANGELOG manquant

## [1.0.0] - 2020-06-14 
### Ajouté
- Compendiums: classes, aptitudes de classe, dons, sorts, équipement, créatures
- Import (beta): import de personnages exportés avec l'application Android (https://play.google.com/store/apps/details?id=org.pathfinderfr)
