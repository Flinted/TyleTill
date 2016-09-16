const React = require('react')

const OrderRow = React.createClass({

    onClick(){
        this.props.onClick(this.props.name,this.props.markerID)
    },

    render(){
      return(<li value={this.props.name} onClick={this.onClick}><p>{this.props.qty} * {this.props.name}:</p><div className="order-price">{this.props.total.toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</div> </li>) 

  }
})

    

module.exports = OrderRow