_ = require('lodash')

const OrderManager = ()=> {}

OrderManager.prototype = {

  addItem(orderItems, newItem, input){
      let itemsObject = orderItems[0]
      const ref = newItem.name+"("+newItem.sizes[0] +")"
      const price = newItem.prices[0] 
      let qty = parseInt(input) || 1
      if(itemsObject[ref]){ qty = itemsObject[ref].qty + (parseInt(input) || 1) } 
      const total = parseFloat(price * qty)
      itemsObject[ref] = {id: newItem.id, name: ref, qty: qty, total: total}
      const returnArray= [itemsObject]
      return returnArray
      },

    removeItem(orderItems, key, input){
        let itemsObject = orderItems[0]
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
    }
}


module.exports =OrderManager