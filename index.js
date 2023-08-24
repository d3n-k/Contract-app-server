
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const fs = require("fs");
const rubles = require("rubles").rubles;
const functions = require("./functions");
const carbone = require('carbone');
const fileUpload = require('express-fileupload');
const moment = require("moment");


const PORT = process.env.PORT || 5000;

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);
app.use(express.static(path.join(__dirname, 'build')));
app.use(errorHandler);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// договор1

app.post("/api/create-pdf1", (req, res) => {
  console.log(req.body);

  const data = req.body;

  var options = {
    convertTo: 'pdf'
  };

  carbone.render('./files/contract.docx', data, options, function (err, result) {
    if (err) {
      res.send(Promise.reject());
      console.log(err);

    }
    fs.writeFileSync('result.pdf', result);
    res.send(Promise.resolve());

  });

});

app.get("/api/contract1", (req, res) => {
  console.log("get contract pdf");
  res.sendFile(`${__dirname}/result.pdf`);
});

// шаблоны

app.get("/api/download", (req, res) => {
  res.sendFile(`${__dirname}/files/contract.docx`);
});

app.get("/api/download2", (req, res) => {
  res.sendFile(`${__dirname}/files2/contract2.docx`);
});

app.get("/api/download3", (req, res) => {
  res.sendFile(`${__dirname}/files3/contract3.docx`);
});

app.get("/api/downloadDoc1", (req, res) => {
  res.sendFile(`${__dirname}/dogovor1.docx`);
});

app.get("/api/downloadDoc2", (req, res) => {
  res.sendFile(`${__dirname}/dogovor2.docx`);
});

app.get("/api/downloadDoc3", (req, res) => {
  res.sendFile(`${__dirname}/dogovor3.docx`);
});

app.get("/api/downloadDoc4", (req, res) => {
  res.sendFile(`${__dirname}/dogovor4.docx`);
});

app.get("/api/downloadDoc5", (req, res) => {
  res.sendFile(`${__dirname}/dogovor5.docx`);
});

app.get("/api/downloadNaprav1", (req, res) => {
  res.sendFile(`${__dirname}/res1.docx`);
});

app.get("/api/downloadNaprav2", (req, res) => {
  res.sendFile(`${__dirname}/data.docx`);
});

app.get("/api/downloadNaprav3", (req, res) => {
  res.sendFile(`${__dirname}/data3.docx`);
});

////////////////////////////////
// docx 1

app.post("/api/create-docx", (req, res) => {
  const obj = req.body;

  console.log(obj);

  const { cath, address, cus, firstNum, firstNaprav, colNaprav, telephone, cour, date, year } = obj;


  let arr = [];
  const time = moment().format('DD.MM.YYYY');

  let ifYear = '';

  if (date) {
    ifYear = '.' + year;
  }

  for (let i = 0; i < colNaprav; i++) {
    let val = Number(firstNaprav);
    arr.push({ num: `${val + i}` });
  }

  const data = {
    ...obj,
    arr: arr,
    time: time,
    ifYear: ifYear
  }

  carbone.render('res1.docx', data, {}, function (err, result) {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('res.docx', result);
    res.send(Promise.resolve());

  });
});


app.get("/api/docx", (req, res) => {
  res.sendFile(`${__dirname}/res.docx`);
});


// docx 2

app.post("/api/create-docx2", (req, res) => {
  const obj = req.body;

  console.log(obj);

  const { cath, address, cus, firstNum, firstNaprav, colNaprav, telephone, cour, date, price, year } = obj;

  let arr = [];
  const time = moment().format('DD.MM.YYYY');
  let ifYear = '';

  if (date) {
    ifYear = '.' + year;
  }


  for (let i = 0; i < colNaprav; i++) {
    let val = Number(firstNaprav);
    arr.push({ num: `${val + i}` });
  }

  const data = {
    ...obj,
    arr: arr,
    time: time,
    ifYear: ifYear
  }

  carbone.render('data.docx', data, {}, function (err, result) {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('res_plat.docx', result);
    res.send(Promise.resolve());

  });
});


app.get("/api/docx2", (req, res) => {
  res.sendFile(`${__dirname}/res_plat.docx`);
});


// docx 3

