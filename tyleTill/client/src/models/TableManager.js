const React = require('react')

const TableManager = () => {}

TableManager.prototype ={

manageTable(tables, table, order){
  console.log("table",tables[table])
  console.log("order",Object.keys(order[0]))
  console.log(tables[table] == !Object.keys(order[0]))
  console.log(tables[table].length)

  if(!tables[table].length >0  && Object.keys(order[0]).length>0){
    console.log("assign order to table")
    tables[table] = order 
    return ["tables", tables]
  }
  if(tables[table].length >0  && !Object.keys(order[0]).length>0){
    console.log("assign table to order")
    order = tables[table]
    return ["order", order]
    }


    return false
}



}

module.exports = TableManager