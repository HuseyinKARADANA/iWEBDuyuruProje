require('dotenv').config();
const http=require('http');
const express=require('express');
const path = require("path");
const rootDir = require("./util/path");
const bodyParser = require("body-parser");
const fs = require('fs');
const PDFDocument = require('pdfkit');
const session=require("express-session");
const MongoDBStore=require("connect-mongodb-session")(session);
const csurf=require('csurf');
const bcrypt = require('bcryptjs');
const csurfKoruma=csurf();

const MONGODB_URI="mongodb+srv://huseyinkaradana35:1234@cluster1.vgyj7y8.mongodb.net/";



const mongoose = require("mongoose");
const app=express();
app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection:'sessions'
  });
  const hataController = require("./controllers/hata");
const yoneticiVerisi = require("./routes/yonetici");
const publicRoutes = require("./routes/public"); // .js kullanmıyoruz.
const yetkiRoutes = require("./routes/yetki");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

app.use(session({secret:'gizli sifrem', resave:false, saveUnitialized:false, store:store}));



app.use(csurfKoruma);

app.use((req,res,next) => {
  res.locals.yonetici=req.session.oturum_acildi;
  res.locals.csrfToken=req.csrfToken();
  next();
})

app.use(yoneticiVerisi.routes);
app.use(publicRoutes);
app.use(yetkiRoutes);
app.use(hataController.getHata404);
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });