const assert = require('chai').assert;
const ItemManager = require('../ItemManager')

describe("ItemTest", function(){
  let items
  beforeEach(function(){
      items = [{"id":111,"name":"Mains","division_id":31,"created_at":"2016-09-21T19:39:51.862Z","updated_at":"2016-09-21T19:39:51.862Z","subtypes":[{"id":287,"name":"Grill","type_id":111,"created_at":"2016-09-21T19:39:51.895Z","updated_at":"2016-09-21T19:39:51.895Z","items":[{"id":495,"name":"Beef Burger","subtype_id":287,"sizes":"[\"Sgl\"]","prices":"[11.95]","created_at":"2016-09-21T19:39:52.093Z","updated_at":"2016-09-21T19:39:52.093Z"},{"id":496,"name":"Chicken","subtype_id":287,"sizes":"[\"Sgl\"]","prices":"[11.95]","created_at":"2016-09-21T19:39:52.096Z","updated_at":"2016-09-21T19:39:52.096Z"},{"id":497,"name":"Kebabs","subtype_id":287,"sizes":"[\"Sgl\"]","prices":"[11.95]","created_at":"2016-09-21T19:39:52.099Z","updated_at":"2016-09-21T19:39:52.099Z"},{"id":498,"name":"Pork Belly","subtype_id":287,"sizes":"[\"Sgl\"]","prices":"[11.95]","created_at":"2016-09-21T19:39:52.103Z","updated_at":"2016-09-21T19:39:52.103Z"},{"id":499,"name":"Ribs","subtype_id":287,"sizes":"[\"Sgl\"]","prices":"[18.95]","created_at":"2016-09-21T19:39:52.109Z","updated_at":"2016-09-21T19:39:52.109Z"},{"id":500,"name":"Steak","subtype_id":287,"sizes":"[\"Sgl\"]","prices":"[18.95]","created_at":"2016-09-21T19:39:52.111Z","updated_at":"2016-09-21T19:39:52.111Z"}]},{"id":288,"name":"Salads","type_id":111,"created_at":"2016-09-21T19:39:51.897Z","updated_at":"2016-09-21T19:39:51.897Z","items":[{"id":550,"name":"Caesar salad","subtype_id":288,"sizes":"[\"Sgl\"]","prices":"[8.95]","created_at":"2016-09-21T19:39:52.324Z","updated_at":"2016-09-21T19:39:52.324Z"},{"id":551,"name":"Goats Cheese salad","subtype_id":288,"sizes":"[\"Sgl\"]","prices":"[8.95]","created_at":"2016-09-21T19:39:52.326Z","updated_at":"2016-09-21T19:39:52.326Z"},{"id":552,"name":"Halloumi salad","subtype_id":288,"sizes":"[\"Sgl\"]","prices":"[8.95]","created_at":"2016-09-21T19:39:52.329Z","updated_at":"2016-09-21T19:39:52.329Z"},{"id":553,"name":"Pinenut salad","subtype_id":288,"sizes":"[\"Sgl\"]","prices":"[8.95]","created_at":"2016-09-21T19:39:52.335Z","updated_at":"2016-09-21T19:39:52.335Z"}]},{"id":289,"name":"Sandwiches","type_id":111,"created_at":"2016-09-21T19:39:51.899Z","updated_at":"2016-09-21T19:39:51.899Z","items":[{"id":554,"name":"BLT","subtype_id":289,"sizes":"[\"Sgl\"]","prices":"[8.95]","created_at":"2016-09-21T19:39:52.338Z","updated_at":"2016-09-21T19:39:52.338Z"},{"id":555,"name":"Club Sandwich","subtype_id":289,"sizes":"[\"Sgl\"]","prices":"[8.95]","created_at":"2016-09-21T19:39:52.341Z","updated_at":"2016-09-21T19:39:52.341Z"},{"id":556,"name":"Crayfish","subtype_id":289,"sizes":"[\"Sgl\"]","prices":"[8.95]","created_at":"2016-09-21T19:39:52.344Z","updated_at":"2016-09-21T19:39:52.344Z"},{"id":557,"name":"Tuna Mayo","subtype_id":289,"sizes":"[\"Sgl\"]","prices":"[8.95]","created_at":"2016-09-21T19:39:52.346Z","updated_at":"2016-09-21T19:39:52.346Z"}]}]}]
  })
  
  it("Should return all items", function(){
        const returnItems = ItemManager.getItems(items)
        assert.deepEqual(returnItems.length, 14)
  })

  it("Should make prices and sizes into arrays from JSON", function(){
        const returnItems = ItemManager.getItems(items)
        assert.deepEqual(returnItems[0].sizes, ["Sgl"])
  })

  it("Should return list of SubTypes",function(){
        const returnTypes = ItemManager.prepareSubtypes(items)
        assert.deepEqual(returnTypes[0],"Grill") 
  })

})