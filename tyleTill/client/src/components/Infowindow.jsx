const React = require('react')

const Infowindow= (props) =>(

    <div className='info-window'>
    <h5>User: {props.user}</h5>
    <h5>Last Order Change: £3.00</h5>
    <h5>Input: {props.input}</h5>
    <h3 id='order-total'>Total: {props.total.toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</h3>
    </div>
)

module.exports = Infowindow
