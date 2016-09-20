const React = require('react')
const ReactCSSTransitionGroup=require('react-addons-css-transition-group') 


const CashDisplay = React.createClass({
    onClick(event){
            this.props.onClick(event.target.value, this.props.markerID)

    },

    render(){
        return(
        // <ReactCSSTransitionGroup
        //              transitionName="background"
        //              transitionAppear={true} 
        //              transitionAppearTimeout={500}
        //              transitionEnterTimeout={500}
        //              transitionLeaveTimeout={500}
        // >
            <div className='cash-display'>
            <button onClick={this.onClick} className="pay-button" value='discount'>Discount</button>
            <button onClick={this.onClick} className="pay-button" value='card'>Card</button>
            <button onClick={this.onClick} className="pay-button" value='mobile'>Mobile Pay</button>
            <button onClick={this.onClick} className="pay-button" value='20'>£20</button>
            <button onClick={this.onClick} className="pay-button" value='10'>£10</button>
            <button onClick={this.onClick} className="pay-button" value='5'>£5</button>
            <button onClick={this.onClick} className="pay-button" value='cash'>Cash</button>
            </div>
            // </ReactCSSTransitionGroup>



          )


    }



})

module.exports = CashDisplay