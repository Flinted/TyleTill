const React = require('react')
const Item = require('./Item')

const ExpandedItem= React.createClass({
    onMouseUp(event){
        console.log(event.target)
        let arrayRef= this.props.items[event.target.id] || 0
        if(arrayRef != 0){arrayRef= arrayRef.size}
        console.log("Array",arrayRef)
        this.props.onMouseUp(event, arrayRef)

    },

    render(){
      console.log(this.props.items[0].name)

      const nodes = this.props.items.map((item, index)=>(
               <li className="subItem" key={"sub"+ index} id={index} value={this.props.value} markerID={this.props.markerID} index={index} onMouseUp={this.onMouseUp} onClick={this.props.onClick}><p>{item.name} ({item.sizeDescriptor})</p></li> 
              ))


      return(
        <div className='item-button-expanded'>
        <ul className="subItem-container">
        {nodes}
        </ul>
      </div>
      )
  }


})
    

module.exports = ExpandedItem