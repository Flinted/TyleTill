const React = require('react')

const Cashwindow= React.createClass({

onClick(event){
    this.props.onClick(event.target.value, this.props.markerID)
},

render(){
    return(
            <div className='cash-window'>
                <button onClick={this.onClick}className="cash-button" value="1">1</button>
                <button onClick={this.onClick}className="cash-button" value="2">2</button>
                <button onClick={this.onClick}className="cash-button" value="3">3</button>
                <button onClick={this.onClick}className="cash-button" value="4">4</button>
                <button onClick={this.onClick}className="cash-button" value="5">5</button>
                <button onClick={this.onClick}className="cash-button" value="6">6</button>
                <button onClick={this.onClick}className="cash-button" value="7">7</button>
                <button onClick={this.onClick}className="cash-button" value="8">8</button>
                <button onClick={this.onClick}className="cash-button" value="9">9</button>
                <button onClick={this.onClick}className="cash-button" value=".">.</button>
                <button onClick={this.onClick}className="cash-button" value="0">0</button>
                <button onClick={this.onClick}className="cash-button" value="C">C</button>

            </div>
        )

}



})

   


module.exports = Cashwindow
