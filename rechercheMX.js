function MXLookup(domain) {
  
  try {
    var url = "https://dns.google.com/resolve?name=%FQDN%&type=MX".replace("%FQDN%",domain);
    
    Utilities.sleep(100);
    var result = UrlFetchApp.fetch(url,{muteHttpExceptions:true});
    var rc = result.getResponseCode();
    var response = JSON.parse(result.getContentText());
  
    if (rc !== 200) {
      throw new Error( response.message );
    }
    
    if (response.Answer[0].data == null) {
      var mxRaw = response.Authority[0].data; 
    } else {
      var mxRaw = response.Answer[0].data;
    }
    
    var mx = mxRaw.toLowerCase();
    
    if (mx.indexOf("google.com") >= 0 || mx.indexOf("googlemail.com") >= 0)  { 
      var emailProvider = "Google Workspace"; 
    }
    else if (mx.indexOf("outlook.com") >= 0) { 
      var emailProvider = "Office 365"; 
    }
    else emailProvider = "Pas de messagerie";
    
    return emailProvider;
  }
  catch (e) {
    return "Non déterminé";
  }
}
