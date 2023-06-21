exports.getHata404=(req,res,next) => {
     res.render('notFoundPage', {
         sayfaBasligi:'Sayfa Bulunamıyor',
         yol:'unknown'
     });
 
 }