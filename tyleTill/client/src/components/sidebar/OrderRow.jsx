const React = require('react')

const OrderRow = React.createClass({

  onClick(){
    this.props.onClick(this.props.name,this.props.markerID)
  },

  render(){
    if(parseFloat(this.props.total) < 0){
      return(<li value={this.props.name} onClick={this.onClick} className="payment"><p>PAYMENT: {this.props.qty} * {this.props.name}</p><div className="order-price">{this.props.total.toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</div> </li>) 

    }else{


      return(<li value={this.props.name} onClick={this.onClick}><p>{this.props.qty} * {this.props.name}:</p><div className="order-price">{this.props.total.toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</div> </li>) 

    }
  }
})



module.exports = OrderRow