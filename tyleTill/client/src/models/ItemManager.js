_ = require('lodash')


const ItemManager = ()=> {}

ItemManager.prototype={

getItems(result){
  let items = []
  if(result[0].types){
        result[0].types.forEach(function(type){
              type.subtypes.forEach(function(subtype){
                    items = items.concat(subtype.items)
              })
        })
  }
  if(result[0].subtypes){
        result[0].subtypes.forEach(function(subtype){
            items = items.concat(subtype.items)
        })
  }
  if(!result[0].types && !result[0].subtypes){
      items = result[0].items
  }

const finalItems = this.prepareItems(items)
return finalItems
},


prepareItems(items){
  let parsedItems =[]
  for(let item of items){
    let parseItem = item
    parseItem.sizes = JSON.parse(item.sizes)
    parseItem.prices = JSON.parse(item.prices)
    parsedItems.push(parseItem)
  }
  return parsedItems
},

getCategories(items){
    console.log(items)
    let divisions = []
    let types =[]
    let subtypes =[]
    for(let a in items){
          divisions.push(items[a].name)
          for(let b in items[a].types){
              types.push(items[a].types[b].name)
              for(let c in items[a].types[b].subtypes){
                  subtypes.push(items[a].types[b].subtypes[c].name)
                }
          }
    }

    const categories= {divisions: divisions, types: types, subtypes: subtypes}
    console.log("divisions", categories)
    return categories  
}

}

module.exports = ItemManager