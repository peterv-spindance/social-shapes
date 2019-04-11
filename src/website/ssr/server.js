import path from 'path'
import Express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import rootReducer from '../src/reducers'
import StaticRoot from './StaticRoot'
import doc from 'dynamodb-doc';
import AWS from 'aws-sdk';

const dynamo = new doc.DynamoDB();
const s3 = new AWS.S3();
const app = Express()

app.use('/static', Express.static('static'))
app.use(handleRender)

function getInitialShapes() {
  return new Promise((resolve, reject) => {
    dynamo.scan({ TableName: 'shapes' }, (err, res) => err ? reject(err.message) : resolve(res));
  })
}

function getBundledApp() {
  return new Promise((resolve, reject) => {
    s3.getObject({
      Bucket: "social-shapes",
      Key: "bundle.js"
    }, (err, data) => {
      if (err) {
        console.error('Error: ' + err);
        reject(err);
      } else {
        resolve(data.Body);
      }
    });
  });
}

async function handleRender(req, res) {
  console.log('Running function...');


  // get initial data
  console.log('Getting initial shapes...');
  const initialShapes = await getInitialShapes();
  const initState = {
    shapes: initialShapes.Items.reduce((acc, next) => { return {...acc, [next.shapeId]: next} }, {}),
  }

  // Create a new Redux store instance
  console.log('Creating store...');
  const store = createStore(rootReducer, initState)
  let context = {};

  // Render the component to a string
  console.log('Rendering intial app');
  const html = renderToString(
    <StaticRoot store={store} location={''} context={context} />
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  console.log('Getting bundled app code...');
  const bundledAppResponse = await getBundledApp();
  console.log('done getting');

  // Send the rendered page back to the client
  const renderedPage = renderFullPage(html, preloadedState, bundledAppResponse.toString());
  console.log('done rendering');

  res.send(renderedPage);
}

// TODO: store this as a template file not an interpolated string.
function renderFullPage(html, preloadedState, bundledApp) {
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
        <script>${bundledApp}</script>
      </body>
    </html>
    `
}

export default app;