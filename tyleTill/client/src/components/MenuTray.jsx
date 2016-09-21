const React= require('react')
const ReactCSSTransitionGroup=require('react-addons-css-transition-group')


const MenuTray = React.createClass({
  onClick(event){
    this.props.onClick(event.target.value, this.props.markerID)
  },

  getInitialState(){
    return ({target: '', timer: null})
  },

  startTimer(event){
    this.setState({target: event.target.value})
    this.state.timer = setTimeout(this.getSubItems, 200)
  },

  stopTimer(event){
    clearInterval(this.state.timer)
    this.onClick(event)
  },

  getSubItems(){
     this.props.onLongClick(this.state.target, this.props.markerID)
  },

  render(){

    if(this.props.show === "sub"){

          let subButtons=[]
          let categories = this.props.subCategories
            for(let item in categories){
              let button = <button className="sub-menu-item" onClick={this.stopTimer} key={item} value={categories[item]}><p>{categories[item]}</p></button>
              subButtons.push(button)
            }
    return(
    
          <div className='sub-menu-tray'>
              {subButtons}
          </div>
          )
    }else if(this.props.show === "hide-sub"){
            return(<div className = "hidden"/>)
    }else{
            let buttons=[]
            let categories = this.props.categories
            if(categories){
              for(let item of categories){
                let button = <button className="menu-item" onMouseDown={this.startTimer} onMouseUp={this.stopTimer} key={item} value={item}><p>{item}</p></button>
                buttons.push(button)
              }
            }
          return(
            <div className='menu-tray'>
                {buttons}
            </div>
            )
    }

   

}


})

module.exports = MenuTray