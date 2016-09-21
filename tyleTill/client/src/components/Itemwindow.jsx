const React = require('react')
const Item = require('./Item')
const CashDisplay = require('./CashDisplay')

const Itemwindow= React.createClass({

  render(){

    // returns empty div if no items
    if(!this.props.items){ return(<div className={this.props.class}></div> ) }
      // prepares items for item display 
     const nodes = this.props.items.map((item, index)=>(
       <Item  {...item}  key={index} markerID={this.props.markerID}index={index} onClick={this.props.onClick} onLongClick={this.props.onLongClick}/> 
       ))


   if(this.props.cashDisplay){
      // displays item window with CashDisplay if active
      return(
        <div className="holder">
        <CashDisplay markerID={this.props.markerID} onClick={this.props.onPayClick}/>
       <ul className="item-window-cash-display">
       {nodes}
       </ul>
       </div>
       )
   }else{
   return(
    // displays item window no cash display
    <ul className={this.props.class}>
    {nodes}
    </ul>
    )
 }  
}

})


module.exports = Itemwindow
