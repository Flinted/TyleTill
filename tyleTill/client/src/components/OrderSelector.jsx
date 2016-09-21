const React = require('react')


const OrderSelector = React.createClass({
onClick(event){
  this.props.onClick(event.target.value, this.props.markerID)
},

render(){
  return(
      <ul className={this.props.class}>
          {this.props.orders.map((order,index)=>(
              <li key={index} value={index} onClick={this.onClick}>
              <div className='order-info'><p>{order.user}:  {order.time.toLocaleString('en-gb')}</p></div>
              <div className='order-detail'>
              <p>items: {order.items} total: {order.total.toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</p> 
              <p>payment:{order.payments.toLocaleString('en-GB', {style:'currency', currency:'GBP'})} change: {order.change.toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</p></div>
              </li>
            ))}

      </ul>
    )

}

})

    



module.exports =OrderSelector