const React = require('react')

const CashDisplay = React.createClass({
    onClick(event){
            this.props.onClick(event.target.value, this.props.markerID)

    },

    render(){
        return(
            <div className='cash-display'>
            <button onClick={this.onClick} className="pay-button" value='discount'>Discount</button>
            <button onClick={this.onClick} className="pay-button" value='card'>Card</button>
            <button onClick={this.onClick} className="pay-button" value='mobile'>Mobile Pay</button>
            <button onClick={this.onClick} className="pay-button" value='20'>£20</button>
            <button onClick={this.onClick} className="pay-button" value='10'>£10</button>
            <button onClick={this.onClick} className="pay-button" value='5'>£5</button>
            <button onClick={this.onClick} className="pay-button" value='cash'>Cash</button>
            </div>



          )


    }



})

module.exports = CashDisplay