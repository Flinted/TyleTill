const React = require('react')
const OrderRow= require('./OrderRow')
_ = require('lodash')

const Orderwindow= React.createClass({



  render(){
    let orderNodes = []
    for(let key in this.props.items[0]){
      let row  =  <OrderRow name={this.props.items[0][key].name} markerID={this.props.markerID}qty={this.props.items[0][key].qty} total={this.props.items[0][key].total} key={key} onClick={this.props.onClick}/>
      orderNodes.push(row)
    }
    
    

    return(
      <div className='order-window'>
      <ul id='order-list'>
      {orderNodes}
      </ul>
      </div>
      )
  }
})

module.exports = Orderwindow
