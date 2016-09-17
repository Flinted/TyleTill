const React = require('react')
const Item = require('./Item')
const CashDisplay = require('./CashDisplay')

const Itemwindow= React.createClass({
  splitClick(){
    this.props.splitClick(this.props.markerID)
  },

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
        <div className={this.props.class}>
        <CashDisplay/>
       <ul className="item-window-cash-display">
       <button className = 'split-button' onClick={this.splitClick}>Split/Merge</button>
       {nodes}
       </ul>
       </div>
       )
   }else{
   return(
    // displays item window no cash display
    <ul className={this.props.class}>
    <button className = 'split-button' onClick={this.splitClick}>Split/Merge</button>
    {nodes}
    </ul>
    )
 }  
}

})


module.exports = Itemwindow
