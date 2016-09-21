const React = require('react')

const Infowindow= (props) =>(

    <div className='info-window'>
    <div><h5>User:</h5><h6>{props.user}</h6></div>
    <div><h5>Input:</h5><h5>{props.input}</h5></div>
    <div><h5>Change:</h5><h5>{props.change.toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</h5></div>
    <div><h5>Date:</h5><h5>{props.date}</h5><h5>{props.time}</h5></div>
    <h4 id='order-total'>Total: {props.total.toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</h4>
    </div>
)

module.exports = Infowindow
