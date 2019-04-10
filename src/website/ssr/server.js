import path from 'path'
import Express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import rootReducer from '../src/reducers'
import StaticRoot from './StaticRoot'

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

const app = Express()

//Serve static files
app.use('/static', Express.static('static'))

// This is fired every time the server side receives a request
app.use(handleRender)

function getInitialShapes() {
  return new Promise((resolve, reject) => {
    dynamo.scan({ TableName: 'shapes' }, (err, res) => err ? reject(err.message) : resolve(res));
  })
}

// We are going to fill these out in the sections to follow
async function handleRender(req, res) {
  // get initial data
  const initialShapes = await getInitialShapes();
  const initState = {
    shapes: initialShapes.Items,
  }

  // Create a new Redux store instance
  const store = createStore(rootReducer, initState)
  let context = {};

  // Render the component to a string
  const html = renderToString(
    <StaticRoot store={store} location={''} context={context} />
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState))
}

// TODO: store this as a template file not an interpolated string.
function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Social Shapes</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="https://s3.us-east-2.amazonaws.com/social-shapes/bundle.js"></script>
      </body>
    </html>
    `
}

export default app;