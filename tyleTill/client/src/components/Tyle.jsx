const React = require('react')
const Orderwindow = require('./sidebar/Orderwindow')
const Itemwindow = require('./Itemwindow')
const Login = require('./Login')
const Infowindow = require('./sidebar/Infowindow')
const Cashwindow = require('./sidebar/Cashwindow')
const CashManager = require('../models/CashManager')
const OrderManager = require('../models/OrderManager')
const TableManager = require('../models/TableManager')
const ItemManager = require('../models/ItemManager')
const ButtonColumn =require('./ButtonColumn')
const TableWindow =require('./TableWindow')
const ReactCSSTransitionGroup=require('react-addons-css-transition-group') 
const MenuTray = require('./MenuTray')
const APIRunner = require('../models/APIRunner')
_=require('lodash')

const Tyle = React.createClass({

  getInitialState(){
    return {
      items: [], 
      categories: {},
      users:[],
      tables:{one: [], two:[], three:[], four:[], five:[], six:[], seven:[], eight:[], nine:[], ten:[]},
      primaryDisplayItems:[],
      primaryLogin: true,
      primaryUser: "",
      primaryOrderItems:[{}],
      primaryOrderTotal:0.00,
      primaryInput:'',
      primaryCashDisplay: false,
      primaryTableShow:false,
      secondaryUser: "",
      secondaryLogin: true,
      secondaryOrderItems:[{}],
      secondaryDisplayItems:[],
      secondaryOrderTotal:0.00,
      secondaryInput:'',
      secondaryCashDisplay: false,
      secondaryTableShow:false,
      split: false

    }
  },

  componentDidMount(){
    console.log("attempting api call")
    let users= null
    const runner = new APIRunner

    runner.run("GET","http://localhost:5000/api/users").then(function(result){
      users= result
    })
    const APIpromise = runner.run("GET", "http://localhost:5000/api/divisions")

    APIpromise.then(function(result){
      const itemManager = new ItemManager
      const categories = itemManager.getCategories(result)
      console.log(categories)
      console.log(result)
      const displayItems = itemManager.prepareItems(result[0].types[0].subtypes[0].items)
      this.setState({users: users, categories: categories, items: result, primaryDisplayItems: displayItems, secondaryDisplayItems: displayItems})
    }.bind(this), function(err){
      console.log(err)
    })
  },

  onItemClick(event, markerID, arrayRef){
    let currentOrder = this.state.primaryOrderItems
    let input = this.state.primaryInput
    if(markerID === 2){
      currentOrder = this.state.secondaryOrderItems
      input = this.state.secondaryInput
    }
    let item = this.state.primaryDisplayItems[event.target.value]
    if(markerID === 2){item = this.state.secondaryDisplayItems[event.target.value]}
    const ordermanager = new OrderManager
    let newOrderArray = ordermanager.addItem(currentOrder, item, input, arrayRef)
    const cashmanager = new CashManager
    const total = cashmanager.total(newOrderArray)
    if(markerID === 2){
      this.setState({secondaryOrderItems: newOrderArray, secondaryOrderTotal: total, secondaryInput:''})
    }else{
      this.setState({primaryOrderItems: newOrderArray, primaryOrderTotal: total, primaryInput:''})
    }
  },

  onOrderRowClick(key, markerID){
    let items = null
    let currentOrder = this.state.primaryOrderItems
    let input = this.state.primaryInput
    if(markerID === 2){
      currentOrder = this.state.secondaryOrderItems
      input = this.state.secondaryInput
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
      const runner = new APIRunner
      let url = "http://localhost:5000/api/"
      if(_.includes(this.state.categories["divisions"], selected)){url += "divisions/find/"+selected}
      if(_.includes(this.state.categories["types"], selected)){url += "types/find/"+selected}
      if(_.includes(this.state.categories["subtypes"], selected)){url += "subtypes/find/"+selected}
      const promise = runner.run("GET",url)
      promise.then(function(result){
        const itemManager = new ItemManager
        const finalItems = itemManager.getItems(result)
        if(markerID===2){
          this.setState({secondaryDisplayItems: finalItems})
        }else{
          this.setState({primaryDisplayItems: finalItems})
        }
      }.bind(this))
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
              secondaryUser: '',
              secondaryCashDisplay: false,
              secondaryLogin: true
            })
          }else{
            this.setState({split:false, secondaryLogin: true})
          }
        }
      },

      onPayClick(selected, markerID){
          let input = this.state.primaryInput
          let oldTotal = this.state.primaryOrderTotal
          let items = this.state.primaryOrderItems
          if(markerID ===2){
            input = this.state.secondaryInput
            oldTotal = this.state.secondaryOrderTotal
            items = this.state.secondaryOrderItems
          }
          const cashManager = new CashManager
          const orderManager = new OrderManager
          const newPayment = cashManager.checkPayAmount(selected, input, oldTotal)
          const newOrderArray = orderManager.addPayment(items, newPayment)
          const total = cashManager.total(newOrderArray)
          if(markerID === 2){
            this.setState({secondaryOrderItems: newOrderArray, secondaryOrderTotal: total, secondaryInput:''})
          }else{
            this.setState({primaryOrderItems: newOrderArray, primaryOrderTotal: total, primaryInput:''})
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

      onTableToggle(markerID){
        if(markerID===2){
            if(this.state.secondaryTableShow){
                this.setState({secondaryTableShow:false})
            }else{
                this.setState({secondaryTableShow:true}) 
            } 
        }else{
          if(this.state.primaryTableShow){
              this.setState({primaryTableShow:false})
          }else{
              this.setState({primaryTableShow:true}) 
          } 
        }
      },

      tableClick(table, markerID){
        let order = this.state.primaryOrderItems  
        if(markerID===2){order = this.state.secondaryOrderItems }
        const tableManager = new TableManager
        const result = tableManager.manageTable(this.state.tables, table, order)
        if(!result){
            console.log("CANNOT DO THIS!")
        }else if(result[0] === "tables"){
          if(markerID === 2){
            this.setState({secondaryOrderItems: [{}],secondaryOrderTotal:0.00,tables: result[1]})
          }else{
            this.setState({primaryOrderItems: [{}], primaryOrderTotal:0.00 ,tables: result[1]})
          }
        }else{
          if(markerID === 2){
                this.setState({secondaryOrderItems: result[1], tables:result[2]})
          }else{
                this.setState({primaryOrderItems: result[1], tables:result[2]})
          }
        }

      },

      onLogin(user, markerID){
          if(markerID === 2){
              this.setState({secondaryUser: user.name, secondaryLogin: false})
          }else{
              this.setState({primaryUser: user.name, primaryLogin: false})
          }
      },

      logout(markerID){
        if(markerID === 2){
          this.setState({secondaryUser: "", secondaryLogin:true, secondaryOrderItems:[{}], secondaryOrderTotal:0.00})
        }else{
          this.setState({primaryUser:"", primaryLogin:true, primaryOrderItems:[{}], primaryOrderTotal:0.00})
        }

      },

      render(){
        if(this.state.split){
          return(
            <div className='tyle-container'>
            <div className="primary">
            <Login onLogin={this.onLogin} display={this.state.primaryLogin} markerID={1} users={this.state.users}/>
            <TableWindow markerID={1} display={this.state.primaryTableShow} tables={this.state.tables} onClick={this.tableClick} />
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
                        tableToggle={this.onTableToggle}
                        splitClick= {this.onSplitClick}                    
                        payToggle={this.onPayToggle} 
                        logout={this.logout}
                  />
                  <Itemwindow 
                        markerID={1} 
                        class='item-window-split' 
                        onPayClick={this.onPayClick}
                        cashDisplay={this.state.primaryCashDisplay}
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
            <ReactCSSTransitionGroup
                     transitionName="background"
                     transitionAppear={true} 
                      transitionAppearTimeout={500}
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                   >
            <Login onLogin={this.onLogin} display={this.state.secondaryLogin} markerID={2} users={this.state.users}/>
            <TableWindow markerID={2} display={this.state.secondaryTableShow} tables={this.state.tables} onClick={this.tableClick} />
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
                tableToggle={this.onTableToggle}
                splitClick= {this.onSplitClick}
                payToggle={this.onPayToggle} 
                logout={this.logout}
            />
            <Itemwindow 
                markerID={2} 
                onPayClick={this.onPayClick}
                cashDisplay={this.state.secondaryCashDisplay}
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
           </ReactCSSTransitionGroup>
            </div>
                   

            </div>
            )
        }else{

          return(
            <div className='tyle-container'>
            <Login onLogin={this.onLogin} display={this.state.primaryLogin} markerID={1} users={this.state.users}/>
            <TableWindow markerID={1} display={this.state.primaryTableShow} tables={this.state.tables} onClick={this.tableClick}/>
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
                tableToggle={this.onTableToggle}
                splitClick= {this.onSplitClick}
                payToggle={this.onPayToggle}
                logout={this.logout}
            />
            <Itemwindow 
                markerID={1} 
                onPayClick={this.onPayClick}
                cashDisplay={this.state.primaryCashDisplay}
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