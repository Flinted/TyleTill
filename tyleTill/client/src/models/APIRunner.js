


const APIRunner = ()=> {}

APIRunner.prototype={
  
run(type, url,data){
    return new Promise(function(resolve, reject){
          const request = new XMLHttpRequest();
          request.open(type,url);
          request.setRequestHeader('Content-Type', 'application/json');
          request.onload = () =>{
            if (request.status === 200){
              if(request.responseText){
                const jsonString = request.responseText
                const response = JSON.parse(jsonString)
                resolve(response)
              }
            }else{
              console.log("error on fetch", request.status)
              reject(Error(request.statusText))
            }
          }
          request.send(data || null);



    })
    
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



}


module.exports = APIRunner
