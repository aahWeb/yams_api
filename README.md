# Installation et configuration

1. Vérifiez que vous avez les bonnes versions des dépendances 

Installation de la dernière version de Node LTS

:shell:

```bash
nvm install 20.10.0

nvm use 20.10.0

# vérifiez 
node -v
```

## Partie React

Installation de tailwindcss pour **React**

:shell:

```bash
# Installation de tailwindcss
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Dans le fichier tailwind.config.js

```js 
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Dans le fichier style.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

>[!NOTE]
>Voyez également la documentation : https://tailwindcss.com/docs/guides/vite

:shell:

```bash
npm install @reduxjs/toolkit react-redux
npm install dotenv
```

Dans vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// variable dans le code
const api_url = import.meta.env.VITE_REACT_APP_API_URL

```

Dans le fichier .env.development

```txt
VITE_REACT_APP_API_URL=http://localhost:3001/api
```

Il faut installer dans React

:shell:

```bash
npm install js-cookie
```

>[!NOTE]
> Côté Middleware JWT il n'y a rien à faire le cookie s'écrit bien dans le navigateur. Il sera renvoyé au client via withCredentials à true.


1. Le router

:shell:

```bash
npm install react-router-dom localforage match-sorter sort-by
```

## Générer le mot de passe

Importez bcrypt 

```js
import bcrypt from 'bcrypt';

// générer le mot de passe à mettre dans les données de type fichier
const users = [{'password' : 'alice'}]
for(const u of users){
   bcrypt.hash( u.password || '', 10).then(console.log)
}
```

## Partie API YAMS

- Les pastries persistent dans un fichier pastries.json
- Les données utilisateurs sont dans un fichier users.ts ou users.json et ne persiste qu'en mémoire sur le serveur Node

:shell:

```bash
npm install multer @types/multer
```

Pour accéder à une image depuis l'API

http://localhost:3001/uploads/images/1705623642576.jpeg


## Jest

Installation des tests

:shell:

```bash
npm install --save-dev jest typescript ts-jest @types/jest
npx ts-jest config:init

npm install --save-dev supertest @types/supertest
```

Comment lancer les tests :

Dans le package.json


:shell:

```bash
//...
"scripts": {
    "dev": "concurrently \"tsc --watch\" \"tsnd --respawn src/app.ts\"",
    "test": "jest"
  },
// ...
```

:shell:

```bash
npm run test
```

## Organisation des tests

```txt
├── src
│   ├── app.ts
│   ├── routes.ts
│   └── server.ts
├── tests
│   ├── unit
│   │   └── modifyquantity.spec.ts
│   └── integration
│       ├── pastries.test.ts
│       └── other-endpoints.test.ts
├── tsconfig.json
├── jest.config.js
└── package.json
```

- **tests/unit** : Contient des tests unitaires pour des parties spécifiques de votre application (par exemple, des fonctions, des modules).

- **tests/integration** : Contient des tests d'intégration qui testent l'interaction entre différentes parties de votre application, tels que les points finaux express dans votre cas.