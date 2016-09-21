const React = require('react')
const ExpandedItem = require('./ExpandedItem')

const Item = React.createClass({
  getInitialState(){
    return ({expanded: false, timer: null, hidetimer:null, linkItems:[]})
  },

  startTimer(){
    clearInterval(this.state.hidetimer)
    this.state.timer = setTimeout(this.toggleExpanded, 200)
    this.state.hidetimer = setTimeout(this.hideItem, 1500)
  },

  stopTimer(event, arrayRef){
    clearInterval(this.state.timer)
    if(this.state.expanded){
      this.toggleExpanded()
    }
    this.onClick(event, arrayRef)
  },

  hideItem(){
    if(this.state.expanded){this.setState({expanded:false})}
  },

  toggleExpanded(){
      if(this.state.expanded){
        this.setState({expanded:false})
      }else{
        const links = this.getLinks()
        this.setState({expanded:true, linkItems:links})
      }
  },

  getLinks(){
      const sizes = this.props.sizes
      let itemArray =[
      {name:"" ,size:'' , sizeDescriptor:""},
      {name:"" ,size:'' , sizeDescriptor:""},
      {name:"" ,size:'' , sizeDescriptor: ""},
      {name:"" ,size:'' , sizeDescriptor: ""},
      {name:this.props.name, value: this.props.index, size: "0", sizeDescriptor:sizes[0]},
      {name:"" ,size:'' , sizeDescriptor: ""}
      ]
      for(let size in sizes){
        itemArray[size]={name: this.props.name, sizeDescriptor: sizes[size] ,value: this.props.index, size: size}
      }
      return itemArray

  },

  onClick(event, arrayRef){
    console.log("CLICK VALUE:",event.target.value)
    if(event.target.value=== -1){return}
    this.props.onClick(event, this.props.markerID,arrayRef)
  },

  render(){
    if(!this.state.expanded){
      return(
        <li className = 'item-button' value={this.props.index}  onMouseDown={this.startTimer} onMouseUp={this.stopTimer}>
            <p>{this.props.name}</p>
        </li>
        )
    }else{
      return(
        <ExpandedItem value={this.props.index} items={this.state.linkItems} name={this.props.name} markerID={this.props.markerID} onMouseUp={this.stopTimer}/>
        )

    }
    
  }
    


})



  



module.exports = Item