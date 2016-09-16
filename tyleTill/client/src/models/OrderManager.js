_ = require('lodash')

const OrderManager = ()=> {}

OrderManager.prototype = {

  addItem(orderItems, newItem){
      let itemsObject = orderItems[0]
      const ref = newItem.name+"("+newItem.sizes[0] +")"
      const price = newItem.prices[0] 
      let qty = 1
      if(itemsObject[ref]){ qty = itemsObject[ref].qty+ 1 }
      const total = (price * qty)
      itemsObject[ref] = {id: newItem.id, name: ref, qty: qty, total: total}
      const returnArray= [itemsObject]
      return returnArray
      },

    removeItem(orderItems, key){
        let itemsObject = orderItems[0]
        const price = itemsObject[key].price
        let qty = itemsObject[key].qty - 1
        let id = itemsObject[key].id
        if(qty<1){
          delete itemsObject[key] 
          const returnArray= [itemsObject]
          return returnArray
        }
        const total = (price * qty)
        itemsObject[key] = {id: id, name: key, qty: qty, total: total}
        const returnArray= [itemsObject]
        return returnArray
    }
}


module.exports =OrderManager