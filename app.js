const express = require('express')
const app = express();

const bodyParser = require('body-parser');
var rp = require('request-promise');
const pg = require('pg');

const { Pool } = require('pg');
var path = require('path');

app.use('/uploads', express.static(__dirname + '/public'));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

// Minhas finanças

app.get('/planejamento/dashboard/:data', function(req, res) {

  if(req.params.data == "2019-05"){
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
      planningValue: 5825.00,
      vlGain: 5825.00,
      budgetedGain: 2119.54,
      vlSpent: 5000.00,
      budgetedSpent: 1004.00
    }));
  } else{
    res.status(404).send(JSON.stringify({
      msg: "sem dados"
    }));
  }
});


app.get('/brasileirao/:data', function(req, res) {

  if(req.params.data == "2020-07"){
  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify(
     [{
      id:1,
      time1: "Corinthians",
      time2: "Vasco",
      placar: "2x0",
      data_horario: "10/07/2020 - 16:00",
      local: "Pacaembu - SP"
    },
    {
      id:2,
      time1: "Flamengo",
      time2: "Fluminense",
      placar: "4x0",
      data_horario: "10/07/2020 - 15:00",
      local: "Maracanã - RJ"
    },
    {
      id:3,
      time1: "Palmeiras",
      time2: "Santos",
      placar: "1x3",
      data_horario: "10/07/2020 - 15:00",
      local: "Alianz - SP"
    },
    {
      id:4,
      time1: "Sport",
      time2: "Gremio",
      placar: "0x3",
      data_horario: "10/07/2020 - 15:00",
      local: "Ressaca - RE"
    }]));
  } else{
    res.status(404).send(JSON.stringify({
      msg: "sem dados"
    }));
  }
});

app.get('/linha-do-tempo/:id', function(req, res) {

  if(req.params.id == "1"){
    res.setHeader('Content-Type', 'application/json');  

  res.end(JSON.stringify(
     [{
      tempo: "01:52",
      descricao: "Escanteio na trave!"
    },
    {
      tempo: "12:12",
      descricao: "Penalti!"
    },
    {
      tempo: "12:15",
      descricao: "Gooool no angulo!"
    }]));
  }
  else if (req.params.id == "2") {
    res.setHeader('Content-Type', 'application/json');  

    res.end(JSON.stringify(
       [{
        tempo: "08:03",
        descricao: "Cartao amarelo"
      },
      {
        tempo: "09:12",
        descricao: "Briga em campo"
      },
      {
        tempo: "84:15",
        descricao: "GoOoooool no maravilhoso!"
      }]));
  }
  else if (req.params.id == "3") {
    res.setHeader('Content-Type', 'application/json');  

    res.end(JSON.stringify(
       [{
        tempo: "07:03",
        descricao: "Escanteio na trave!"
      },
      {
        tempo: "14:17",
        descricao: "jogador machucado!"
      },
      {
        tempo: "46:15",
        descricao: "Gooool de bicicleta!"
      }]));
  }
  else if (req.params.id == "4") {
    res.setHeader('Content-Type', 'application/json');  

    res.end(JSON.stringify(
       [{
        tempo: "11:10",
        descricao: "Cartão amarelo para Ramirez"
      },
      {
        tempo: "42:10",
        descricao: "Na trave!"
      },
      {
        tempo: "70:15",
        descricao: "Substituição!"
      }]));
  } else{
    res.status(404).send(JSON.stringify({
      msg: "sem dados"
    }));
  }
});


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/insert', function(req, res) {
    const text = `INSERT INTO
      reflections(id, success, low_point, take_away, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      1,
      "sucess1",
      "lo1",
      "take1",
      null,
      null
    ];

      pool.query(text, values)
      .then((res) => {
        pool.end();
        const rows = res.rows;
        return res.status(201).send(rows[0]);
      })
      .catch((err) => {
        pool.end();
        return res.status(400).send(err);
      })
      
});


app.get('/teste', function(req, res) {
const queryText =
    `CREATE TABLE IF NOT EXISTS
      reflections(
        id UUID PRIMARY KEY,
        success VARCHAR(128) NOT NULL,
        low_point VARCHAR(128) NOT NULL,
        take_away VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
});

app.get('/criaTableUsuarios', function(req, res){
//     client.connect();

//     client.query('create table usuarios (id bigint auto_increment, nome text, email text, telefone text, senha text);', (err, res) => {
//         console.log('Criar tabela', res);
//     });

});

app.get('/verTableUsuarios', function(req, res){
//     client.connect();

//     client.query(`SELECT * FROM usuarios;`, (err, res) => {
//         console.log('Seleciona tabela usuarios res', res);
//         console.log('Seleciona tabela usuarios resrows', res.rows);
//     });

//     client.end();
});

app.post('/inserirUsuario', function(request, response) {
    
    var nome = 'Denys'; 
    var email = 'denys.design@gmail.com';
    var telefone = '984413353';
    var senha = '123456';

    let query = 'INSERT INTO usuarios VALUES '+ '('+ nome +','+ email +','+ telefone +','+ senha +')';

//     client.connect();

//     client.query(query, (err, result) => {
//         console.log('result insert', result);
//     });

//     client.end();

});

var porta = process.env.PORT || 8080;
app.listen(porta, () => console.log('Example app listening on port 3000!'))
