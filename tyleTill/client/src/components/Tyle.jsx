const React = require('react')
const Orderwindow = require('./sidebar/Orderwindow')
const Itemwindow = require('./Itemwindow')
const Infowindow = require('./sidebar/Infowindow')
const Cashwindow = require('./sidebar/Cashwindow')
const CashManager = require('../models/CashManager')
const OrderManager = require('../models/OrderManager')
const ButtonColumn =require('./ButtonColumn')

const Tyle = React.createClass({

  getInitialState(){
    return {
      items: [], 
      displayItems:[],
      primaryUser: "Chris",
      primaryOrderItems:[{}],
      primaryOrderTotal:0.00,
      primaryInput:'',
      primaryCashDisplay: true,
      secondaryUser: "Renwick",
      secondaryOrderItems:[{}],
      secondaryOrderTotal:0.00,
      secondaryInput:'',
      secondaryCashDisplay: true,
      split: false

    }
  },

  componentDidMount(){
    console.log("attempting api call")
    const request = new XMLHttpRequest();
    request.open("GET","http://localhost:5000/api/divisions");
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = () =>{
      if (request.status === 200){
        if(request.responseText){
          const jsonString = request.responseText;
          const response = JSON.parse(jsonString)
          const displayItems = this.prepareItems(response[0].types[0].subtypes[1].items)
          console.log(response)
          this.setState({items: response, displayItems: displayItems})
        }
      }else{
        console.log("error on fetch", request.status)
      }
    }
    request.send(null);
  },

  prepareItems(items){
    let parsedItems =[]
    for(let item of items){
      let parseItem = item
      parseItem.sizes = JSON.parse(item.sizes)
      parseItem.prices = JSON.parse(item.prices)
      parsedItems.push(parseItem)
    }
    return parsedItems
  },

  onItemClick(event, markerID){
    let currentOrder = this.state.primaryOrderItems
    let input = this.state.primaryInput
    if(markerID === 2){
      currentOrder = this.state.secondaryOrderItems
      input = this.state.secondaryInput
    }
    const item = this.state.displayItems[event.target.value]
    const ordermanager = new OrderManager
    let newOrderArray = ordermanager.addItem(currentOrder, item, input)
    const cashmanager = new CashManager
    const total = cashmanager.total(newOrderArray)
    if(markerID === 2){
      this.setState({secondaryOrderItems: newOrderArray, secondaryOrderTotal: total, secondaryInput:''})
    }else{
      this.setState({primaryOrderItems: newOrderArray, primaryOrderTotal: total, primaryInput:''})
    }
  },

  onOrderRowClick(key, markerID){
    let currentOrder = null
    let items = null;
    let input = null;
    if(markerID === 2){
      currentOrder = this.state.secondaryOrderItems
      input = this.state.secondaryInput
    }else{
      currentOrder = this.state.primaryOrderItems
      input = this.state.primaryInput
    }
    const ordermanager = new OrderManager
    let newOrderArray = ordermanager.removeItem(currentOrder, key, input)
    const cashmanager = new CashManager
    const total = cashmanager.total(newOrderArray)
    if(markerID === 2){
      this.setState({secondaryOrderItems: newOrderArray, secondaryOrderTotal: total, secondaryInput: ''})
    }else{
      this.setState({primaryOrderItems: newOrderArray, primaryOrderTotal: total, primaryInput:''})
    }
  },

  cashButtonClick(event, markerID){
    const input = event.target.value

    switch(input){
        case 'del':
            break;
        case 'C':
            if(markerID=== 2){
              this.setState({secondaryInput:''})
            }else{
              this.setState({primaryInput:''})
            }
            break;
        default:
            let newInput = this.state.primaryInput
            if(markerID===2){newInput = this.state.secondaryInput}
                if(newInput.length < 3){
                    newInput += input
                }
            if(markerID===2){
                this.setState({secondaryInput:newInput})
            }else{
                this.setState({primaryInput:newInput})
          }
        }
      },

      onSplitClick( markerID){
        console.log("Splitting")
        if(!this.state.split){
          this.setState({split: true})
        }else{
          if(markerID=== 2){
            this.setState({split: false, 
              primaryOrderItems: this.state.secondaryOrderItems, 
              primaryOrderTotal: this.state.secondaryOrderTotal, 
              primaryUser: this.state.secondaryUser,
              primaryCashDisplay: this.state.secondaryCashDisplay,
              secondaryOrderItems:[{}],
              secondaryOrderTotal: 0,
              secondaryUser: this.state.primaryUser,
              secondaryCashDisplay: false
            })
          }else{
            this.setState({split:false})
          }
        }
      },

      render(){
        if(this.state.split){
          return(
            <div className='tyle-container'>
            <div className="primary">
            <div id='sidebar'>
            <Infowindow 
            input={this.state.primaryInput} 
            total={this.state.primaryOrderTotal} 
            user={this.state.primaryUser}
            />
            <Orderwindow 
            markerID={1} 
            items={this.state.primaryOrderItems} 
            onClick={this.onOrderRowClick}
            />
            <Cashwindow 
            markerID={1} 
            onClick={this.cashButtonClick} 
            />
            </div>
            <ButtonColumn 
            />
            <Itemwindow 
            markerID={1} 
            class='item-window-split' 
            cashDisplay={this.state.primaryCashDisplay}
            splitClick= {this.onSplitClick}
            items={this.state.displayItems} 
            onClick={this.onItemClick} 
            onLongClick={this.onLongClick}
            />
            </div>

            <div id="divider"/>

            <div className="secondary">
            <div id='sidebar'>
            <Infowindow 
            input={this.state.secondaryInput} 
            total={this.state.secondaryOrderTotal} 
            user={this.state.secondaryUser}
            />
            <Orderwindow 
            markerID={2} 
            items={this.state.secondaryOrderItems} 
            onClick={this.onOrderRowClick}
            />
            <Cashwindow 
            markerID={2} 
            onClick={this.cashButtonClick}
            />
            </div>
            <ButtonColumn 
            />
            <Itemwindow 
            markerID={2} 
            cashDisplay={this.state.secondaryCashDisplay}
            splitClick= {this.onSplitClick}
            class='item-window-split' 
            items={this.state.displayItems} 
            onClick={this.onItemClick} 
            onLongClick={this.onLongClick}
            />
            </div>
            </div>
            )
        }else{

          return(
            <div className='tyle-container'>
            <div id='sidebar'>
            <Infowindow 
            input={this.state.primaryInput} 
            total={this.state.primaryOrderTotal} 
            user={this.state.primaryUser}
            />
            <Orderwindow 
            markerID={1} 
            items={this.state.primaryOrderItems} 
            onClick={this.onOrderRowClick}
            />
            <Cashwindow 
            markerID={1} 
            onClick={this.cashButtonClick}/>
            </div>
            <ButtonColumn 
            />
            <Itemwindow 
            markerID={1} 
            cashDisplay={this.state.primaryCashDisplay}
            splitClick= {this.onSplitClick}
            class= 'item-window' 
            items={this.state.displayItems} 
            onClick={this.onItemClick} 
            onLongClick={this.onLongClick}
            />
            </div>
            )

        }
      }

    })

module.exports = Tyle