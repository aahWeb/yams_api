# TODO

## GAME

- Endpoint pour récupérer une patisserie en fonction de son id

- Endpoint pour récupérer 1 ou plusieurs patisseries gagnées (nombre à passer en paramètre) --> cette route doit décrémenter la qty des patisseries retournées --> OK

Principe pour récupérer des patisseries gagnantes on en tire de manière aléatoire du nombre de patisseries à gagner. 

Si on ne peut plus tirer de patisserie on retourne un tableau vide.

```txt
`/game/win-pastries/:quantity`
```

--> OK

## PASTRIES
- Manque l'authentification sur la route delete --> OK

## USERS
- Créer la documentation pour se login et se logout --> OK

## Images

- modifier les noms des images dans le fichier pastries.json dans Data pour correspondre aux images sur le serveur React ?
