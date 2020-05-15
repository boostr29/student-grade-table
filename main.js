var cachedGrades = new CachedGrades();

var $form = $("form");
var $buttons = $(".form-button");
var $cancel = $(".form-cancel");
var $formTitle = $(".form-title");
var $errorBox = $(".error-message");
var gradeForm = new GradeForm($form, $buttons, $cancel, $formTitle, $errorBox);

var $table = $(".table");
var $emptyTable = $(".no-grades");
var gradeTable = new GradeTable($table, $emptyTable);

var $header = $("header");
var pageHeader = new PageHeader($header);

var app = new App(gradeTable, pageHeader, gradeForm, cachedGrades);
app.start();