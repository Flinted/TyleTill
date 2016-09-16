const React = require('react')
const Item = require('./Item')

const ExpandedItem= function(props){

   if(props.items){ const nodes = props.items.map((item, index)=>(
             <Item  {...item}  key={index} markerID={props.markerID}index={index} onClick={props.onClick} onLongClick={props.onLongClick}/> 
            ))
 }

    return(
      <li className='item-button-expanded' onMouseUp={props.onMouseUp}>
      <div className="subItem-container">
      <div className= "subItem">test</div>
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