const React = require('react')
const Orderwindow = require('./sidebar/Orderwindow')
const Itemwindow = require('./Itemwindow')
const Infowindow = require('./sidebar/Infowindow')
const Cashwindow = require('./sidebar/Cashwindow')
const CashManager = require('../models/CashManager')
const OrderManager = require('../models/OrderManager')
const ButtonColumn =require('./ButtonColumn')
const MenuTray = require('./MenuTray')
const APIRunner = require('../models/APIRunner')
_=require('lodash')

const Tyle = React.createClass({

  getInitialState(){
    return {
      items: [], 
      categories: {},
      primaryDisplayItems:[],
      primaryUser: "Chris",
      primaryOrderItems:[{}],
      primaryOrderTotal:0.00,
      primaryInput:'',
      primaryCashDisplay: false,
      secondaryUser: "Renwick",
      secondaryOrderItems:[{}],
      secondaryDisplayItems:[],
      secondaryOrderTotal:0.00,
      secondaryInput:'',
      secondaryCashDisplay: false,
      split: false

    }
  },

  componentDidMount(){
    console.log("attempting api call")
    const runner = new APIRunner
    const APIpromise = runner.run("GET", "http://localhost:5000/api/divisions")

    APIpromise.then(function(result){
      console.log(result)
      const displayItems = this.prepareItems(result[0].types[0].subtypes[1].items)
      this.setState({items: result, primaryDisplayItems: displayItems, secondaryDisplayItems: displayItems})
      this.getCategories()
    }.bind(this), function(err){
      console.log(err)
    })
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

  getCategories(){
      let divisions = []
      let types =[]
      let subtypes =[]
      const items = this.state.items
      for(let a in items){
            divisions.push(items[a].name)
            for(let b in items[a].types){
                types.push(items[a].types[b].name)
                for(let c in items[a].types[b].subtypes){
                    subtypes.push(items[a].types[b].subtypes[c].name)
                  }
            }
      }

      const categories= {divisions: divisions, types: types, subtypes: subtypes}
      console.log("divisions", categories)
      this.setState({categories: categories})
      
  },


  onItemClick(event, markerID){
    let currentOrder = this.state.primaryOrderItems
    let input = this.state.primaryInput
    if(markerID === 2){
      currentOrder = this.state.secondaryOrderItems
      input = this.state.secondaryInput
    }
    let item = this.state.primaryDisplayItems[event.target.value]
    if(markerID === 2){item = this.state.secondaryDisplayItems[event.target.value]}
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

  menuOptionClick(selected, markerID){
      console.log(selected)
      const runner = new APIRunner
      let url = "http://localhost:5000/api/"
      if(_.includes(this.state.categories["divisions"], selected)){url += "divisions/find/"+selected}
      if(_.includes(this.state.categories["types"], selected)){url += "types/find/"+selected}
      if(_.includes(this.state.categories["subtypes"], selected)){url += "subtypes/find/"+selected}
        console.log(url)
      const promise = runner.run("GET",url)
      promise.then(function(result){
        console.log(result)

        // ASSIGN NEW OBJECTS HERE
      })
  },

  cashButtonClick(input, markerID){
            let newInput = this.state.primaryInput
            if(markerID===2){newInput = this.state.secondaryInput}
    switch(input){
        case '.':
            newInput+= "."
            break;
        case 'C':
            newInput=''
            break;
        default:
            if(newInput.length < 3 || newInput.indexOf(".") > -1 ){
                    newInput += input
            }
          }
          if(markerID===2){
              this.setState({secondaryInput:newInput})
          }else{
              this.setState({primaryInput:newInput})
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
              primaryDisplayItems: this.state.secondaryDisplayItems,
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

      onPayToggle(markerID){
          if(markerID === 2){
              if(this.state.secondaryCashDisplay){
                  this.setState({secondaryCashDisplay:false})
              }else{
                  this.setState({secondaryCashDisplay:true})            
              }
          }else{
              if(this.state.primaryCashDisplay){
                  this.setState({primaryCashDisplay:false})
              }else{
                  this.setState({primaryCashDisplay:true})            
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
                        markerID={1}
                        payToggle={this.onPayToggle} 
                  />
                  <Itemwindow 
                        markerID={1} 
                        class='item-window-split' 
                        cashDisplay={this.state.primaryCashDisplay}
                        splitClick= {this.onSplitClick}
                        items={this.state.primaryDisplayItems} 
                        onClick={this.onItemClick} 
                        onLongClick={this.onLongClick}
                    />
                    <MenuTray 
                        categories={this.state.categories} 
                        onClick={this.menuOptionClick} 
                        markerID={1}
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
                markerID={2}
                payToggle={this.onPayToggle} 
            />
            <Itemwindow 
                markerID={2} 
                cashDisplay={this.state.secondaryCashDisplay}
                splitClick= {this.onSplitClick}
                class='item-window-split' 
                items={this.state.secondaryDisplayItems} 
                onClick={this.onItemClick} 
                onLongClick={this.onLongClick}
            />
           <MenuTray 
              categories={this.state.categories} 
              onClick={this.menuOptionClick} 
              markerID={2}
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
                markerID={1}
                payToggle={this.onPayToggle} 
            />
            <Itemwindow 
                markerID={1} 
                cashDisplay={this.state.primaryCashDisplay}
                splitClick= {this.onSplitClick}
                class= 'item-window' 
                items={this.state.primaryDisplayItems} 
                onClick={this.onItemClick} 
                onLongClick={this.onLongClick}
            />
            <MenuTray 
                categories={this.state.categories} 
                onClick={this.menuOptionClick} 
                markerID={1}
            />
            </div>
            )

        }
      }

    })

module.exports = Tyle