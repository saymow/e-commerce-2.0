<h1 align="center">:fire: E-commerce 2.0 :fire:</h1>

## 📋 About:

<p>&nbsp;&nbsp;&nbsp;&nbsp;An improvement of <a href="https://github.com/saymow/eCommerce-1.0" target="_blank">E-commerce 1.0</a>. An e-commerce implementation with payment integration, admin panel, automated tests.</p>
   
<br />

<h2 align="center">Shop flow</h2>
<video src="https://github.com/saymow/eCommerce-2.0/assets/52419335/49e5c280-2977-4f9a-ab5a-cbcbd027cf87"></video>

<br />

<h2 align="center">Admin flow</h2>
<video src="https://github.com/saymow/eCommerce-2.0/assets/52419335/418115ea-26c4-4200-ab53-f3223dc41a59"></video>

<h2 align="center">Integration tests</h2>
<p align="center">
   <img src="https://github.com/saymow/eCommerce-2.0/assets/52419335/e0c8bb6a-0a2a-4c33-ace2-79633dc359ab"></img>
</p>
<p>The tests are most on the <strong>heavy logic</strong>, such as checkout and payments. Light logics are not covered by automated tests.</p>

<br />
 
## :rocket: Technologies:

### Frontend

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [NextJs](https://github.com/vercel/next.js)
- [Cypress](https://www.cypress.io/)
- [Redux](https://redux.js.org/)
- [Axios](https://github.com/axios/axios)
- [Formik](https://formik.org)
- [Yup](https://github.com/jquense/yup)
- [Styled-components](https://styled-components.com)

### Frontend admin panel

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [CreateReactApp](https://create-react-app.dev/)
- [Cypress](https://www.cypress.io/)
- [Bootstrap](https://react-bootstrap.netlify.app/)
- [Redux](https://redux.js.org/)
- [Axios](https://github.com/axios/axios)
- [Formik](https://formik.org)
- [Yup](https://github.com/jquense/yup)
- [Styled-components](https://styled-components.com)

### Backend

- [Node](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Typeorm](https://typeorm.io/)
- [Jest](https://jestjs.io/)
- [Bull](https://optimalbits.github.io/bull/)
- [Multer](https://www.npmjs.com/package/multer)
- [Yup](https://github.com/jquense/yup)

### Integrations 

- [Paypal](https://www.paypal.com/br/home)
- [Correios](https://www.correios.com.br/atendimento/developers)

### Database

- [PostgreSQL](https://www.postgresql.org)
- [Redis](https://redis.io)

## :clipboard: How to use?

```
# Ensure all dependencies are in the following version: 
NodeJS: v14.21.3
PosgreSQL: v16.1
Redis: v7.2.4

# Clone this repositoy
$ git clone git@github.com:saymow/saymow/eCommerce-2.0

# Change into its directory
$ cd eCommerce-1.0

# INSTRUCTIONS TO RUN BACKEND AND ADMIN PANEL:

# Change directory to backend.
$ cd ./backend

# For all files ending with ".template.env", create a file ".env" and fill alt environemnts variables.
# Example:
$ cp test.template.env test.env 

# Run this command

# Install dependencies
$ npm install

# Change directory to admin-panel
$ cd ./admin-planel

# For all files ending with ".template.env", create a file ".env" and fill alt environemnts variables.
# Obs: typeorm.test.template.env is inteended to store the credentials for the database using during tests
# Example:
$ cp test.template.env test.env 

# Install dependenceis
$ npm install

# Change directory back to backend
$ cd ..

# Run all database migrations
$ npm run typeorm migrations:run

# Run backend, admin-panel and queue worker (This runs 3 scripts, one for each process)
$ npm run dev 

# (Optinal) in another terminal window, run integration tests
$ npm run test

# INSTRUCTIONS TO RUN FRONTEND:

# Change directory to frontend.
$ cd ./frontend

# Install dependencies
$ npm install

# Run this command
$ npm run dev

# (Optinal) in another terminal window, run e2e tests (checkout cypress installation if needed)
$ npm run cypress:start
```

