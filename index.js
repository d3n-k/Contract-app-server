
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
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const moment = require("moment");



const PORT = process.env.PORT || 5000;

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);
//app.use("/static", express.static(__dirname + "/public"));
app.use(errorHandler);




// договор1

app.post("/create-pdf1", (req, res) => {
  console.log(req.body);

  const data = req.body;

  var options = {
    convertTo : 'pdf' 
  };

  carbone.render('./files/contract.odt', data, options, function(err, result){
    if (err) {
      res.send(Promise.reject());
      console.log(err);
      
    }
    fs.writeFileSync('result.pdf', result);
    res.send(Promise.resolve());
    
  });
  
});

app.get("/contract1", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

// шаблоны

app.get("/download", (req, res) => {
  res.sendFile(`${__dirname}/files/contract.odt`);
});

app.get("/download2", (req, res) => {
  res.sendFile(`${__dirname}/files2/contract2.odt`);
});

app.get("/download3", (req, res) => {
  res.sendFile(`${__dirname}/files3/contract3.odt`);
});


////////////////////////////////
// docx 1

app.post("/create-docx", (req, res) => {
  const obj = req.body;
  
  const {cath, address, cus, firstNum, firstNaprav, colNaprav, telephone, cour, date} = obj;
  
  let arr = [];
  const time = moment().format('DD.MM.YYYY');

  for (let i = 0; i < colNaprav; i++) {
    let val = Number(firstNaprav);
    arr.push({num: `${val + i}`});
  }


  const content = fs.readFileSync(
    path.resolve(__dirname, "res1.docx"),
    "binary"
 );

 const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({
    userGreeting: (scope) => {
        return scope.num;
    },
    ...obj,
    arr: arr,
    time: time,
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, `res.docx`), buf);

res.send(Promise.resolve());

});


app.get("/docx", (req, res) => {
  res.sendFile(`${__dirname}/res.docx`);
});


// docx 2

app.post("/create-docx2", (req, res) => {
  const obj = req.body;
  
  const {cath, address, cus, firstNum, firstNaprav, colNaprav, telephone, cour, date, price} = obj;
  
  let arr = [];
  const time = moment().format('DD.MM.YYYY');

  for (let i = 0; i < colNaprav; i++) {
    let val = Number(firstNaprav);
    arr.push({num: `${val + i}`});
  }


  const content = fs.readFileSync(
    path.resolve(__dirname, "data.docx"),
    "binary"
 );

 const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({
    userGreeting: (scope) => {
        return scope.num;
    },
    ...obj,
    arr: arr,
    time: time,
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, `res_plat.docx`), buf);

res.send(Promise.resolve());

});


app.get("/docx2", (req, res) => {
  res.sendFile(`${__dirname}/res_plat.docx`);
});


// docx 3

app.post("/create-docx3", (req, res) => {
  const obj = req.body;
  
  const {cath, address, cus, firstNum, firstNaprav, colNaprav, telephone, cour, date, price} = obj;
  
  let arr = [];
  const time = moment().format('DD.MM.YYYY');

  for (let i = 0; i < colNaprav; i++) {
    let val = Number(firstNaprav);
    arr.push({num: `${val + i}`});
  }


  const content = fs.readFileSync(
    path.resolve(__dirname, "data3.docx"),
    "binary"
 );

 const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({
    userGreeting: (scope) => {
        return scope.num;
    },
    ...obj,
    arr: arr,
    time: time,
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, `res_yr.docx`), buf);

res.send(Promise.resolve());

});


app.get("/docx3", (req, res) => {
  res.sendFile(`${__dirname}/res_yr.docx`);
});

//contract2

app.post("/create-pdf2", (req, res) => {
  const obj = req.body;
  
  let text = rubles(obj.price);
  let price = functions.splitPrice(obj.price, text);
  let lastDate = functions.splitDate(obj.date);
  let data = {
    ...obj,
    price: price,
    lastDate: lastDate,
  };
  console.log(data);

  var options = {
    convertTo : 'pdf' 
  };

  carbone.render('./files2/contract2.odt', data, options, function(err, result){
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('result2.pdf', result);
    res.send(Promise.resolve());
    
  });
  
});

app.get("/contract2", (req, res) => {
  res.sendFile(`${__dirname}/result2.pdf`);
});



//contract3

app.post("/create-pdf3", (req, res) => {
  
  let obj = req.body;
  let text = rubles(obj.price);
  let price = functions.splitPrice(obj.price, text);
  let lastDate = functions.splitDate(obj.date);
  let data = {
    ...obj,
    price: price,
    lastDate: lastDate,
  };

  console.log(data);


  var options = {
    convertTo : 'pdf' 
  };

  carbone.render('./files3/contract3.odt', data, options, function(err, result){
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    fs.writeFileSync('result3.pdf', result);
    res.send(Promise.resolve());
    
  });
  
});

app.get("/contract3", (req, res) => {
  res.sendFile(`${__dirname}/result3.pdf`);
});


///////////////////////////////////////////////

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
