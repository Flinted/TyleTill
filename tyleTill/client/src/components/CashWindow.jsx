const React = require('react')

const Cashwindow= (props) =>(

    <div className='cash-window'>
        <button onClick={props.onClick}className="cash-button" value="1">1</button>
        <button onClick={props.onClick}className="cash-button" value="2">2</button>
        <button onClick={props.onClick}className="cash-button" value="3">3</button>
        <button onClick={props.onClick}className="cash-button" value="4">4</button>
        <button onClick={props.onClick}className="cash-button" value="5">5</button>
        <button onClick={props.onClick}className="cash-button" value="6">6</button>
        <button onClick={props.onClick}className="cash-button" value="7">7</button>
        <button onClick={props.onClick}className="cash-button" value="8">8</button>
        <button onClick={props.onClick}className="cash-button" value="9">9</button>
        <button onClick={props.onClick}className="cash-button" value="del">del</button>
        <button onClick={props.onClick}className="cash-button" value="0">0</button>
        <button onClick={props.onClick}className="cash-button" value="C">C</button>

    </div>
)

module.exports = Cashwindow
