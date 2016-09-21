const assert = require('chai').assert;
const TableManager = require('../TableManager')

describe("TableTest", function(){

  beforeEach(function(){
    
  })
  
  it("Should return false if both have data", function(){
    const tables= {one:["one", "two"], two:[]}
    const order = [{test: "Test"}]
    assert.deepEqual(TableManager.manageTable(tables, "one", order), false)
  })

  it("Should return false if neither have data", function(){
    const tables= {one:[], two:[]}
    const order = [{}]
    assert.deepEqual(TableManager.manageTable(tables, "one", order), false)
  })

  it("Should return table object if table empty",function(){
    const tables= {one:[], two:[]}
    const order = [{test: "Test"}]
    assert.deepEqual(TableManager.manageTable(tables, "one", order)[0], "tables")
  })

  it("Should return order object if order empty",function(){
    const tables= {one:["one","two"], two:[]}
    const order = [{}]
    assert.deepEqual(TableManager.manageTable(tables, "one", order)[0], "order")
  })
})