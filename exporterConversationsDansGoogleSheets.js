// Code en français

function exporterConversationsDansGoogleSheets() {
  // Remplacez 'Libellé' par le libellé spécifique que vous souhaitez traiter.
  var libelle = 'Libellé';

  // Obtenez la feuille de calcul active.
  var feuille = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Obtenez tous les conversations portant ce libellé.
  var threads = GmailApp.search('label:' + libelle);

  // Parcourez chaque thread.
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();

    // Parcourez chaque message dans la conversation.
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var date = message.getDate();
      var sujet = message.getSubject();
      var expéditeur = message.getFrom();
      var contenu = message.getPlainBody(); // Ou .getBody() pour le HTML.

      // Ajoutez ces données à votre feuille de calcul.
      feuille.appendRow([date, sujet, expéditeur, contenu]);
    }
  }
}

// Code en anglais

function exportConversationsToGoogleSheets() {
  // Replace 'Label' with the specific label you want to process.
  var label = 'Label';

  // Get the active spreadsheet.
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Get all threads with the specified label.
  var threads = GmailApp.search('label:' + label);

  // Loop through each thread.
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();

    // Loop through each message in the thread.
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var date = message.getDate();
      var subject = message.getSubject();
      var sender = message.getFrom();
      var content = message.getPlainBody(); // Or .getBody() for HTML.

      // Add this data to your spreadsheet.
      sheet.appendRow([date, subject, sender, content]);
    }
  }
}
