const React = require('react')

const Login = React.createClass({


  render(){
    if(!this.props.display){
      return(<div className='hidden'/>)
    }else{
      return(
          <div className='login-show'/>
        )
    }

  }

})


module.exports = Login