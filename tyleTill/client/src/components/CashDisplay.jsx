const React = require('react')

const CashDisplay = React.createClass({
    render(){
        return(
            <div className='cash-display'>
            <button className="pay-button" value='discount'>Discount</button>
            <button className="pay-button" value='card'>Card</button>
            <button className="pay-button" value='cash'>Cash</button>
            <button className="pay-button" value='5'>£50</button>
            <button className="pay-button" value='5'>£20</button>
            <button className="pay-button" value='5'>£10</button>
            <button className="pay-button" value='5'>£5</button>
            <button className="pay-button" value='exact'>Exact Cash</button>
            </div>



          )


    }



})

module.exports = CashDisplay