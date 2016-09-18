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
              <button className='menu-button' onClick={this.onSplitClick}>Toggle Split</button>
              <button className='menu-button' onClick={this.onTableClick}>Tables</button>
              <button className='menu-button'>Orders</button>
              <button className='menu-button'>Log Out</button>
              <button className='menu-button' onClick={this.onPayClick}>Pay Screen</button>
              </div>
          )

      }



})

module.exports = ButtonColumn