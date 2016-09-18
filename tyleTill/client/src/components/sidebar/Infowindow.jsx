const React = require('react')

const Infowindow= (props) =>(

    <div className='info-window'>
    <h6>User: {props.user}</h6>
    <h6>Last Order Change: £3.00</h6>
    <h6>Table:</h6>
    <h5>Input: {props.input} </h5> 
    <h4 id='order-total'>Total: {props.total.toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</h4>
    </div>
)

module.exports = Infowindow