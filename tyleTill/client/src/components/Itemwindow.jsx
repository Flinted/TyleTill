const React = require('react')
const Item = require('./Item')

const Itemwindow= function(props){
      if(!props.items){ return(<div className={props.class}></div> ) }

    const nodes = props.items.map((item, index)=>(
             <Item  {...item}  key={index} markerID={props.markerID}index={index} onClick={props.onClick} onLongClick={props.onLongClick}/> 
            ))

    return(
      <ul className={props.class}>
       {nodes}
    </ul>
    )
}

module.exports = Itemwindow
