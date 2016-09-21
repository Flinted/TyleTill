const assert = require('chai').assert;
const OrderManager = require('../OrderManager')

describe("OrderTest", function(){

  beforeEach(function(){
    
  })
  
  it("Should add item to array", function(){
    const item = {name: "test", prices:[1.00,2.00], sizes:["small","large"]}
    const items = [{}]
    const newOrder = OrderManager.addItem(items, item, null, 0)
    const length = newOrder.length
    assert.deepEqual(length, 1)
  })

  it("Should add to hash if already present", function(){
    const item = {name: "test", prices:[1.00,2.00], sizes:["small","large"]}
    const items = [{}]
    const newOrder = OrderManager.addItem(items, item, null, 0)
    const newOrder2 = OrderManager.addItem(newOrder, item, null, 0)
    const key = "test(small)"
    assert.deepEqual(newOrder2[0][key].qty, 2)
    assert.deepEqual(newOrder2.length,1)
  })

  it("Should add by qty if given",function(){
    const item = {name: "test", prices:[1.00,2.00], sizes:["small","large"]}
    const items = [{}]
    const newOrder = OrderManager.addItem(items, item, 5, 0)
    const key = "test(small)"
    assert.deepEqual(newOrder[0][key].qty, 5)
  })

  it("Should grab price and size by array",function(){
    const item = {name: "test", prices:[1.00,2.00], sizes:["small","large"]}
    const items = [{}]
    const newOrder = OrderManager.addItem(items, item, 5, 1)
    const key = "test(large)"
    assert.deepEqual(newOrder[0][key].name, "test(large)")
  })

  it("Should remove item",function(){
    const item = {name: "test", prices:[1.00,2.00], sizes:["small","large"]}
    const items = [{}]
    let newOrder = OrderManager.addItem(items, item, 5, 1)
    const key = "test(large)"
    newOrder = OrderManager.removeItem(items, key, 1)
    assert.deepEqual(newOrder[0][key].qty, 4)
  })

  it("Should remove item by qty",function(){
    const item = {name: "test", prices:[1.00,2.00], sizes:["small","large"]}
    const items = [{}]
    let newOrder = OrderManager.addItem(items, item, 5, 1)
    const key = "test(large)"
    newOrder = OrderManager.removeItem(items, key, 3)
    assert.deepEqual(newOrder[0][key].qty, 2)
  })

})