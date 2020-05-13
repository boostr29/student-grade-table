class CachedGrades {
    constructor(grades) {
        this.grades = grades;
        this.localTable = [];
    }

    storeGrades(grades) {
        this.localTable = grades;
    }

    updateCachedGrade(grade) {
        var resultIndex = this.localTable.findIndex(x => x.id === grade.id);
        this.localTable[resultIndex] = grade;
    }

    deleteCachedGrade(id) {
        var resultIndex = this.localTable.findIndex(x => x.id === id);
        this.localTable.splice(resultIndex, 1);
    }
}