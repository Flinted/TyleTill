const React = require('react')


const OrderSelector = (props) => (

    <ul className={props.class}>
        {props.orders.map((order,index)=>(
            <li key={index} value={index}>
            <div className='order-info'>{order.user}:  {order.time.toLocaleString('en-gb')}</div>
            <div className='order-detail'>
            items: {order.items} total: {order.total.toLocaleString('en-GB', {style:'currency', currency:'GBP'})} payment:{order.payments.toLocaleString('en-GB', {style:'currency', currency:'GBP'})} change: {order.change.toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</div>
            </li>
          ))}

    </ul>

)

module.exports =OrderSelector