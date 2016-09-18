_ = require('lodash')


const CashManager = ()=> {}


CashManager.prototype = {

total(order, index){
    let total = 0.00
    for(let key in order[0]){
        total += order[0][key].total
    }
    console.log(total)
    return total
},

checkPayAmount(selected, input, total){
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
      console.log("input", input)
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
}



module.exports =CashManager