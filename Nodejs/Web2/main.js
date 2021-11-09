var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
  
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
        ${list}
        ${body}
  </body>
  </html>
  `;
}
function listTemplateHTML(files){
  var list = '<ul>';
  var i =0;
  while(i<files.length){
    list+=`<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
    i=i+1;
  }
  list +='</ul>';

  return list;
}
var app = http.createServer(function(request,response){

    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;
    
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data',(err, files)=>{
          var title = 'Welcome';
          var desc = 'Hello Node JS';
          var list = listTemplateHTML(files);
          var template = templateHTML(title,list,`<h2>${title}</h2>${desc}`);
          response.writeHead(200);
          response.end(template);
        })
          
      }else{
        fs.readdir('./data',(err, files)=>{
          var list = listTemplateHTML(files);
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err,desc){
            var title = queryData.id;
            var template = templateHTML(title,list,`<h2>${title}</h2>${desc}`);
            response.writeHead(200);
            response.end(template);
            });
        });
      }
    }else{
      response.writeHead(404); //다른 주소창을 넣었을때 에러가 나오게 해준다.
      response.end('Not Found');
    }

});
app.listen(3000);