function DMARCLookup(domain) {
  try {
    var url = "https://dns.google.com/resolve?name=%FQDN%&type=TXT".replace("%FQDN%", "_dmarc." + domain);
    Logger.log(url);
    Utilities.sleep(100);
    var result = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    var rc = result.getResponseCode();
    var response = JSON.parse(result.getContentText());

    if (rc !== 200) {
      throw new Error(response.message);
    }

    var dmarcRecords = [];

    for (var i = 0; i < response.Answer.length; i++) {
      var txtData = response.Answer[i].data;
      dmarcRecords.push(txtData);
    }

    return dmarcRecords;
  } catch (e) {
    return ["Non trouvé"];
  }
}
