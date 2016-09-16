const React = require('react')

const Item = React.createClass({
  getInitialState(){
    return ({expanded: false, timer: null})
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
        this.setState({expanded:true})
      }
  },

  onClick(event){
    console.log("itemmarker", event)
    this.props.onClick(event, this.props.markerID)
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
        <div className = 'item-button-expanded' onMouseUp={this.stopTimer}>
        <li className = 'item-button' value={this.props.index}  onMouseDown={this.dblClick} >
            <p>{this.props.name}</p>
        </li>
        </div>
        )

    }
    
  }
    


})



  



module.exports = Item