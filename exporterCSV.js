// Exporter un fichier CSV depuis Google Sheets avec le point virgule
// Google Sheets permet d'exporter en CSV des feuilles de calcul. Par contre, le séparateur est soit la virgule, soit la tabulation.
// Seulement, les systèmes français demandent souvent le point virgule pour l'exportation. Cette solution n'est pas native. Je vous propose donc ce script pour palier à ce manque.

function onOpen() {
  var feuilleActive = SpreadsheetApp.getActiveSpreadsheet();
  var menuCSV = [{name: "Outils", functionName: "sauvegarderEnCSV"}];
  feuilleActive.addMenu("Exporter le fichier CSV", menuCSV);
};

function sauvegarderEnCSV() {
  var classeur = SpreadsheetApp.getActiveSpreadsheet();
  var feuilleActive = classeur.getActiveSheet();
  var dossierParent = DriveApp.getRootFolder();
  var dossier = dossierParent;
  var dateCourante = Utilities.formatDate(new Date(), "GMT+1", "yyyy-MM-dd")
  var nomFeuille = feuilleActive.getName();
  var nomDuFichier = nomFeuille + ' - ' + dateCourante + ".csv";
  var url = "https://docs.google.com/spreadsheets/d/" + classeur.getId() + "/export?exportFormat=csv&format=csv";  
  var token = ScriptApp.getOAuthToken();  
  var response = UrlFetchApp.fetch(url + feuilleActive.getSheetId(), {
  headers: {
  'Authorization': 'Bearer ' +  token
  }
  });
  var donneesCSV = Utilities.parseCsv(response.getBlob().getDataAsString());
  var donneesEnSortie = donneesCSV.map(r => r.join(";")).join("\n");
  var fichier = dossier.createFile(nomDuFichier, donneesEnSortie, MimeType.PLAIN_TEXT);
  var URLTelechargement = fichier.getDownloadUrl().slice(0, -8);
  voirURL(URLTelechargement);
}

function voirURL(URLTelechargement) {
  var link = HtmlService.createHtmlOutput('<a href="' + URLTelechargement + '">Cliquer ici pour le télécharger !</a>')
      .setWidth(300)
      .setHeight(60);
  
  SpreadsheetApp.getUi().showModalDialog(link, 'Votre fichier CSV est prêt !');
} 

