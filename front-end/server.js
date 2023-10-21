var http = require("http");
var fs = require('fs');
var url = require("url");
var mime = require('mime');
//var querystring = require("querystring");

var server = http.createServer(function (req, res) {

    var parsedUrl = url.parse(req.url);
    //console.log(parsedUrl);

    var resource = parsedUrl.pathname;
    console.log(`resource path=${resource}`);

    const main = fs.readFileSync('./static/main.html');
    const main2 = fs.readFileSync('./static/main2.html');
    const style = fs.readFileSync('./static/style.css');
    const style2 = fs.readFileSync('./static/style2.css');
    const script = fs.readFileSync('./static/script.js');
    const script2 = fs.readFileSync('./static/script2.js');

    if (resource == '/main'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(main);
    }
    else if (resource == '/style.css'){
        res.writeHead(200, { 'Content-Type': 'text/css'});
        res.end(style);
    }
    else if (resource == '/style2.css'){
        res.writeHead(200, { 'Content-Type': 'text/css'});
        res.end(style2);
    }
    else if (resource == '/script.js'){
        res.writeHead(200, {'Content-Type':'text/javascript'});
        res.end(script);
    }
    else if (resource == '/script2.js'){
        res.writeHead(200, {'Content-Type':'text/javascript'});
        res.end(script2);
    }
    else if (resource == '/main2'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(main2);
    }
    else if (resource.startsWith('/images/')){
        var imgPath = resource.substring(1);
        //console.log(`imgPath = ${imgPath}`);
        var imgMime = mime.getType(imgPath);
        //console.log(`mime = ${imgMime}`);

        const data = fs.readFileSync('./static/'+imgPath);
        res.writeHead(200, {'Content-Type':imgMime});
        res.end(data);
    }
    else if (resource.startsWith('/icons/')){
        var iconPath = resource.substring(1);
        console.log(`iconPath = ${iconPath}`);
        var iconMime = mime.getType(iconPath);
        console.log(`mime = ${iconMime}`);

        const icon = fs.readFileSync('./static/'+iconPath);
        res.writeHead(200, {'Content-Type':iconMime});
        res.end(icon);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Page Not Found');
    }

    //var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
    //console.log(parsedQuery);

    //console.log('--- log end ---');

    //res.writeHead(200,{'Content-Type':'text/html'});
    //res.end(`success : var1의 값은 ${parsedQuery.var1}`);
});

let port = 8080;

server.listen(port, function () {
    console.log(`Server is running... port:${port}`);
});