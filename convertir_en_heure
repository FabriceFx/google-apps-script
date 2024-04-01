function onEdit(e) {
  var COLONNE_A_VERIFIER = 1;
  var NOM_FEUILLE = "Feuille1";
  var ENTETE = 1;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var feuille = ss.getActiveSheet();

  if(feuille.getName() === NOM_FEUILLE){
    var celluleSelectionnee = feuille.getActiveCell();
    if(celluleSelectionnee.getRow() > ENTETE && celluleSelectionnee.getColumn() === COLONNE_A_VERIFIER){
      celluleSelectionnee.setNumberFormat("@");
      var valeurCellule = celluleSelectionnee.getValue();

      if(/^\d{4}$/.test(valeurCellule)){
        var nombreCellule = Number(valeurCellule);
        if(nombreCellule > 2400){
          celluleSelectionnee.setValue("Erreur : Heure > 2400");
        }else if(nombreCellule % 100 >= 60){
          celluleSelectionnee.setValue("Erreur : Minutes >= 60");
        } else{
          var heure = valeurCellule.substring(0, 2) + ":" + valeurCellule.substring(2);
          celluleSelectionnee.setValue(heure);
          celluleSelectionnee.setNumberFormat("HH:mm");
        }
      }else if(valeurCellule === ""){
        celluleSelectionnee.setNumberFormat("@");
      }else{
        celluleSelectionnee.setValue("Erreur : Pas un nombre");
      }
    }
  }
}
