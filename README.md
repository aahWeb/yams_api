# Installation et configuration

1. Vérifiez que vous avez les bonnes versions des dépendances 

Installation de la dernière version de Node LTS

```bash
nvm install 20.10.0

nvm use 20.10.0

# vérifiez 
node -v

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

Voyez également la documentation : https://tailwindcss.com/docs/guides/vite


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

```bash
npm install js-cookie
```

- Côté Middleware JWT il n'y a rien à faire le cookie s'écrit bien dans le navigateur. Il sera renvoyé au client via withCredentials à true.


- router

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

## Les données de l'API

- les pastries persistent dans un fichier pastries.json
- les données utilisateurs sont dans un fichier users.ts ou users.json et ne persiste qu'en mémoire sur le serveur Node