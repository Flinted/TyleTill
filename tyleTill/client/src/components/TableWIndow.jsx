const React = require('react')


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
        <div className="table-show">
            {tables}
        </div>
      )

  }



})


module.exports = TableWindow