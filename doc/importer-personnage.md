# Importer des personnages

_ATTENTION: cette fonctionnalité est en cours de développement. 
Les étapes ci-dessous requièrent quelques connaissances techniques_

L'import supporte les données suivantes:
* Informations générales (Nom, race, dieu, taille, poids, ...)
* Classe
* Compétences
* Dons
* Aptitudes (sauf archétypes)
* Inventaire
* Modifs (partiel)

## Prérequis

Pour importer un personnage dans Foundry VTT, il est nécessaire d'avoir accès au serveur qui héberge l'application.
C'est donc typiquement l'ordinateur de la personne qui héberge la campagne.

## Étapes à suivre

* Exporter les personnages souhaités depuis l'application Mobile ([Référence](https://github.com/SvenWerlen/pathfinderfr-android/blob/master/docs/user/character/character-main.md))
* Récupérer le(s) fichier(s) au format `.pfc`
* Copier le(s) fichier(s) dans un répertoire accessible de Foundry VTT. Ex: `[foundryvtt-home]/resources/app/public/`

Il est désormais possible d'importer les personnages en suivant les étapes suivantes:

* Depuis l'application, ouvrir la console Javascript (touche F12)
* Dans l'onglet `Console` exécuter la commande `pf1frLoadCharacter("personnage.pfc")`
* La console devrait afficher la progression 

```
Foundry VTT | Created Actor with id zTWA1aR5QZKoUrec
PF1 | Actor Added!
Foundry VTT | Created 70 OwnedItems in parent Actor zTWA1aR5QZKoUrec
```
