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
    this.state.timer = setTimeout(this.toggleExpanded, 500)
  },

  stopTimer(event){
    console.log("up")
    clearInterval(this.state.timer)
    if(this.state.expanded){
      this.toggleExpanded()
    }
    this.onClick(event)
  },

  toggleExpanded(){
      if(this.state.expanded){
        this.setState({expanded:false})
      }else{
        const links = this.getLinks()
        this.setState({expanded:true, linkItems:[{name: "hello"}]})
      }
  },

  getLinks(){
      let itemArray =[
      {name:"" ,size:'' ,price:''},
      {name:"" ,size:'' ,price:''},
      {name:"" ,size:'' ,price:''},
      {name:"" ,size:'' ,price:''},
      {name:this.props.name, value: this.props.index, size:this.props.sizes[0] ,price:this.props.prices[0]},
      {name:"" ,size:'' ,price:''},
      {name:"" ,size:'' ,price:''},
      {name:"" ,size:'' ,price:''},
      {name:"" ,size:'' ,price:''},
      ]
      const sizes = this.props.sizes
      const prices = this.props.prices
      console.log(sizes)

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