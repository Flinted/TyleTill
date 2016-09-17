const React = require('react')
const Item = require('./Item')

const Itemwindow= React.createClass({
  splitClick(){
    this.props.splitClick(this.props.markerID)
  },

  render(){
    if(!this.props.items){ return(<div className={this.props.class}></div> ) }

     const nodes = this.props.items.map((item, index)=>(
       <Item  {...item}  key={index} markerID={this.props.markerID}index={index} onClick={this.props.onClick} onLongClick={this.props.onLongClick}/> 
       ))

   return(
    <ul className={this.props.class}>
    <button className = 'split-button' onClick={this.splitClick}>Split/Merge</button>
    {nodes}
    </ul>
    )
 }  
 

})


module.exports = Itemwindow
