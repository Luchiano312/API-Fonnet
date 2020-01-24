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
router.get('/api-fonnet-categoria',(req ,res) => {
    execSQLQuery("SELECT * FROM TB_Categoria WHERE id=ID",res);

})
router.get('/api-fonnet-produtos',(req ,res) => {
    execSQLQuery("SELECT * FROM TB_Produtos WHERE id=ID",res);

})

router.get('/api-fonnet-fabricantes',(req ,res) => {
    execSQLQuery("SELECT * FROM TB_Fabricante WHERE id=ID",res);

})

router.get('/api-fonnet-produtoarquivos',(req ,res) => {
    execSQLQuery("SELECT * FROM TB_ProdutosArquivos WHERE id=ID",res);

})

router.get('/api-fonnet-prodsiteitens',(req ,res) => {
    execSQLQuery("SELECT * FROM TB_Produtos_Site_Itens WHERE id=ID",res);

})

router.get('/api-fonnet-prodtituloesptec',(req ,res) => {
    execSQLQuery("SELECT * FROM TB_ProdutosTituloEspTec WHERE id=ID",res);

})

// Função Query de consulta
function execSQLQuery(sqlQry,res){
    global.conn.request()
                .query(sqlQry)
                .then(result => res.json(result.recordset))
                .catch(err => res.json(err))
}

app.listen(port, () => console.log(`API funcionando sem erro`))
