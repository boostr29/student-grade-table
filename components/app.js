class App {
    constructor(gradeTable, pageHeader, gradeForm, cachedGrades) {
        this.handleGetGradesError = this.handleGetGradesError.bind(this);
        this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
        this.gradeTable = gradeTable;
        this.pageHeader = pageHeader;
        this.gradeForm = gradeForm;
        this.cachedGrades = cachedGrades;
        this.createGrade = this.createGrade.bind(this);
        this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
        this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
        this.deleteGrade = this.deleteGrade.bind(this);
        this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
        this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this)
        this.pullData = this.pullData.bind(this);
        this.updateGrade = this.updateGrade.bind(this);
        this.handleUpdateGradeError = this.handleUpdateGradeError.bind(this);
        this.handleUpdateGradeSuccess = this.handleUpdateGradeSuccess.bind(this);
    }

    handleGetGradesError(error){
        console.log(error);
    }

    handleGetGradesSuccess(grades){
        this.gradeTable.updateGrades(grades);
        this.cachedGrades.storeGrades(grades);
        this.getGradeAverage(grades);
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

    getGradeAverage(grades) {
        var gradeSum = 0;
        grades.forEach(data => {
            gradeSum += data.grade;
        });
        if (gradeSum > 0) {
            var gradeAverage = gradeSum / grades.length;
            gradeAverage = Math.round((gradeAverage + Number.EPSILON) * 100) / 100
        } else { gradeAverage = 0 }
        this.pageHeader.updateAverage(gradeAverage);
    }

    start() {
        this.getGrades();
        this.gradeForm.onSubmit(this.createGrade);
        this.gradeForm.onUpdate(this.updateGrade);
        this.gradeTable.onDeleteClick(this.deleteGrade);
        this.gradeTable.onPullClick(this.pullData);
        this.gradeForm.showButtons();
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
        this.gradeForm.handleError(error);
    }

    handleCreateGradeSuccess(grade) {
        this.gradeForm.resetForm();
        this.cachedGrades.createCachedGrade(grade);
        this.gradeTable.updateGrades(this.cachedGrades.localTable);
    }

    deleteGrade(id) {
        this.deleteGradeId = id;
        var deleteURL = "https://sgt.lfzprototypes.com/api/grades/" + id;
        var delPayload = {
            method: "DELETE",
            url: deleteURL,
            dataType: "JSON",
            headers: {
                "X-Access-Token":"skbKnIuo"
            }
        }
        $.ajax(delPayload)
            .done(this.handleDeleteGradeSuccess)
            .fail(this.handleDeleteGradeError);
    }

    handleDeleteGradeError(error) {
        console.log(error);
    }

    handleDeleteGradeSuccess() {
        this.cachedGrades.deleteCachedGrade(this.deleteGradeId);
        this.gradeTable.updateGrades(this.cachedGrades.localTable);
        this.getGradeAverage(this.cachedGrades.localTable);
    }

    pullData(name, course, grade, id) {
        this.gradeForm.updateForm(name, course, grade, id);
    }
    
    updateGrade(name, course, grade, id) {
        var updateURL = "https://sgt.lfzprototypes.com/api/grades/" + id;
        var updatePayload = {
            method: "PATCH",
            url: updateURL,
            dataType: "JSON",
            headers: {
                "X-Access-Token":"skbKnIuo"
            },
            data : {
                "name": name,
                "course": course,
                "grade" : grade
            }
        }
        $.ajax(updatePayload)
            .done(this.handleUpdateGradeSuccess)
            .fail(this.handleUpdateGradeError);
    }

    handleUpdateGradeSuccess(grade) {
        this.cachedGrades.updateCachedGrade(grade);
        this.gradeTable.updateGrades(this.cachedGrades.localTable);
        this.gradeForm.renderAddButton();
        this.gradeForm.resetForm();
        this.getGradeAverage(this.cachedGrades.localTable)
    }

    handleUpdateGradeError(error) {
        this.gradeForm.handleError(error);
    }
}