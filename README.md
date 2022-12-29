# Nikola Mitic InstaPro

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run?

In the project directory, you can run:

### `npm install`

### `npm run json-server` - for local server mock (not needed for app to run)

### `npm run start` - for client

## Please note

- If running mock server, please make sure that the port 3000 is available
- Client port should offer different one in case taken

#### Initial brain-storming miro board if interested https://miro.com/app/board/uXjVP3XEAU4=/

## What would I do differently if more time?

- Add type safety either run or build time
- Handle network requests errors
- Write semantic and screen readers friendly html and css
- Implement layout component to manage grid system
- Make state updated granular, the way is done right now is easier to manage but not great for performance, each
  state update operates on the whole data board data, and the same is set over to remote. This is the most important
  change I would make, and the one with the biggest impact if this is ever to go to production.  