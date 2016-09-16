const React = require('react')

const Infowindow= (props) =>(

    <div className='info-window'>
    <h3>User: {props.user}</h3>
    <h5>Last Order Change: £3.00</h5>
    <h3 id='order-total'>Total: {props.total}</h3>
    </div>
)

module.exports = Infowindow
