class App {
    constructor(gradeTable) {
        this.handleGetGradesError = this.handleGetGradesError.bind(this);
        this.handleGetGradesSucccess = this.handleGetGradesSucccess.bind(this);
        this.gradeTable = new GradeTable();
    }

    handleGetGradesError(error){
        console.log(error);
    }

    handleGetGradesSucccess(grades){
        console.log(grades)
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
            .done(this.handleGetGradesSucccess)
            .fail(this.handleGetGradesError);
    }

    start() {
        this.getGrades();
    }
}