_ = require('lodash')


const CashManager = ()=> {}


// CashManager.prototype = {

CashManager.total=function(order, index){
    let total = 0.00
    for(let key in order[0]){
        total += order[0][key].total
    }
    return total
},

CashManager.getOrderInfo=function(order, user){
      let total = 0.00
      let payments = 0.00
      let items = 0
      for(let item in order[0]){
        if( order[0][item].total <=0){
            payments += parseFloat(order[0][item].total)
        }else{
            total += parseFloat(order[0][item].total)
            items += parseInt(order[0][item].qty)
        }
      }
      let change= total + payments 
      payments = payments * -1
      change = change * -1
      const time = new Date()
      return {user:user, time: time, total: total, payments: payments, items: items, change: change, orderDetail:order}
},

CashManager.checkPayAmount=function(selected, input, total){
    let category = null
    let amount = null
    let value = null
    let qty = null
    switch(selected){
        case "mobile":
        case "card":
        case "discount":
        case "cash":
            category = selected
            break
        default:
            category= "cash(" + selected + ")"
            value = parseInt(selected)
            qty = input
            console.log("value", value)
            break
    }
    
    if(input){
        amount = input * (value || 1)
    }else if(value){
        console.log("value present", value)
        amount = value
    }else{
        console.log("amountisTotal", total)
        amount = total
    }

    return {id: Date.now(), name: category, qty: qty || 1, total: -amount}
    }
// }



module.exports =CashManager