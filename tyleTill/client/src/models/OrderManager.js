_ = require('lodash')

const OrderManager = ()=> {}

  OrderManager.addItem= function(orderItems, newItem, input, arrayRef){
      let itemsObject = orderItems[0]
      const sizeRef = parseInt(arrayRef) || 0
      const ref = newItem.name+"("+newItem.sizes[sizeRef] +")"
      const price = newItem.prices[sizeRef] 
      let qty = parseInt(input) || 1
      if(itemsObject[ref]){ qty = itemsObject[ref].qty + (parseInt(input) || 1) } 
      const total = parseFloat(price * qty)
      itemsObject[ref] = {id: newItem.id, name: ref, qty: qty, total: total}
      const returnArray= [itemsObject]
      return returnArray
      },

    OrderManager.removeItem= function(orderItems, key, input){
        let itemsObject = orderItems[0]
        console.log(input)
        const currentTotal = parseFloat(itemsObject[key].total)
        let origQty = itemsObject[key].qty
        const price = currentTotal/origQty
        const qty = origQty - (parseInt(input) || 1) 
        const id = itemsObject[key].id
        if(qty<1){
          delete itemsObject[key] 
          const returnArray= [itemsObject]
          return returnArray
        }
        const total = parseFloat(price * qty)
        itemsObject[key] = {id: id, name: key, qty: qty, total: total}
        const returnArray= [itemsObject]
        return returnArray
    },

    OrderManager.addPayment= function(orderItems, payment){
        let itemsObject = orderItems[0]
        const ref = payment.name
        let oldTotal = 0
        let qty = parseInt(payment.qty)
        if(itemsObject[ref]){ 
          qty = parseInt(itemsObject[ref].qty) + parseInt(payment.qty)
          oldTotal=  itemsObject[ref].total
        } 
        const total = parseFloat(payment.total + oldTotal)
        itemsObject[ref] = {id: payment.id, name: ref, qty: qty, total: total}
        const returnArray= [itemsObject]
        return returnArray
    }


module.exports =OrderManager