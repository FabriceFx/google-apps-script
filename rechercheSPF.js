function SPFLookup(domain) {
  try {
    var url = "https://dns.google.com/resolve?name=%FQDN%&type=TXT".replace("%FQDN%", domain);
    Logger.log(url);
    Utilities.sleep(100);
    var result = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    var rc = result.getResponseCode();
    var response = JSON.parse(result.getContentText());

    if (rc !== 200) {
      throw new Error(response.message);
    }

    var spfData = "";

    for (var i = 0; i < response.Answer.length; i++) {
      var txtData = response.Answer[i].data;

      if (txtData.startsWith("v=spf1")) {
        spfData = txtData;
        break; // Break out of the loop once the SPF record is found
      }
    }

    return spfData;
  } catch (e) {
    return "ERROR";
  }
}
