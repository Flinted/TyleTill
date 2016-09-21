const React = require('react')

const TableManager = function(){

}


TableManager.manageTable = function(tables, table, order){

  if(!tables[table].length >0  && Object.keys(order[0]).length>0){
    console.log("assign order to table")
    tables[table] = order 
    return ["tables", tables]
  }
  if(tables[table].length >0  && !Object.keys(order[0]).length>0){
    console.log("assign table to order")
    order = tables[table]
    tables[table]=[]
    return ["order", order, tables]
  }
  return false
}

module.exports = TableManager