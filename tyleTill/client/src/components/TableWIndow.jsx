const React = require('react')
const ReactCSSTransitionGroup=require('react-addons-css-transition-group')


const TableWindow = React.createClass({
  tableClick(event){
      this.props.onClick(event.target.id, this.props.markerID)
  },

  render(){
    
    if(!this.props.display) { return(<div className="hidden"> </div> )}

      const data =this.props.tables
      let tables = []
      let className = null

       for(let key in data){
              if(data[key].length > 0 ){
                className = "table-taken"
              }else{
                className = "table-free"            
              }
                tables.push(<div className={className} id={key} key={key} onClick={this.tableClick}>{key}</div>)
        }

    return(
      <ReactCSSTransitionGroup
               transitionName="background"
               transitionAppear={true} 
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
             >
        <div className="table-show">
            {tables}
        </div>
    </ReactCSSTransitionGroup>
      )

  }



})


module.exports = TableWindow