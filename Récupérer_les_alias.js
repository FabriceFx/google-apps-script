function listeAliasComptes() {

  let pageToken
  let page

  // Ouvrir la feuille de calcul et la feuille spécifiée
  const classeur = SpreadsheetApp.getActiveSpreadsheet();
  const feuille = classeur.getSheetByName("Comptes");

  // Vider la feuille de calcul
  feuille.clear();

  // Ajouter l'en-tête
  const entete = ['Nom complet', 'Email', 'Alias'];
  feuille.appendRow(entete);

  // Appliquer la mise en forme en gras à la première ligne
  const ligneEntete = feuille.getRange(1, 1, 1, 3);
  ligneEntete.setFontWeight("bold");

  // Figer la première ligne
  feuille.setFrozenRows(1);

  do {
    page = AdminDirectory.Users.list({
      customer: 'my_customer',
      maxResults: 100,
      pageToken,
      fields: 'users(name/fullName,primaryEmail,aliases),nextPageToken',
    });

    let users = page.users;

    if (users) {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.aliases && user.aliases.length > 0) {
          const rowData = [
            user.name.fullName,
            user.primaryEmail,
            JSON.stringify(user.aliases)
          ];
          feuille.appendRow(rowData);
        }
      }
    } else {
      Logger.log('Aucun utilisateur trouvé.');
    }

    pageToken = page.nextPageToken;
  } while (pageToken);
}

function listeAliasGroupes() {

  let pageToken;
  let page;

  // Ouvrir la feuille de calcul et la feuille spécifiée
  const classeur = SpreadsheetApp.getActiveSpreadsheet();
  const feuille = classeur.getSheetByName("Groupes");

  // Vider la feuille de calcul
  feuille.clear();

  // Ajouter l'en-tête
  const entete = ['Email du groupe', 'Alias'];
  feuille.appendRow(entete);

  // Appliquer la mise en forme en gras à la première ligne
  const ligneEntete = feuille.getRange(1, 1, 1, 2);
  ligneEntete.setFontWeight("bold");

  // Figer la première ligne
  feuille.setFrozenRows(1);

  do {
    page = AdminDirectory.Groups.list({
      customer: 'my_customer',
      maxResults: 100,
      pageToken,
      fields: 'groups(email,aliases),nextPageToken',
    });

    let groups = page.groups;

    if (groups) {
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        if (group.aliases && group.aliases.length > 0) {
          const rowData = [
            group.email,
            JSON.stringify(group.aliases)
          ];
          feuille.appendRow(rowData);
        }
      }
    } else {
      Logger.log('Aucun groupe trouvé.');
    }

    pageToken = page.nextPageToken;
  } while (pageToken);
}

