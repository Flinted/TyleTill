const React = require('react')

const OrderRow = (props) =>(

    <li value={props.index} onClick={props.onClick}><p>{props.qty} * {props.name}:</p><div className="order-price">{props.total.toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</div> </li> 


  )

module.exports = OrderRow