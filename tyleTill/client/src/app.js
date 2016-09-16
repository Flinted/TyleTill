var React = require('react');
var Tyle = require('./components/Tyle');
var ReactDOM = require('react-dom');

window.onload = function(){
  ReactDOM.render(
    <Tyle/>,
    document.getElementById('app')
  );
}
