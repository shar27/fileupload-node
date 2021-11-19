const formidable = require('formidable');
const fs = require('fs')
const http = require('http');

http.createServer(function (request, response) {
  
  if (request.url == '/fileupload') {
  const form = new formidable.IncomingForm();
  form.parse(request, function (error, fields, files){
    const oldpath = files.filetoupload.filepath;
    const newpath = 'C:/Users/Owner/' + files.filetoupload.originalFilename;
    fs.rename(oldpath, newpath, function (error){
      if (error) throw error;
      response.write('file uploaded successfully')
      response.end();
    })
    
  });    
  } else {
  
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('<form action = "fileupload" method="post" enctype="multipart/form-data">');
  response.write('<input type= "file" name="filetoupload"><br>');
  response.write('<input type="submit">')
  response.write('</form>')
  response.end();
  }
}).listen(8080);

