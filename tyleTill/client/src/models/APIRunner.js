


const APIRunner = ()=> {}

APIRunner.prototype={
  
  run( type , url , data ){
    return new Promise(function( resolve , reject ){
          const request = new XMLHttpRequest();
          request.open( type , url );
          request.setRequestHeader( 'Content-Type' , 'application/json' );
          request.onload = () =>{
            if (request.status === 200){
              if(request.responseText){
                const jsonString = request.responseText
                const response = JSON.parse( jsonString )
                resolve( response )
              }
            }else{
              console.log( "error on fetch" , request.status)
              reject(Error( request.statusText ))
            }
          }
          request.send( data || null );
    })
    
  }

}


module.exports = APIRunner
