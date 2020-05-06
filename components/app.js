class App {
    constructor(gradeTable) {
        this.handleGetGradesError = this.handleGetGradesError.bind(this);
        this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
        this.gradeTable = new GradeTable();
    }

    handleGetGradesError(error){
        console.log(error);
    }

    handleGetGradesSuccess(grades){
        this.gradeTable.updateGrades(grades);
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
    }
}