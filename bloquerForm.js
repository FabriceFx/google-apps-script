// Ce script permet de bloquer l’accès à la saisie dans un Google Forms en fonction de la date.
// Pour que le script s'exécute automatiquement à intervalles réguliers, vous pouvez configurer un déclencheur qui sera lancé quotidiennement.

function bloqueAccesApresDate() {
  var formulaireID = FormApp.getActiveForm().getId();
  var formulaire = FormApp.openById(formulaireID);
  var dateLimite = new Date('2023-08-28'); // Remplacez par la date limite
  
  
  var aujourdHui = new Date();
  if (aujourdHui > dateLimite) {
    formulaire.setAcceptingResponses(false);
    Logger.log('L\'accès au formulaire est bloqué.');
  }
}
