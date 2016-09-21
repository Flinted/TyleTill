const React = require('react')
const Item = require('./Item')

const ExpandedItem= React.createClass({
    onMouseUp(event){
        console.log("EXPANDED ITEM CLICK:", event.target)
        let arrayRef= this.props.items[event.target.id] || 0
        if(arrayRef != 0){arrayRef= arrayRef.size}
        this.props.onMouseUp(event, arrayRef)

    },

    render(){
      const nodes = this.props.items.map((item, index)=>(
               <li className="subItem" key={"sub"+ index} id={index} value={this.props.value} markerID={this.props.markerID} index={index} onMouseUp={this.onMouseUp}><p>{item.name}  {item.sizeDescriptor}</p></li> 
              ))

      return(
        <div className='item-button-expanded'>
        <ul className="subItem-container">
        {nodes}
        <li className="exit" value="-1" markerID={this.props.markerID} onMouseUp={this.onMouseUp}><p>EXIT</p></li> 
        </ul>
      </div>
      )
  }


})
    

module.exports = ExpandedItem