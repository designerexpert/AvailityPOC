# Availity POC https://github.com/designerexpert/AvailityPOC.git

## Q&A

-   Contained within [./utils/QA.md](./utils/QA.md)

## UI Code can be Inspected Further by using a sandbox.

Be warned, the back end Node JS functionality is not pressent in the sandbox environment. For best results test locally or deploy on a docker image that supports NodeJS v 8.11.12+
https://codesandbox.io/s/github/designerexpert/AvailityPOC/tree/master/client

## Structure and Installation:

Application is comprised of a Node JS server using Express and a React Client.

-   To install and test locally:
    -   run: `npm run dev-install` this will install all needed libraries and dependencies.
    -   run: `npm run build` this will build the React application client.
    -   run: `npm start` this will run the Node JS server that in turn also serves the React Client.
    -   navigate to: [http://localhost:8080](http://localhost:8080) using Chrome or any other Browser.
-   After installation of repositories you may also run the development server.
    -   run: `npm run dev` this will run the Node JS server for development with Hot Reload.
    -   run: `npm run client` in another terminal. This will run the React client in development mode with Hot Reload.

## Server and Security Boilerplate In Place Containing:

-   Express
-   JWT
-   Serving React App Statically

## Generating Public and Private Keys for Testing

### FYI: Do Not Commit this files on "real projects".

-   First Generate a Secret Private Key `Don't add passphrase`. This will be kept a secret and used to generate and sign your own tokens.

```
ssh-keygen -t rsa -b 2048 -f secretRS256PRIVATE.pem
```

-   Then Using that Secret Private Key File, generate a public key. This will be shared with anyone validating your signed tokens.

```
openssl rsa -in secretRS256PRIVATE.pem -pubout -outform PEM -out secretRS256PUBLIC.pem
```
