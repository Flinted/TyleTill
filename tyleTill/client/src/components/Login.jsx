const React = require('react')

const Login = React.createClass({
  getInitialState(){
      return({code: '', displayCode:["T","Y","L","E"]})
  },

  onClick(event){
      const newPress= event.target.value
      if(newPress === "C"){
        this.setState({code: '', displayCode:["T","Y","L","E"]})
        return
      }
      let input= this.state.code
      let display = this.state.displayCode
      input += newPress
      display[input.length-1] = "*"
      this.setState({code:input, displayCode: display})
      
      if(input.length === 4){
        this.setState({code: '', displayCode:["T","Y","L","E"]})
        console.log(this.props.users)
        for(let user of this.props.users){
          if(parseInt(input) === user.code){
            this.props.onLogin(user, this.props.markerID)
            return
          }
        }
      }
  },

  render(){
    if(!this.props.display){
      return(<div className='hidden'/>)
    }else{
        let info=''
      if(this.props.change){
        info= <h2>Order Complete, last change: {(this.props.change * -1).toLocaleString('en-GB', {style:'currency', currency:'GBP'})}</h2>
      }else{
        info = <h2>Please enter your 4 digit pin</h2>
      }  

      return(
          <div className='login-show'>
          <div id="logo">
              <div><h1>{this.state.displayCode[0]}</h1></div>
              <div><h1>{this.state.displayCode[1]}</h1></div>
              <div><h1>{this.state.displayCode[2]}</h1></div>
              <div><h1>{this.state.displayCode[3]}</h1></div>
          </div>
          <div className="login-window">
          <button onClick={this.onClick}className="login-button" value="1">1</button>
          <button onClick={this.onClick}className="login-button" value="2">2</button>
          <button onClick={this.onClick}className="login-button" value="3">3</button>
          <button onClick={this.onClick}className="login-button" value="4">4</button>
          <button onClick={this.onClick}className="login-button" value="5">5</button>
          <button onClick={this.onClick}className="login-button" value="6">6</button>
          <button onClick={this.onClick}className="login-button" value="7">7</button>
          <button onClick={this.onClick}className="login-button" value="8">8</button>
          <button onClick={this.onClick}className="login-button" value="9">9</button>
          <button onClick={this.onClick}className="login-button" value="0">0</button>
          <button onClick={this.onClick}className="login-button" value="C">C</button>
          </div>
          {info}
          </div>
        )
    }

  }

})


module.exports = Login