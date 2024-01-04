# Documentation de l'API Pastries

## Introduction

Bienvenue dans la documentation de l'API Pastries, une API simple pour la gestion de pâtisseries. Cette API permet de récupérer la liste des pâtisseries ainsi que de mettre à jour le statut de choix d'une pâtisserie spécifique.

## Base de l'API

### URL de base

L'URL de base de l'API est définie par le chemin relatif `/api`.

### Endpoints disponibles

1. **Récupérer la liste des pâtisseries**
   - **Endpoint :** `/pastries`
   - **Méthode :** `GET`
   - **Description :** Récupère la liste complète des pâtisseries.
   - **Réponses :**
     - Code 200 : Succès de la requête avec la liste des pâtisseries.
     - Code 400 : Erreur en cas de problème lors de la lecture du fichier de données.

2. **Récupérer une pâtisserie par ID**
   - **Endpoint :** `/pastrie/:id`
   - **Méthode :** `GET`
   - **Description :** Récupère les détails d'une pâtisserie spécifique en fonction de son ID.
   - **Paramètres URL :**
     - `id` (string) : L'identifiant unique de la pâtisserie.
   - **Réponses :**
     - Code 200 : Succès de la requête avec les détails de la pâtisserie.
     - Code 404 : La pâtisserie avec l'ID spécifié n'a pas été trouvée.
     - Code 400 : Erreur en cas de problème lors de la lecture ou de l'écriture du fichier de données.

## Exemples d'utilisation

### Récupérer la liste des pâtisseries

- **Requête :**
  ```http
  GET /api/pastries

```json
[
  {
    "id": "1",
    "name": "Tarte aux fraises",
    "quantity": 10,
    "image": "strawberry-pie.jpg",
    "choice": false
  },
  {
    "id": "2",
    "name": "Éclair au chocolat",
    "quantity": 15,
    "image": "chocolate-eclair.jpg",
    "choice": true
  },
  // ... autres pâtisseries
]

```

### Récupérer une pâtisserie par ID

```txt
GET /api/pastrie/2
```

```json
{
  "id": "2",
  "name": "Éclair au chocolat",
  "quantity": 15,
  "image": "chocolate-eclair.jpg",
  "choice": true
}

```

- réponse Code 404

```json
{
  "message": "Pâtisserie non trouvée !"
}
```

### Remarques

- Les données des pâtisseries sont stockées dans un fichier JSON spécifié par la variable d'environnement DATA_PASTRIES.

- Les opérations de lecture et d'écriture sur le fichier de données sont gérées de manière asynchrone.

- En cas de problème lors de l'accès au fichier de données, des réponses avec le code 400 sont renvoyées pour informer l'utilisateur de l'erreur.
