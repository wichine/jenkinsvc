// ****************************************
// const DEBUG is for auto packing,it's value 
// will be changed to false when packing.
const DEBUG = true;
// Do not modify this const!!!!!!!!!!!!!!!
// ****************************************


export const G = {

  wsPrefix : DEBUG ? (`ws://${window.location.hostname}:8080`) : ('ws://' + window.location.host),
  httpPrefix: DEBUG ? (`http://${window.location.hostname}:8080`) : ('http://' + window.location.host),

}
