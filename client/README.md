# Client Created using create-react-app

## When Node JS Server is Moved to another PORT

-   Change the proxy option inside the client's `./package.json/` to reflect the port changes.

```JSON
"proxy": "http://localhost:8080"
```

-   The React application is configured to connect to check that endpoint when a route is not handled by the client.

## Committing the Build Files

-   This React application is designed to be built locally and commit the changes to git, this will ensure that the project builds no matter the environment it is deployed in.
