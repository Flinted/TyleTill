const React = require('react')

const ButtonColumn= React.createClass({
      onPayClick(){
          this.props.payToggle(this.props.markerID)
      },

      render(){
        return  (
              <div className='button-column'>
              <button className='menu-button'>Save</button>
              <button className='menu-button'>Tables</button>
              <button className='menu-button'>Orders</button>
              <button className='menu-button'>Log Out</button>
              <button className='menu-button' onClick={this.onPayClick}>Pay Screen</button>
              </div>
          )

      }



})

module.exports = ButtonColumn