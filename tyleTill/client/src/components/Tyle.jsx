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
      tables:{one: [], two:[], three:[], four:[], five:[], six:[], seven:[], eight:[], nine:[], ten:[], eleven:[], twelve:[], thirteen:[], fourteen:[], fifteen:[]},
      displayItems:[[],[]],
      subCategories:[{},{}],
      orderShow:['hidden','hidden'],
      login: [true,true],
      change:['',''],
      user: ['',''],
      orderItems:[[{}],[{}]],
      orderTotal:[0.00,0.00],
      input:['',''],
      cashDisplay: [false, false],
      tableShow: [false, false],
      subMenuShow:['hide-sub', 'hide-sub'],
      split: false
    }
  },

  componentWillMount(){
    console.log("attempting api call")
    let users= null
    this.clock()
    const runner = new APIRunner

    runner.run("GET","http://localhost:5000/api/users").then(function(result){
      users= result
    })
    const APIpromise = runner.run("GET", "http://localhost:5000/api/divisions")
    APIpromise.then(function(result){
      let state = this.state
      const categories = ItemManager.getTypes(result)
      setInterval(this.clock,60000)
      const displayItems = ItemManager.prepareItems(result[0].types[0].subtypes[0].items)
      state.users = users
      state.categories = categories
      state.items = result
      state.displayItems[0] = displayItems
      state.displayItems[1] = displayItems
      this.setState(state)
    }.bind(this), function(err){
      console.log(err)
    })
  },

  clock(){    
    console.log("clock")
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
    let state = this.state
    let currentOrder = this.state.orderItems[markerID]
    let input = this.state.input[markerID]
    let item = this.state.displayItems[markerID][event.target.value]
    let newOrderArray = OrderManager.addItem(currentOrder, item, input, arrayRef)
    const total = CashManager.total(newOrderArray)
    state.orderItems[markerID] = newOrderArray
    state.orderTotal[markerID] = total
    state.input[markerID]= ''

    this.setState(state)
  },

  onOrderRowClick(key, markerID){
    let state = this.state
    let items = null
    let currentOrder = this.state.orderItems[markerID]
    let input = this.state.input[markerID]
    let newOrderArray = OrderManager.removeItem(currentOrder, key, input)
    const total = CashManager.total(newOrderArray)
    state.orderItems[markerID] = newOrderArray
    state.orderTotal[markerID] = total
    state.input[markerID] = ''
    this.setState(state)
  },

  menuOptionClick(selected, markerID){
    const runner = new APIRunner
    let url = "http://localhost:5000/api/types/find/"+selected
    console.log(url)
    const promise = runner.run("GET",url)
    promise.then(function(result){
      let state = this.state
      const finalItems = ItemManager.getItems(result)
      state.displayItems[markerID] = finalItems
      this.setState(state)
    }.bind(this))
  },

  subMenuOptionClick(selected, markerID){
    let url = "http://localhost:5000/api/subtypes/find/"+selected
    const runner = new APIRunner
    const promise = runner.run("GET",url)
    promise.then(function(result){
      let state = this.state
      const finalItems = ItemManager.getItems(result)
      state.displayItems[markerID] = finalItems
      state.subMenuShow[markerID] = 'hide-sub'
      this.setState(state)
    }.bind(this))
  },

  getSubItems(selected, markerID){
    let state = this.state
    let url = "http://localhost:5000/api/types/find/"+ selected
    const apiRunner = new APIRunner
    apiRunner.run("GET", url).then(function(result){
      const subtypes = ItemManager.prepareSubtypes(result)
      state.subCategories[markerID] = subtypes
      state.subMenuShow[markerID] = 'sub'
      this.setState(state)
    }.bind(this))
  },

  cashButtonClick(input, markerID){
    let state = this.state
    let newInput = this.state.input[markerID]
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
    state.input[markerID] = newInput
    this.setState(state)
  },

  onSplitClick( markerID){
    let state = this.state
    if(!this.state.split){
      this.setState({split: true})
    }else{
      if(markerID=== 1){
        state.split= false
        state.orderItems[0] = state.orderItems[1]
        state.orderTotal[0] = state.orderTotal[1]
        state.user[0]= this.state.user[1]
        state.cashDisplay[0] = state.cashDisplay[1]
        state.displayItems[0] = state.displayItems[1]
        state.orderItems[1] =[{}]
        state.orderTotal[1] = 0
        state.user[1] = ''
        state.cashDisplay[1] = false
        state.login[1] = true
        state.login[0] = false
        state.orderShow[1] = 'hidden'
      }else{
        state.split =false
        state.login[1]=true
        state.orderShow[1]='hidden'
        state.orderItems[1] =[{}]
        state.orderTotal[1] = 0
        state.user[1] = ''
      }
      this.setState(state)
    }
  },

  onOrderToggle(markerID){
    let state = this.state
    console.log("orderToggle")
    if(this.state.orderShow[markerID] === 'hidden'){
      state.orderShow[markerID] = 'order-selector'
      state.tableShow[markerID] = false
    }else{
      state.orderShow[markerID] = 'hidden'
    }
    this.setState(state)
  },

  orderSelect(order, markerID){
    let state = this.state
    let currentOrder = this.state.orderItems[markerID]
    const archivedOrder = this.state.orders[order]
    if(!Object.keys(currentOrder[0]).length>0){
      state.orderItems[markerID]=archivedOrder.orderDetail
      state.orderShow[markerID]='hidden'
      this.setState(state)
    }else{
      console.log("ITEMS IN ORDER, CANCELLED")
    }
  },

  onPayClick(selected, markerID){
    let state = this.state
    const input = this.state.input[markerID]
    const oldTotal = this.state.orderTotal[markerID]
    const items = this.state.orderItems[markerID]
    const newPayment = CashManager.checkPayAmount(selected, input, oldTotal)
    const newOrderArray = OrderManager.addPayment(items, newPayment)
    const total = CashManager.total(newOrderArray)
    if(total <= 0.00){
      this.cashOff(newOrderArray, markerID)
      return
    }
    state.orderItems[markerID] = newOrderArray
    state.orderTotal[markerID] = total
    state.input[markerID]= ''
    this.setState(state)
  },


  cashOff(newOrderArray, markerID){
    let state = this.state
    console.log("CASH OFF")
    let newOrders = this.state.orders
    let user = this.state.user[markerID]
    const entry = CashManager.getOrderInfo(newOrderArray,user)
    entry["id"]= newOrders.length
    newOrders.push(entry)
    state.orders = newOrders
    state.cashDisplay[markerID] = false
    state.tableShow[markerID] = false
    state.orderShow[markerID] = 'hidden'
    state.orderItems[markerID] = [{}]
    state.orderTotal[markerID] = 0.00
    state.input[markerID] = ''
    state.change[markerID] = entry.change
    state.login[markerID] = true
    this.setState(state) 
  },  


  onPayToggle(markerID){
    let state = this.state
    if(this.state.cashDisplay[markerID]){
      state.cashDisplay[markerID] = false
    }else{
      state.cashDisplay[markerID] = true
    }
    this.setState(state)
  },

  onTableToggle(markerID){
    let state = this.state
    if(this.state.tableShow[markerID]){
      state.tableShow[markerID] = false
    }else{
      state.tableShow[markerID] = true
      state.orderShow[markerID] = 'hidden'

    } 
    this.setState(state)
  },

  tableClick(table, markerID){
    let state = this.state
    let order = this.state.orderItems[markerID]  
    const result = TableManager.manageTable(this.state.tables, table, order)
    if(!result){
      console.log("CANNOT DO THIS!")
    }else if(result[0] === "tables"){
      state.orderItems[markerID] = [{}]
      state.orderTotal[markerID] = 0.00
      state.tables = result[1]
    }else{
      state.orderItems[markerID] = result[1]
      state.tables= result[2]
    }
    this.setState(state)
  },

  onLogin(user, markerID){
    let state = this.state
    state.user[markerID]=user.name
    state.login[markerID]=false
    this.setState(state)
  },

  logout(markerID){
    let state = this.state
    state.cashDisplay[markerID] = false
    state.tableShow[markerID] = false
    state.orderShow[markerID] = 'hidden'
    state.user[markerID] = ''
    state.login[markerID] = true
    state.orderItems[markerID] = [{}]
    state.orderTotal[markerID] = 0.00
    this.setState(state)
  },

      render(){
        if(this.state.split){
          return(
            <div className='tyle-container'>
            <div className="primary">
            <Login onLogin={this.onLogin} display={this.state.login[0]} markerID={0} users={this.state.users} change={this.state.change[0]}/>
            <OrderSelector orders={this.state.orders} class={this.state.orderShow[0]} onClick={this.orderSelect}markerID={0}/>
            <TableWindow markerID={0} display={this.state.tableShow[0]} tables={this.state.tables} onClick={this.tableClick} />
                  <div id='sidebar'>
                        <Infowindow 
                              time={this.state.time}
                              date={this.state.date} 
                              input={this.state.input[0]} 
                              total={this.state.orderTotal[0]} 
                              user={this.state.user[0]}
                              change={this.state.change[0]}
                        />
                        <Orderwindow 
                              markerID={0} 
                              items={this.state.orderItems[0]} 
                              onClick={this.onOrderRowClick}
                        />
                        <Cashwindow 
                              markerID={0} 
                              onClick={this.cashButtonClick} 
                        />
                  </div>
                  <ButtonColumn 
                        markerID={0}
                        tableToggle={this.onTableToggle}
                        orderToggle= {this.onOrderToggle}
                        cashClick={this.onPayClick}
                        splitClick= {this.onSplitClick}                    
                        payToggle={this.onPayToggle} 
                        logout={this.logout}
                  />
                  <Itemwindow 
                        markerID={0} 
                        class='item-window-split' 
                        onPayClick={this.onPayClick}
                        cashDisplay={this.state.cashDisplay[0]}
                        items={this.state.displayItems[0]} 
                        onClick={this.onItemClick} 
                        onLongClick={this.onLongClick}
                    />
                    <MenuTray 
                        subCategories={this.state.subCategories[0]} 
                        show={this.state.subMenuShow[0]}
                        onClick={this.subMenuOptionClick} 
                        markerID={0}
                    />
                    <MenuTray 
                        categories={this.state.categories} 
                        onClick={this.menuOptionClick}
                        onLongClick={this.getSubItems}
                        markerID={0}
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
            <Login onLogin={this.onLogin} display={this.state.login[1]} markerID={1} users={this.state.users} change={this.state.change[1]}/>
            <OrderSelector orders={this.state.orders} class={this.state.orderShow[1]} onClick={this.orderSelect}markerID={1}/>
            <TableWindow markerID={1} display={this.state.tableShow[1]} tables={this.state.tables} onClick={this.tableClick} />
                  <div id='sidebar'>
                        <Infowindow 
                              time={this.state.time}
                              date={this.state.date} 
                              input={this.state.input[1]} 
                              total={this.state.orderTotal[1]} 
                              user={this.state.user[1]}
                              change={this.state.change[1]}
                        />
                        <Orderwindow 
                              markerID={1} 
                              items={this.state.orderItems[1]} 
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
                        cashDisplay={this.state.cashDisplay[1]}
                        items={this.state.displayItems[1]} 
                        onClick={this.onItemClick} 
                        onLongClick={this.onLongClick}
                    />
                    <MenuTray 
                        subCategories={this.state.subCategories[1]} 
                        show={this.state.subMenuShow[1]}
                        onClick={this.subMenuOptionClick} 
                        markerID={1}
                    />
                    <MenuTray 
                        categories={this.state.categories} 
                        onClick={this.menuOptionClick}
                        onLongClick={this.getSubItems}
                        markerID={1}
                    />
           </ReactCSSTransitionGroup>
            </div>
                   
            </div>
            )
        }else{

          return(
            <div className='tyle-container'>
           <Login onLogin={this.onLogin} display={this.state.login[0]} markerID={0} users={this.state.users} change={this.state.change[0]}/>
           <OrderSelector orders={this.state.orders} class={this.state.orderShow[0]} onClick={this.orderSelect}markerID={0}/>
           <TableWindow markerID={0} display={this.state.tableShow[0]} tables={this.state.tables} onClick={this.tableClick} />
                 <div id='sidebar'>
                       <Infowindow 
                             time={this.state.time}
                             date={this.state.date} 
                             input={this.state.input[0]} 
                             total={this.state.orderTotal[0]} 
                             user={this.state.user[0]}
                             change={this.state.change[0]}
                       />
                       <Orderwindow 
                             markerID={0} 
                             items={this.state.orderItems[0]} 
                             onClick={this.onOrderRowClick}
                       />
                       <Cashwindow 
                             markerID={0} 
                             onClick={this.cashButtonClick} 
                       />
                 </div>
                 <ButtonColumn 
                       markerID={0}
                       tableToggle={this.onTableToggle}
                       orderToggle= {this.onOrderToggle}
                       cashClick={this.onPayClick}
                       splitClick= {this.onSplitClick}                    
                       payToggle={this.onPayToggle} 
                       logout={this.logout}
                 />
                 <Itemwindow 
                       markerID={0} 
                       class='item-window' 
                       onPayClick={this.onPayClick}
                       cashDisplay={this.state.cashDisplay[0]}
                       items={this.state.displayItems[0]} 
                       onClick={this.onItemClick} 
                       onLongClick={this.onLongClick}
                   />
                   <MenuTray 
                       subCategories={this.state.subCategories[0]} 
                       show={this.state.subMenuShow[0]}
                       onClick={this.subMenuOptionClick} 
                       markerID={0}
                   />
                   <MenuTray 
                       categories={this.state.categories} 
                       onClick={this.menuOptionClick}
                       onLongClick={this.getSubItems}
                       markerID={0}
                   />            </div>
            )

        }
      }

    })

module.exports = Tyle