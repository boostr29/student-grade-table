var $table = $(".table");
var gradeTable = new GradeTable($table);

var $header = $("header");
console.log($header);

var app = new App(gradeTable);
app.start();