app.post("/api/create-docx3", (req, res) => {
  const obj = req.body;

  console.log(obj);

  const { cath, address, cus, firstNum, firstNaprav, colNaprav, telephone, cour, date, price, year } = obj;

  let arr = [];
  const time = moment().format('DD.MM.YYYY');
  let ifYear = '';

  if (date) {
    ifYear = '.' + year;
  }


  for (let i = 0; i < colNaprav; i++) {
    let val = Number(firstNaprav);
    arr.push({ num: `${val + i}` });
  }

  const data = {
    ...obj,
    arr: arr,
    time: time,
    ifYear: ifYear
  }

  carbone.render('data3.docx', data, {}, function (err, result) {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('res_yr.docx', result);
    res.send(Promise.resolve());

  });
});


app.get("/api/docx3", (req, res) => {
  res.sendFile(`${__dirname}/res_yr.docx`);
});

//contract2

app.post("/api/create-pdf2", (req, res) => {
  const obj = req.body;

  let text = rubles(obj.price);
  let price = functions.splitPrice(obj.price, text);
  let lastDate = functions.splitDate(obj.date, obj.year);
  let data = {
    ...obj,
    price: price,
    lastDate: lastDate,
  };
  console.log(data);

  var options = {
    convertTo: 'pdf'
  };

  carbone.render('./files2/contract2.docx', data, options, function (err, result) {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('result2.pdf', result);
    res.send(Promise.resolve());

  });

});

app.get("/api/contract2", (req, res) => {
  res.sendFile(`${__dirname}/result2.pdf`);
});



//contract3

app.post("/api/create-pdf3", (req, res) => {

  let obj = req.body;
  let text = rubles(obj.price);
  let price = functions.splitPrice(obj.price, text);
  let lastDate = functions.splitDate(obj.date, obj.year);
  let data = {
    ...obj,
    price: price,
    lastDate: lastDate,
  };

  console.log(data);

  var options = {
    convertTo: 'pdf'
  };

  carbone.render('./files3/contract3.docx', data, options, function (err, result) {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('result3.pdf', result);
    res.send(Promise.resolve());

  });

});

app.get("/api/contract3", (req, res) => {
  res.sendFile(`${__dirname}/result3.pdf`);
});


// О зачислении на повышение квалификации

app.post("/api/create-dogovor1", (req, res) => {
  const obj = req.body;

  console.log(obj);
  const { arr } = obj;

  carbone.render('dogovor1.docx', obj, {}, function (err, result) {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('resDogovor1.docx', result);
    res.send(Promise.resolve());

  });
});


app.get("/api/create-dogovor1", (req, res) => {
  res.sendFile(`${__dirname}/resDogovor1.docx`);
});



// О прекращении образ. отношений 

app.post("/api/create-dogovor2", (req, res) => {
  const obj = req.body;

  console.log(obj);
  const { arr } = obj;

  carbone.render('dogovor2.docx', obj, {}, function (err, result) {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('resDogovor2.docx', result);
    res.send(Promise.resolve());

  });
});


app.get("/api/create-dogovor2", (req, res) => {
  res.sendFile(`${__dirname}/resDogovor2.docx`);
});


// О проведении итоговой аттестации

app.post("/api/create-dogovor3", (req, res) => {
  const obj = req.body;

  console.log(obj);
  const { arr } = obj;

  carbone.render('dogovor3.docx', obj, {}, function (err, result) {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('resDogovor3.docx', result);
    res.send(Promise.resolve());

  });
});


app.get("/api/create-dogovor3", (req, res) => {
  res.sendFile(`${__dirname}/resDogovor3.docx`);
});


// Зачётно-экзаменационная ведомость

app.post("/api/create-dogovor4", (req, res) => {
  const obj = req.body;

  console.log(obj);
  const { arr } = obj;

  carbone.render('dogovor4.docx', obj, {}, function (err, result) {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('resDogovor4.docx', result);
    res.send(Promise.resolve());

  });
});


app.get("/api/create-dogovor4", (req, res) => {
  res.sendFile(`${__dirname}/resDogovor4.docx`);
});

// Журнал направлений 

app.post("/api/create-dogovor5", (req, res) => {
  const obj = req.body;

  console.log(obj);
  const { arr } = obj;

  carbone.render('dogovor5.docx', obj, {}, function (err, result) {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('resDogovor5.docx', result);
    res.send(Promise.resolve());

  });
});


app.get("/api/create-dogovor5", (req, res) => {
  res.sendFile(`${__dirname}/resDogovor5.docx`);
});

///////////////////////////////////////////////

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT,
      '127.0.0.1',
      () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
