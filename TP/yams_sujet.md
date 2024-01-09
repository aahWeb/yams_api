# Sujet App Yams

## Contraintes techniques

# Sujet App Yams

## Contraintes techniques

Certains points dans cette documentation vous sont détaillés à titre d'information, vous n'avez pas à les développer.

1. ⓘ Utilisez l'API Yams développée en Express par nos soins. Voir le fichier **install_api**, récupérez l'API et consultez ses documentations :
    1. API pour le jeu non sécurisé  [api game](./documentation_game_api.md).
    1. CRUD API **sécurisé** [api crud](./documentation_crud_api.md).
    1. user **sécurisé** pour la route logout uniquement [user](./documentation_authentification.md).
    1. me **sécurisé ou pas** tester si l'utilisateur est toujours connecté [me](./documentation_me_api.md).

2. ⓘ Les données de l'API (pâtisseries) persistent dans un fichier **pastries.json**. Les données des utilisateurs sont stockées sur le serveur et ne sont pas modifiées.

3. ⓘ Vous n'avez pas à vous soucier du code source de l'API. Utilisez sa documentation pour développer le projet.

4. ⓘ Attention aux règles **CORS**. Dans les fichiers .env de l'API et .env.development, des adresses spécifiques pour chaque application sont définies. Dans l'API, nous précisons l'adresse de la source dans les variables d'environnement. Cela est nécessaire pour éviter le blocage des requêtes de votre application REACT sur l'API par votre navigateur.

5. 🛡️ L'API est basée sur JWT. Voici le schéma du processus JWT :

```plaintext
User React -> Auth -> Serveur API YAMS -> Émission du JWT (création du cookie) 

-> Signature Numérique -> Transmission au Client (envoi du cookie) 

-> Requêtes au Serveur (envoi du cookie) -> Validation de la Signature (Côté Serveur) 

-> Décodage du JWT (Côté Serveur) -> Vérification des Autorisations 

-> Accès à la Ressource Protégée -> Expiration du JWT (la validité du cookie est fixée à 1h)
```

```js
import cors from "cors";

app.use(cors({
  // url APP REACT
  origin: `http://${APP_REACT_URL}:${APP_REACT_PORT}`,
  credentials: true
}));
```

1. 🚧 Installez un projet React, suivez les indications ci-après, pour mettre en place le projet.


## Présentation du projet

Le propriétaire, **doit se connecter**, de l'application, il fait un CRUD sécurisé sur les pâtisseries.

Le joueur **ne se connecte pas** pour jouer, il joue au Yams pour gagner une pâtisserie.

**Règle du jeu** : on lance 5 dés avec 2 combinaisons gagnantes possibles, 3 fois. Si on tombe sur une combinaison gagnante, le jeu s'arrête. Si au bout de 3 fois on n'a rien gagné, le jeu s'arrête également.

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
    1. Pour rester connecté si on recharge la page avec l'API, nous vous proposons deux solutions
        1. Soit vous utilisez notre Hooks useMe basé sur une requête faite vers le serveur API YAMS pour vérifier que vous êtes connecté.
        [Code du useMe](#useMe) HOC (composant de haut niveau).
        1. Soit vous créez un système de localStorage dans votre application.

## useMe

```js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMe } from "../store/me";
import { changeloggedIn } from "../store/auth";

/**
 * HOC ( composant de haut niveau ) 
 * Hooks permettant de vérifier si après rechargement de la page l'utilisateur est encore connecté
 * - la méthode fetchMe fait une requête sur l'API avec le credentials si celui-ci existe ( cookie créé dans le navigateur), alors la connexion n'échoue pas et on met à true loggeIn 
 * 
 */
const useMe = () => {
    const { user } = useSelector((s) => s.me)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMe())
    }, [])

    useEffect(() =>{
        if( Object.keys(user || {}).length > 0)
            dispatch(changeloggedIn(true))
    }, [user])

    return {
       user
    };
};

export default useMe;
```