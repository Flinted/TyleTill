const React= require('react')

const MenuTray = React.createClass({
  onClick(event){
    this.props.onClick(event.target.value, this.props.markerID)
  },


  render(){

    let buttons=[]
    let categories = this.props.categories
    for(let key in categories){
      for(let item of categories[key] ){
        let button = <button className="menu-item" onClick={this.onClick} key={item} value={item}>{item}</button>
        buttons.push(button)
      }
    }    
  return(
    <div className='menu-tray'>
        {buttons}
    </div>


    )

}


})

module.exports = MenuTray