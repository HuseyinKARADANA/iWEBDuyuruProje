const Duyuru = require("../models/duyuru");
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.getDuyuru = (req, res, next) => {
  Duyuru.find().sort({ _id: -1 })
    .then((Duyuru) => {
      res.render("index", {
        sayfaBasligi: "Duyuru Sistemi",
        duyurular: Duyuru,
        yol: "/index"
      
      });
    })
    .catch((err) => {
      console.log(err);
    });
};



exports.getDuyuruEkle = (req, res, next) => {
  res.render("duyuru-ekle", {
    sayfaBasligi: "Duyuru Sistemi",
    
    yol: "/duyuru-ekle"
  
  });
};


exports.postDuyuruEkle = (req, res, next) => {
  const duyuru_Adi = req.body.duyuru_Adi;
  const duyuru = req.body.duyuru;
  const baslangicTarihi = req.body.baslangicTarihi;
  const bitisTarihi = req.body.bitisTarihi;
  

  const duyurular = new Duyuru({
    duyuru_Adi: duyuru_Adi,
    duyuru: duyuru,
    baslangicTarihi: baslangicTarihi,
    bitisTarihi: bitisTarihi,
    
  });

  duyurular
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};



exports.postSilId = (req, res, next) => {
  const duyuruId = req.body.duyuruId;
  console.log(duyuruId);
  Duyuru.findByIdAndRemove(duyuruId)
    .then((result) => {
      console.log("Duyuru Silindi");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.indirPDF = (req, res, next) => {
  Duyuru.find().sort({ _id: -1 })
    .then((duyurular) => {
      const doc = new PDFDocument();
      const filePath = 'C:\\Users\\huseyinkaradana\\Desktop\\duyurular.pdf';
      
      doc.pipe(fs.createWriteStream(filePath));

      duyurular.forEach((duyuru, index) => {
        
        doc.text(`Duyuru ${index + 1}`);
        doc.text('-------------------');
        doc.text(`Duyuru Adı: ${duyuru.duyuru_Adi}`);
        doc.text(`Duyuru Metni: ${duyuru.duyuru}`);
        doc.text(`Baslangic Tarihi: ${duyuru.baslangicTarihi}`);
        doc.text(`Duyuru Bitis Tarihi:${duyuru.bitisTarihi}`);
        doc.text('.');
        doc.text('.');
        doc.font('Times-Roman').fontSize(12);
      });

      doc.end();

      res.download(filePath, 'duyurular.pdf', (err) => {
        if (err) {
          console.log(err);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
};