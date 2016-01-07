var express = require('express');
var app = express();
var path = require("path");
var ejs = require("ejs");

app.set('views','docs');
app.engine('html', ejs.renderFile);
app.set('view engine','html');
app.use(express.static(__dirname));


app.get('/started', function (req, res) {
    res.render('docs_started')
});
app.get('/css', function (req, res) {
    res.render('docs_css')
});
app.get('/component', function (req, res) {
    res.render('docs_component')
});
app.get('/template', function (req, res) {
    res.render('docs_template')
});
app.get('/view', function (req, res) {
    res.render('view_index')
});


app.listen(8006,function(){
    console.log('Collie-UI is listening at port 8006.')
});