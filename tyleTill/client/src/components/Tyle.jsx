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
const ButtonColumn =require('./sidebar/ButtonColumn')
const TableWindow =require('./TableWindow')
const OrderSelector =require('./OrderSelector')
const ReactCSSTransitionGroup=require('react-addons-css-transition-group') 
const MenuTray = require('./MenuTray')
const APIRunner = require('../models/APIRunner')
_=require('lodash')

const Tyle = React.createClass({

  getInitialState(){
    return {
      items: [], 
      categories: [],
      users:[],
      orders:[],
      tillTotal:[],
      time:'',
      date:'',
      tables:{one: [], two:[], three:[], four:[], five:[], six:[], seven:[], eight:[], nine:[], ten:[]},
      primaryDisplayItems:[],
      primarySubCategories:{},
      primaryOrderShow:'hidden',
      primaryLogin: true,
      primaryChange:'',
      primaryUser: "",
      primaryOrderItems:[{}],
      primaryOrderTotal:0.00,
      primaryInput:'',
      primaryCashDisplay: false,
      primaryTableShow:false,
      primarySubMenuShow: "hide-sub",
      secondaryUser: "",
      secondaryLogin: true,
      secondaryChange:'',
      secondaryOrderItems:[{}],
      secondaryDisplayItems:[],
      secondarySubCategories:{},
      secondaryOrderShow:'hidden',
      secondaryOrderTotal:0.00,
      secondaryInput:'',
      secondaryCashDisplay: false,
      secondaryTableShow:false,
      secondarySubMenuShow: "hide-sub",
      split: false

    }
  },

  componentWillMount(){
    console.log("attempting api call")
    let users= null
    const runner = new APIRunner

    runner.run("GET","http://localhost:5000/api/users").then(function(result){
      users= result
    })
    const APIpromise = runner.run("GET", "http://localhost:5000/api/divisions")
    APIpromise.then(function(result){
      // const itemManager = new ItemManager
      const categories = ItemManager.getTypes(result)
      this.clock()
      setInterval(this.clock,60000)
      const displayItems = ItemManager.prepareItems(result[0].types[0].subtypes[0].items)
      this.setState({users: users, categories: categories, items: result, primaryDisplayItems: displayItems, secondaryDisplayItems: displayItems})
    }.bind(this), function(err){
      console.log(err)
    })
  },

  clock(){    
      const newTime = new Date();
      const month = newTime.getUTCMonth()+1
      const day = newTime.getUTCDate()
      const hour = newTime.getHours()
      let minutes = newTime.getMinutes()
      if(minutes.toString().length === 1){ minutes = "0" + minutes.toString()}
      const displayTime = hour + ":" + minutes
      const displayDate = day+"/"+month
      this.setState({time: displayTime, date:displayDate})
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
    // const ordermanager = new OrderManager
    let newOrderArray = OrderManager.addItem(currentOrder, item, input, arrayRef)
    // const cashmanager = new CashManager
    const total = CashManager.total(newOrderArray)
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
    // const ordermanager = new OrderManager
    let newOrderArray = OrderManager.removeItem(currentOrder, key, input)
    // const cashmanager = new CashManager
    const total = CashManager.total(newOrderArray)
    if(markerID === 2){
      this.setState({secondaryOrderItems: newOrderArray, secondaryOrderTotal: total, secondaryInput: ''})
    }else{
      this.setState({primaryOrderItems: newOrderArray, primaryOrderTotal: total, primaryInput:''})
    }
  },

  menuOptionClick(selected, markerID){
      const runner = new APIRunner
      let url = "http://localhost:5000/api/types/find/"+selected
      console.log(url)
      const promise = runner.run("GET",url)
      promise.then(function(result){
        // const itemManager = new ItemManager
        const finalItems = ItemManager.getItems(result)
        if(markerID===2){
          this.setState({secondaryDisplayItems: finalItems})
        }else{
          this.setState({primaryDisplayItems: finalItems})
        }
      }.bind(this))
  },

  subMenuOptionClick(selected, markerID){
          let url = "http://localhost:5000/api/subtypes/find/"+selected

          const runner = new APIRunner
          const promise = runner.run("GET",url)
          promise.then(function(result){
            // const itemManager = new ItemManager
            const finalItems = ItemManager.getItems(result)
            if(markerID===2){
              this.setState({secondaryDisplayItems: finalItems, secondarySubMenuShow: "hide-sub"})
            }else{
              this.setState({primaryDisplayItems: finalItems, primarySubMenuShow: "hide-sub"})
            }
          }.bind(this))
  },

  getSubItems(selected, markerID){
      this.setState({primarySubMenuShow: "sub"})
      let url = "http://localhost:5000/api/types/find/"+ selected
      const apiRunner = new APIRunner
      // const itemManager = new ItemManager
      apiRunner.run("GET", url).then(function(result){
        console.log(result[0].subtypes)
        const subtypes = ItemManager.prepareSubtypes(result)

        if(markerID === 2){
        this.setState({secondarySubCategories: subtypes, secondarySubMenuShow: "sub"})
        }else{
        this.setState({primarySubCategories: subtypes, primarySubMenuShow: "sub"})
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
              secondaryLogin: true,
              secondaryOrderShow:'hidden'
            })
          }else{
            this.setState({split:false, secondaryLogin: true, secondaryOrderShow:'hidden'})
          }
        }
      },

      onOrderToggle(markerID){
          console.log("orderToggle")

        if(markerID === 2){
          if(this.state.secondaryOrderShow === 'hidden'){
          this.setState({secondaryOrderShow: 'order-selector'})
          }else{
          this.setState({secondaryOrderShow: 'hidden'})
          }
        }else{
          if(this.state.primaryOrderShow === 'hidden'){
          this.setState({primaryOrderShow: 'order-selector'})
          }else{
          this.setState({primaryOrderShow: 'hidden'})
          }
           
        }
      },

      orderSelect(order, markerID){
          console.log("Order Selected:", order)
          let currentOrder = this.state.primaryOrderItems
          if(markerID ===2){currentOrder =this.state.secondaryOrderItems}
          const archivedOrder = this.state.orders[order]

          if(!Object.keys(currentOrder[0]).length>0){
              if(markerID === 2){
                this.setState({secondaryOrderItems: archivedOrder.orderDetail, secondaryOrderShow: 'hidden'})
              }else{
                this.setState({primaryOrderItems: archivedOrder.orderDetail, primaryOrderShow: 'hidden'})
              } 
          }else{
              console.log("ITEMS IN ORDER, CANCELLED")
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
          // const cashManager = new CashManager
          // const orderManager = new OrderManager
          const newPayment = CashManager.checkPayAmount(selected, input, oldTotal)
          const newOrderArray = OrderManager.addPayment(items, newPayment)
          const total = CashManager.total(newOrderArray)
          if(total <= 0.00){
            this.cashOff(newOrderArray, markerID)
            return
          }
          if(markerID === 2){
            this.setState({secondaryOrderItems: newOrderArray, secondaryOrderTotal: total, secondaryInput:''})
          }else{
            this.setState({primaryOrderItems: newOrderArray, primaryOrderTotal: total, primaryInput:''})
          }
      },


      cashOff(newOrderArray, markerID){
          console.log("CASH OFF")
          let newOrders = this.state.orders
          let user = this.state.primaryUser
          if(markerID===2){user = this.state.secondaryUser}
          const entry = CashManager.getOrderInfo(newOrderArray,user)
          entry["id"]= newOrders.length
          newOrders.push(entry)
          console.log(newOrders)
          if(markerID=== 2){
              this.setState({secondaryCashDisplay: false, secondaryTableShow: false, secondaryOrderShow: 'hidden', secondaryOrderItems: [{}], secondaryOrderTotal: 0.00, secondaryInput:'', secondaryChange: entry.change, secondaryLogin:true})
          }else{
              this.setState({primaryCashDisplay: false, primaryTableShow: false, primaryOrderShow: 'hidden', primaryOrderItems:[{}], primaryOrderTotal: 0.00, primaryInput:'', primaryChange: entry.change, primaryLogin:true})
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
          // const tableManager = new TableManager
        const result = TableManager.manageTable(this.state.tables, table, order)
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
          this.setState({secondaryCashDisplay: false,secondaryTableShow: false, secondaryOrderShow:'hidden', secondaryUser: "", secondaryLogin:true, secondaryOrderItems:[{}], secondaryOrderTotal:0.00})
        }else{
          this.setState({primaryCashDisplay: false,primaryTableShow: false, primaryOrderShow:'hidden', primaryUser:"", primaryLogin:true, primaryOrderItems:[{}], primaryOrderTotal:0.00})
        }
      },

      render(){
        if(this.state.split){
          return(
            <div className='tyle-container'>
            <div className="primary">
            <Login onLogin={this.onLogin} display={this.state.primaryLogin} markerID={1} users={this.state.users} change={this.state.primaryChange}/>
            <OrderSelector orders={this.state.orders} class={this.state.primaryOrderShow} onClick={this.orderSelect}markerID={1}/>
            <TableWindow markerID={1} display={this.state.primaryTableShow} tables={this.state.tables} onClick={this.tableClick} />
                  <div id='sidebar'>
                        <Infowindow 
                              time={this.state.time}
                              date={this.state.date} 
                              input={this.state.primaryInput} 
                              total={this.state.primaryOrderTotal} 
                              user={this.state.primaryUser}
                              change={this.state.primaryChange}
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
                        orderToggle= {this.onOrderToggle}
                        cashClick={this.onPayClick}
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
                        subCategories={this.state.primarySubCategories} 
                        show={this.state.primarySubMenuShow}
                        onClick={this.subMenuOptionClick} 
                        markerID={1}
                    />
                    <MenuTray 
                        categories={this.state.categories} 
                        onClick={this.menuOptionClick}
                        onLongClick={this.getSubItems}
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
            <Login onLogin={this.onLogin} display={this.state.secondaryLogin} markerID={2} users={this.state.users} change={this.state.secondaryChange}/>
            <OrderSelector orders={this.state.orders} class={this.state.secondaryOrderShow} onClick={this.orderSelect}markerID={2}/>
            <TableWindow markerID={2} display={this.state.secondaryTableShow} tables={this.state.tables} onClick={this.tableClick} />
            <div id='sidebar'>
                <Infowindow 
                    time={this.state.time}
                    date={this.state.date} 
                    input={this.state.secondaryInput} 
                    total={this.state.secondaryOrderTotal} 
                    user={this.state.secondaryUser}
                    change={this.state.secondaryChange}

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
                orderToggle= {this.onOrderToggle}
                cashClick={this.onPayClick}
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
             subCategories={this.state.secondarySubCategories} 
             show={this.state.secondarySubMenuShow}
             onClick={this.subMenuOptionClick} 
             markerID={2}
         />
         <MenuTray 
             categories={this.state.categories} 
             onClick={this.menuOptionClick} 
             onLongClick={this.getSubItems}
             markerID={2}
         />
           </ReactCSSTransitionGroup>
            </div>
                   
            </div>
            )
        }else{

          return(
            <div className='tyle-container'>
            <Login onLogin={this.onLogin} display={this.state.primaryLogin} markerID={1} users={this.state.users} change={this.state.primaryChange}/>
            <OrderSelector orders={this.state.orders} class={this.state.primaryOrderShow} onClick={this.orderSelect}markerID={1}/>
            <TableWindow markerID={1} display={this.state.primaryTableShow} tables={this.state.tables} onClick={this.tableClick}/>
            <div id='sidebar'>
                <Infowindow
                    time={this.state.time}
                    date={this.state.date} 
                    input={this.state.primaryInput} 
                    total={this.state.primaryOrderTotal} 
                    user={this.state.primaryUser}
                    change={this.state.primaryChange}
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
                orderToggle= {this.onOrderToggle}
                cashClick={this.onPayClick}
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
                subCategories={this.state.primarySubCategories} 
                show={this.state.primarySubMenuShow}
                onClick={this.subMenuOptionClick} 
                markerID={1}
            />
            <MenuTray 
                categories={this.state.categories} 
                onClick={this.menuOptionClick}
                onLongClick={this.getSubItems}
                markerID={1}
            />
            </div>
            )

        }
      }

    })

module.exports = Tyle