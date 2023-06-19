const express = require('express');
const path=require('path');

const router=express.Router();

const rootDir=require('../util/path');


const duyuruController=require('../controllers/duyuru');

const yetkiKontrol = require('../util/yetkiKontrol');

router.get('/indir-pdf',duyuruController.indirPDF)  
router.post('/duyuru-sil',yetkiKontrol, duyuruController.postSilId);
router.get('/', duyuruController.getDuyuru);
 

module.exports=router;