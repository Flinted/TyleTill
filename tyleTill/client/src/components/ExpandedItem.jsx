const React = require('react')
const Item = require('./Item')

const ExpandedItem= function(props){
    console.log(props.items[0].name)

    const nodes = props.items.map((item, index)=>(
             <div className="subItem" key={index} markerID={props.markerID} index={index} onClick={props.onClick}>{item.name} </div> 
            ))


    return(
      <li className='item-button-expanded' onMouseUp={props.onMouseUp}>
      <div className="subItem-container">
      {nodes}
      <div className= "subItem">test</div>
      <div className= "subItem">test</div>
      <div className= "subItem">test</div>
      <div className= "subItem">ITEM</div>
      <div className= "subItem">test</div>
      <div className= "subItem">test</div>
      <div className= "subItem">test</div>
      <div className= "subItem">test</div>
      </div>
    </li>
    )
}

module.exports = ExpandedItem