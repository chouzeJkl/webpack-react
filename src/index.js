import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

console.log(App)
const renderApp = (App) => ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);
renderApp(App);
/* HMR模块热替换 */
if (module.hot) {
  module.hot.accept('./app.js', function() {
    console.log('%cAccepting the updated react module!', 'color: #1890ff');
    const nextApp = require('./app.js').default;
    renderApp(nextApp);
  })
}
