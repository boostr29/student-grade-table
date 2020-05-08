var $form = $("form");
var gradeForm = new GradeForm($form);

var $table = $(".table");
var $emptyTable = $(".no-grades");
var gradeTable = new GradeTable($table, $emptyTable);

var $header = $("header");
var pageHeader = new PageHeader($header);

var app = new App(gradeTable, pageHeader, gradeForm);
app.start();