This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# APUNTES VALENTINA

## INSTALACIONES

### ESLINT

yarn add eslint eslint-config-get-off-my-lawn --dev
agregar al package json

"eslintConfig": {
"extends": [
"get-off-my-lawn",
"prettier"
],
"rules": {
"react/display-name": 0,
"react/react-in-jsx-scope": 0,
"react/jsx-no-literals": 0,
"no-param-reassign": 0,
"node/no-unpublished-require": 0,
"jsx-a11y/anchor-is-valid": 0,
"no-unused-vars": 0
}
}

npm install --save-dev husky@4 lint-staged prettier

agregar al package json:

"lint-staged": {
"pages/**/\*.{js,jsx,ts,tsx,json,css,scss,md}": "prettier --write",
"components/**/\*.{js,jsx,ts,tsx,json,css,scss,md}": "prettier --write"
},
"husky": {
"hooks": {
"pre-commit": "lint-staged"
}
},

### CHAKRA

npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion

npm install react-icons --save

npm install react-router-dom

# Preguntas Gabriel

Llamado a la API de questions desde quizlist para que reciba el parametro?

quiz-id/[id] Como manejo de forma individual cada value?
