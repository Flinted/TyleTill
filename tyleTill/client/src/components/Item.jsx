const React = require('react')
const ExpandedItem = require('./ExpandedItem')

const Item = React.createClass({
  getInitialState(){
    return ({expanded: false, timer: null, linkItems:[]})
  },

  checkSubItem(){

  },

  startTimer(){
    console.log("down")
    this.state.timer = setTimeout(this.toggleExpanded, 200)
  },

  stopTimer(event, arrayRef){
    console.log("up")
    clearInterval(this.state.timer)
    if(this.state.expanded){
      this.toggleExpanded()
    }
    this.onClick(event, arrayRef)
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
      {name:"" ,size:'' , sizeDescriptor: ""},
      {name:"" ,size:'' , sizeDescriptor: ""},
      {name:"" ,size:'' , sizeDescriptor: ""},
      {name:"" ,size:'' , sizeDescriptor: ""},
      ]
      console.log(sizes)
      for(let size in sizes){
        itemArray[size]={name: this.props.name, sizeDescriptor: sizes[size] ,value: this.props.index, size: size}
      }
      return itemArray

  },

  onClick(event, arrayRef){
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
        <ExpandedItem value={this.props.index} onClick={this.checkSubItem} items={this.state.linkItems} name={this.props.name} markerID={this.props.markerID} onMouseUp={this.stopTimer}/>
        )

    }
    
  }
    


})



  



module.exports = Item