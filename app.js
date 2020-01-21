const express = require('express');
const bodyParser = require('body-parser'); 
const app = express()

// Gateway padrão
//const port = 7000;
const port =  process.env.PORT || 8080; 

// Conecção com o banco localhost
//const connStr = "Server=localhost;Database=FONNET;User ID=sa;Password=@Fnt2019!;";
const connStr = "Data Source=191.252.59.59;Initial Catalog=FonNetSite;Persist Security Info=True;User ID=site_view;Password=@Fnt2020!"
const sql = require('mssql');

sql.connect(connStr)
    .then(conn => global.conn = conn)
    .catch(err => console.log(err));

// Monta o json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Rota inicial
const router = express.Router();
router.get('/',(req ,res) => res.json({
    message:'API Fonnet funcionando'
}));
app.use('/',router);


//Rota de consulta
router.get('/api-fonnet-wordpress',(req ,res) => {
    //execSQLQuery("SELECT * FROM TB_Produtos",res);
    execSQLQuery("SELECT * FROM TB_Categoria FULL OUTER JOIN TB_Produtos ON TB_Categoria.ID=TB_Produtos.ID",res);
})

// Função Query de consulta
function execSQLQuery(sqlQry,res){
    global.conn.request()
                .query(sqlQry)
                .then(result => res.json(result.recordset))
                .catch(err => res.json(err))
}

app.listen(port, () => console.log(`API funcionando sem erro`))
