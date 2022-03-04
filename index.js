
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

app.get("/api/contract1", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

// шаблоны

app.get("/api/download", (req, res) => {
  res.sendFile(`${__dirname}/files/contract.odt`);
});

app.get("/api/download2", (req, res) => {
  res.sendFile(`${__dirname}/files2/contract2.odt`);
});

app.get("/api/download3", (req, res) => {
  res.sendFile(`${__dirname}/files3/contract3.odt`);
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

////////////////////////////////
// docx 1

app.post("/api/create-docx", (req, res) => {
  const obj = req.body;
  
  const {cath, address, cus, firstNum, firstNaprav, colNaprav, telephone, cour, date, year} = obj;

  
  let arr = [];
  const time = moment().format('DD.MM.YYYY');

  let ifYear = '';

  if (date) {
    ifYear = '.' + year;
  }

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
    ifYear: ifYear
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, `res.docx`), buf);

res.send(Promise.resolve());

});


app.get("/api/docx", (req, res) => {
  res.sendFile(`${__dirname}/res.docx`);
});


// docx 2

app.post("/api/create-docx2", (req, res) => {
  const obj = req.body;
  
  const {cath, address, cus, firstNum, firstNaprav, colNaprav, telephone, cour, date, price, year} = obj;
  
  let arr = [];
  const time = moment().format('DD.MM.YYYY');
  let ifYear = '';

  if (date) {
    ifYear = '.' + year;
  }


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
    ifYear: ifYear,
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, `res_plat.docx`), buf);

res.send(Promise.resolve());

});


app.get("/api/docx2", (req, res) => {
  res.sendFile(`${__dirname}/res_plat.docx`);
});


// docx 3

app.post("/api/create-docx3", (req, res) => {
  const obj = req.body;
  
  const {cath, address, cus, firstNum, firstNaprav, colNaprav, telephone, cour, date, price, year} = obj;
  
  let arr = [];
  const time = moment().format('DD.MM.YYYY');
  let ifYear = '';

  if (date) {
    ifYear = '.' + year;
  }


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
    ifYear: ifYear,
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, `res_yr.docx`), buf);

res.send(Promise.resolve());

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

app.get("/api/contract3", (req, res) => {
  res.sendFile(`${__dirname}/result3.pdf`);
});


// О зачислении на повышение квалификации

app.post("/api/create-dogovor1", (req, res) => {
  const obj = req.body;
  
  const {arr} = obj;

  const content = fs.readFileSync(
    path.resolve(__dirname, "dogovor1.docx"),
    "binary"
 );

 const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });


  doc.render({
    courseNum: (scope) => {
        return scope.num;
    },
    courseName: (scope) => {
      return scope.name;
    },
    courseFirstDate: (scope) => {
      return scope.firstDate;
    },
    courseUsers: (scope) => {
      let resUsers = '';
      for (let i = 0; i < scope.users.length; i++) {
        resUsers += scope.users[i] + '\n';
      }
      return resUsers;
    },
    courseCath: (scope) => {
      return scope.cath;
    },
    courseDate: (scope) => {
      return scope.date;
    },
    courseCathName: (scope) => {
      return scope.cathName;
    },
    arr: arr,
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, `resDogovor1.docx`), buf);

res.send(Promise.resolve());

});


app.get("/api/create-dogovor1", (req, res) => {
  res.sendFile(`${__dirname}/resDogovor1.docx`);
});



// О прекращении образ. отношений 

app.post("/api/create-dogovor2", (req, res) => {
  const obj = req.body;
  
  const {arr} = obj;

  const content = fs.readFileSync(
    path.resolve(__dirname, "dogovor2.docx"),
    "binary"
 );

 const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });


  doc.render({
    courseNum: (scope) => {
        return scope.num;
    },
    courseName: (scope) => {
      return scope.name;
    },
    courseLastDate: (scope) => {
      return scope.lastDate;
    },
    courseUsers: (scope) => {
      let resUsers = '';
      for (let i = 0; i < scope.users.length; i++) {
        resUsers += scope.users[i] + '\n';
      }
      return resUsers;
    },
    arr: arr,
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, `resDogovor2.docx`), buf);

res.send(Promise.resolve());

});


app.get("/api/create-dogovor2", (req, res) => {
  res.sendFile(`${__dirname}/resDogovor2.docx`);
});


// О проведении итоговой аттестации

app.post("/api/create-dogovor3", (req, res) => {
  const obj = req.body;
  
  const {arr, manyCath} = obj;

  const content = fs.readFileSync(
    path.resolve(__dirname, "dogovor3.docx"),
    "binary"
 );

 const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });


  doc.render({
    courseNum: (scope) => {
        return scope.num;
    },
    courseName: (scope) => {
      return scope.name;
    },
    courseLastDate: (scope) => {
      return scope.lastDate;
    },
    courseCath: (scope) => {
      return scope.cath;
    },
    manyCath: manyCath,
    arr: arr,
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, `resDogovor3.docx`), buf);

res.send(Promise.resolve());

});


app.get("/api/create-dogovor3", (req, res) => {
  res.sendFile(`${__dirname}/resDogovor3.docx`);
});


// Зачётно-экзаменационная ведомость

app.post("/api/create-dogovor4", (req, res) => {
  const obj = req.body;
  
  const {arr, num, name, lastDate} = obj;

  const content = fs.readFileSync(
    path.resolve(__dirname, "dogovor4.docx"),
    "binary"
 );

 const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });


  doc.render({
    courseUsers: (scope) => {
        return scope.fullname;
    },
    num: num,
    name: name,
    lastDate: lastDate,
    arr: arr,
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, `resDogovor4.docx`), buf);

res.send(Promise.resolve());

});


app.get("/api/create-dogovor4", (req, res) => {
  res.sendFile(`${__dirname}/resDogovor4.docx`);
});


// Журнал направлений 

app.post("/api/create-dogovor5", (req, res) => {
  const obj = req.body;
  
  const {arr, num, name, date} = obj;

  const content = fs.readFileSync(
    path.resolve(__dirname, "dogovor5.docx"),
    "binary"
 );

 const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });


  doc.render({
    courseOrgans: (scope) => {
        return scope.organ;
    },
    courseColvo: (scope) => {
      return scope.colvo;
  },
  courseNum: (scope) => {
    return scope.numbers;
},
    num: num,
    name: name,
    date: date,
    arr: arr,
});

const buf = doc.getZip().generate({ type: "nodebuffer" });

fs.writeFileSync(path.resolve(__dirname, `resDogovor5.docx`), buf);

res.send(Promise.resolve());

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
