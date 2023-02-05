const getHash = () => {
    return new Date().getTime() + '.' + (Math.random() + 1).toString(36).slice(5);
  }
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  const getGaId = () => {
    let cookieGa = getCookie('_ga');
    if (!!cookieGa) {
      cookieGa = cookieGa.split(".");
      cookieGa.shift();
      cookieGa.shift();
      cookieGa = cookieGa.join('.');
      return cookieGa;
    } else {
      return 'None';
    }
  }
  
  const getDidomiCookieConsent = () => {
    let rslt = "None";
    const didomiToken = getCookie("didomi_token");
  
    if ( !isBase64(didomiToken) )  { return rslt; }
  
    let didomiTokenDecoded = atob(didomiToken);
  
    if ( !isJsonString(didomiTokenDecoded) )   { return rslt; }
  
    didomiTokenDecoded = JSON.parse(didomiTokenDecoded);
  
    if ( !didomiTokenDecoded.vendors )   { return rslt; }
  
    const hasPurposesEnabled = !!didomiTokenDecoded.purposes && !!didomiTokenDecoded.purposes.enabled || false;
    const hasPurposesDisabled = !!didomiTokenDecoded.purposes && !!didomiTokenDecoded.purposes.disabled || false;
  
    if ( !hasPurposesEnabled ) {
      rslt = "Denied: all";
    } else if ( !hasPurposesDisabled ) {
      rslt =  "Accepted: all";
    } else {
      rslt = "Accepted: " + didomiTokenDecoded.purposes.enabled;
    }
    return rslt;
  }
  
  const isBase64 = (str) => {
    try { atob(str); } catch (e) { return false; }
    return true;
  }
  
  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  
  export { getDidomiCookieConsent, getGaId, getHash };
  