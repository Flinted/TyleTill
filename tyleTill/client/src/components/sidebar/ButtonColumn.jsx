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

      onLogout(){
        this.props.logout(this.props.markerID)
      },

      onOrderToggle(){
        this.props.orderToggle(this.props.markerID)
      },

      onCashClick(){
        this.props.cashClick('cash', this.props.markerID)
      },

      render(){
        return  (
              <div className='button-column'>
              <image className='menu-button' src= '/images/split.png' onClick={this.onSplitClick}/>
              <image className='menu-button' src= '/images/table.png' onClick={this.onTableClick}/>
              <image className='menu-button' src= '/images/save.png' onClick={this.onOrderToggle}/>
              <image className='menu-button' src= '/images/logout.png' onClick={this.onLogout}/>
              <image className='menu-button' src= '/images/pay.png' onClick={this.onPayClick}/>
              <button className='quick-cash' value='cash' onClick={this.onCashClick}>QUICK CASH</button>
              </div>
          )

      }



})

module.exports = ButtonColumn