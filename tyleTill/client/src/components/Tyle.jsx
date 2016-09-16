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
      primaryOrderItems:[{test:{id: 1, name: "test", qty:1, total:10.00}}],
      primaryOrderTotal:0.00,
      secondaryOrderItems:[{test2:{id: 1, name: "test2", qty:1, total:15.00}}],
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
        console.log(event.target.value)
        console.log("marker", markerID)
        let currentOrder = this.state.primaryOrderItems
        if(markerID === 2){
            console.log("hitting secondary for items")
        currentOrder = this.state.secondaryOrderItems
        }

        const item = this.state.displayItems[event.target.value]
        const ordermanager = new OrderManager
        let newOrderArray = ordermanager.addItem(currentOrder, item)
        console.log("tyle state", newOrderArray)
        const cashmanager = new CashManager
        const total = cashmanager.total(newOrderArray).toLocaleString('en-GB', {style:'currency', currency:'GBP'})
        if(markerID == 2){
            console.log("hitting secondary")
        this.setState({secondaryOrderItems: newOrderArray, secondaryOrderTotal: total})
        }else{
            console.log("hitting primary")
        this.setState({primaryOrderItems: newOrderArray, primaryOrderTotal: total})
        }
  },

  onOrderRowClick(event){
        console.log('clicked')
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
                            <Infowindow total={this.state.primaryOrderTotal}/>
                            <Orderwindow items={this.state.primaryOrderItems} onClick={this.onOrderRowClick}/>
                            <Cashwindow />
                      </div>
                      <ButtonColumn splitClick= {this.onSplitClick}/>
                      <Itemwindow markerID={1} class='item-window-split' items={this.state.displayItems} onClick={this.onItemClick} onLongClick={this.onLongClick}/>
                </div>
                <div id="divider"/>
                <div className="secondary">
                    <div id='sidebar'>
                        <Infowindow total={this.state.secondaryOrderTotal}/>
                        <Orderwindow items={this.state.secondaryOrderItems} onClick={this.onOrderRowClick}/>
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
            <Infowindow total={this.state.primaryOrderTotal}/>
            <Orderwindow items={this.state.primaryOrderItems} onClick={this.onOrderRowClick}/>
            <Cashwindow />
            </div>
            <ButtonColumn splitClick= {this.onSplitClick}/>
            <Itemwindow class= 'item-window' items={this.state.displayItems} onClick={this.onItemClick} onLongClick={this.onLongClick}/>
      </div>
      )

  }
}

})

module.exports = Tyle