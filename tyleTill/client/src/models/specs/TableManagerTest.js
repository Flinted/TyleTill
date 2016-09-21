const assert = require('chai').assert;
const TableManager = require('../TableManager')

describe("TableTest", function(){
  tableManager= null

  beforeEach(function(){
        tableManager = new TableManager
    })
  
  it("Should create objective", function(){
      const tables= {one:["one", "two"], two:[]}
      const order = [{test: "Test"}]
      assert.deepEqual(tableManager.manageTables(tables, "one", order), false)
    })



})