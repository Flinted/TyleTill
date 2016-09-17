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
}


}


module.exports =CashManager