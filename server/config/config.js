//======================
// PUERtO
//======================
process.env.PORT = process.env.PORT || 3000

//======================
// ENtorno
//======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=======================
// BASE DE DATOS
//=======================

let urlDB;
let user = 'techAdmin';
let password = 'admintech123';
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/techAdmin'

} else {
    // urlDB = `mongodb+srv://${user}:${password}@cafe.xcifs.mongodb.net/test`
    urlDB = `mongodb+srv://${user}:${password}@grupotech.raemo.mongodb.net/techAdmin`

}

process.env.URLDB = urlDB;