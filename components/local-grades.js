class GetLocalGrades {
    constructor(grades) {
        this.grades = grades;
        this.localTable = [];
    }

    storeGrades(grades) {
        this.localTable = grades;
        console.log(this.localTable);
    }

    updateGrades(grade) {
        if (this.localTable.id = grade) {
            console.log(grade);
        }
    }

}