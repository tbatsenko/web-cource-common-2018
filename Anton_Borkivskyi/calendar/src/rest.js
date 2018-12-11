export function get(url){
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

export function post(url, req){
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "POST", url, false ); // false for synchronous request
  xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xmlHttp.send(req);
  return xmlHttp.responseText;
}


export function put(url, req){
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "PUT", url, false ); // false for synchronous request
  xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xmlHttp.send(req);
  return xmlHttp.responseText;
}