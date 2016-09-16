const React = require('react')
const Orderwindow = require('./Orderwindow')
const Itemwindow = require('./Itemwindow')
const Infowindow = require('./Infowindow')
const Cashwindow = require('./Cashwindow')
const CashManager = require('../models/CashManager')
const OrderManager = require('../models/OrderManager')
const ButtonColumn =require('./ButtonColumn')

const Tyle = React.createClass({

  getInitialState(){
    return {
      items: [], 
      displayItems:[],
      primaryUser: "Chris",
      secondaryUser: "Renwick",
      primaryOrderItems:[{}],
      primaryOrderTotal:0.00,
      secondaryOrderItems:[{}],
      secondaryOrderTotal:0.00,
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
        if(markerID === 2){
        currentOrder = this.state.secondaryOrderItems
        }
        const item = this.state.displayItems[event.target.value]
        const ordermanager = new OrderManager
        let newOrderArray = ordermanager.addItem(currentOrder, item)
        const cashmanager = new CashManager
        const total = cashmanager.total(newOrderArray)
        if(markerID === 2){
        this.setState({secondaryOrderItems: newOrderArray, secondaryOrderTotal: total})
        }else{
        this.setState({primaryOrderItems: newOrderArray, primaryOrderTotal: total})
        }
  },

  onOrderRowClick(key, markerID){
      let currentOrder = null
      let items = null;
      if(markerID === 2){
        currentOrder = this.state.secondaryOrderItems
      }else{
        currentOrder = this.state.primaryOrderItems
      }
      const ordermanager = new OrderManager
      let newOrderArray = ordermanager.removeItem(currentOrder, key)
      const cashmanager = new CashManager
      const total = cashmanager.total(newOrderArray)
      if(markerID === 2){
      this.setState({secondaryOrderItems: newOrderArray, secondaryOrderTotal: total})
      }else{
      this.setState({primaryOrderItems: newOrderArray, primaryOrderTotal: total})
    }
  },

  onLongClick(event){

  },

  onSplitClick(){
    console.log("Splitting")
      if(!this.state.split){
        this.setState({split: true})
      }else{
        this.setState({split: false})
      }
  },

  render(){
    if(this.state.split){
      return(
          <div className='tyle-container'>
                <div className="primary">
                      <div id='sidebar'>
                            <Infowindow total={this.state.primaryOrderTotal} user={this.state.primaryUser}/>
                            <Orderwindow markerID={1} items={this.state.primaryOrderItems} onClick={this.onOrderRowClick}/>
                            <Cashwindow />
                      </div>
                      <ButtonColumn splitClick= {this.onSplitClick}/>
                      <Itemwindow markerID={1} class='item-window-split' items={this.state.displayItems} onClick={this.onItemClick} onLongClick={this.onLongClick}/>
                </div>
                <div id="divider"/>
                <div className="secondary">
                    <div id='sidebar'>
                        <Infowindow total={this.state.secondaryOrderTotal} user={this.state.secondaryUser}/>
                        <Orderwindow markerID={2} items={this.state.secondaryOrderItems} onClick={this.onOrderRowClick}/>
                        <Cashwindow />
                    </div>
                    <ButtonColumn splitClick= {this.onSplitClick}/>
                    <Itemwindow markerID={2} class='item-window-split' items={this.state.displayItems} onClick={this.onItemClick} onLongClick={this.onLongClick}/>
                </div>
          </div>
        )
    }else{

    return(
      <div className='tyle-container'>
            <div id='sidebar'>
            <Infowindow total={this.state.primaryOrderTotal} user={this.state.primaryUser}/>
            <Orderwindow markerID={1} items={this.state.primaryOrderItems} onClick={this.onOrderRowClick}/>
            <Cashwindow />
            </div>
            <ButtonColumn splitClick= {this.onSplitClick}/>
            <Itemwindow markerID={1} class= 'item-window' items={this.state.displayItems} onClick={this.onItemClick} onLongClick={this.onLongClick}/>
      </div>
      )

  }
}

})

module.exports = Tyle