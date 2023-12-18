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
```