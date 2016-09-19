const React = require('react')

const ButtonColumn= React.createClass({
      onPayClick(){
          this.props.payToggle(this.props.markerID)
      },

      onSplitClick(){
        this.props.splitClick(this.props.markerID)
      },

      onTableClick(){
        this.props.tableToggle(this.props.markerID)
      },


      render(){
        return  (
              <div className='button-column'>
              <image className='menu-button' src= '/images/split.png' onClick={this.onSplitClick}/>
              <image className='menu-button' src= '/images/table.png' onClick={this.onTableClick}/>
              <image className='menu-button' src= '/images/save.png'/>
              <image className='menu-button' src= '/images/logout.png'/>
              <image className='menu-button' src= '/images/pay.png' onClick={this.onPayClick}/>
              </div>
          )

      }



})

module.exports = ButtonColumn