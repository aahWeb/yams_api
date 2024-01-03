# Sujet App Yams

## Contraintes techniques

1. Utilisez l'API yams développée en Express par nos soins, voir le fichier **install_api**, récupérez l'API **TODO**...

1. Installez un projet React, suivez les indications ci-après, pour mettre en place le projet.

## Présentation

Le propriétaire de l'application peut faire un CRUD sécurisé sur les pâtisseries.

Le joueur ne se connecte pas pour jouer, il joue au Yams pour gagner une pâtisserie.

Règle du jeu : on lance 5 dés avec 2 combinaisons gagnantes possibles, 3 fois. Si on tombe sur une combinaison gagnante, le jeu s'arrête. Si au bout de 3 fois on n'a rien gagné, le jeu s'arrête également.

Si on veut re-tester le jeu, il faut rafraîchir la page.

1. Brelan ( 3 dés identiques ), gagne 1 pâtisserie.
1. Carré ( 4 dés identiques ), gagne 2 pâtisseries.


## Mise en place du projet

1. Installez React avec Vite.

1. Créez la page pour jouer au Yams.

    1. Développez le jeu.
    1. Créez une page de résultat pour afficher le nombre de pâtisseries gagnées.

1. Créez le CRUD pour la gestion des pâtisseries.

    1. Créez une page de connexion en fonction de l'API Yams (voir la documentation des routes).
    1. Mettez en place le CRUD.
