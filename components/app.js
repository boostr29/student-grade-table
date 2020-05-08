class App {
    constructor(gradeTable, pageHeader, gradeForm) {
        this.handleGetGradesError = this.handleGetGradesError.bind(this);
        this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
        this.gradeTable = gradeTable;
        this.pageHeader = pageHeader;
        this.gradeForm = gradeForm;
        this.createGrade = this.createGrade.bind(this);
        this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
        this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
        this.deleteGrade = this.deleteGrade.bind(this);
        this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
        this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this)
    }

    handleGetGradesError(error){
        console.log(error);
    }

    handleGetGradesSuccess(grades){
        this.gradeTable.updateGrades(grades);

        var gradeSum = 0;
        grades.forEach(data => {
            gradeSum += data.grade;
        });
        var gradeAverage = gradeSum / grades.length;

        this.pageHeader.updateAverage(gradeAverage.toFixed(2));
    }

    getGrades() {
        var gradesURL = "https://sgt.lfzprototypes.com/api/grades/"
        var requestPayload = {
            method: "GET",
            url: gradesURL,
            headers: { 
                "X-Access-Token":"skbKnIuo"
            }
        }
        $.ajax(requestPayload)
            .done(this.handleGetGradesSuccess)
            .fail(this.handleGetGradesError);
    }

    start() {
        this.getGrades();
        this.gradeForm.onSubmit(this.createGrade);
        this.gradeTable.onDeleteClick(this.deleteGrade);
    }

    createGrade(name, course, grade) {
        var createURL = "https://sgt.lfzprototypes.com/api/grades/"
        var postPayload = {
            method: "POST",
            url: createURL,
            dataType: "JSON",
            headers: {
                "X-Access-Token":"skbKnIuo"
            },
            data: {
                "name": name,
                "course": course,
                "grade" : grade
            }
        }
        $.ajax(postPayload)
            .done(this.handleCreateGradeSuccess)
            .fail(this.handleCreateGradeError);
    }

    handleCreateGradeError(error) {
        console.log(error);
    }

    handleCreateGradeSuccess() {
        this.getGrades();
    }

    deleteGrade(id) {
        console.log(id);
    }

    handleDeleteGradeError(error) {
        console.log(error);
    }

    handleDeleteGradeSuccess() {
        this.getGrades();
    }
}