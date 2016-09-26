const assert = require('chai').assert;
const CashManager = require('../CashManager')

describe("CashTest", function(){
  let order
  beforeEach(function(){
     order =   [{test: {id: 1, name: "test", qty: 4, total: 40.00},test2:{id: 2, name: "test2", qty: 2, total: 60.00},test3:{id: 3, name: "test3", qty: 3, total: 15.00}}]
  })
  
  it("Should total items correctly", function(){
      assert.deepEqual(CashManager.total(order), 115.00)
  })

  it("Should return false if neither have data", function(){
    const infoOrder = CashManager.getOrderInfo(order, "tester")
    assert.deepEqual(infoOrder.user, "tester")
  })

  it("Should return correct payment info with input",function(){
    const payment = CashManager.checkPayAmount("cash", 1.00, 50.00)
    assert.deepEqual(payment.total, -1.00 )
  })

  it("Should return full payment if no input",function(){
    const payment = CashManager.checkPayAmount("cash", null, 50.00)
    assert.deepEqual(payment.total, -50.00 )
  })

})