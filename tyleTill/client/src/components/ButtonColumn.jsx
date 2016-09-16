const React = require('react')

const ButtonColumn= (props) =>(

    <div className='button-column'>
    <button className='menu-button' onClick={props.splitClick}>Split</button>
    <button className='menu-button'>Tables</button>
    <button className='menu-button'>Orders</button>
    <button className='menu-button'>Log Out</button>
    <button className='menu-button'>Save</button>
    </div>
)

module.exports = ButtonColumn