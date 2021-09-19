# Otso - Git
Otso node plugin.

## Getting started.
Run the command:
```
npm install -g otso-node
```

## Commands.
Otso node comes with:
|Command|Description|
|---|---|

## Configuration.
You can pass run options to your package commands by adding the following to your .otsorc file:
```json
{
  "package": {
    "test": {
      "detached": true // This will run the npm test command in detached mode.  This is useful for interacting with the test script.
    }
  }
}
```
