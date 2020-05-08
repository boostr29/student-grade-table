class GradeTable {
    constructor(tableElement, noGradesElement) {
        this.tableElement = tableElement;
        this.noGradesElement = noGradesElement;
    }

    updateGrades(grades) {
        grades ? true : this.noGradesElement.removeClass().addClass("d-block");
        var tbody = this.tableElement.children("tbody");
        tbody.empty();
        grades.forEach(studentData => {
            var studentGrades = this.renderGradeRow(studentData, this.deleteGrade);
            tbody.append(studentGrades);
        });
    }

    onDeleteClick(deleteGrade) {
        this.deleteGrade = deleteGrade;
    }

    renderGradeRow(data, deleteGrade) {
        var $row = $("<tr>");
        var $name = $("<td>", {text: data.name});
        var $course = $("<td>", {text: data.course});
        var $grade = $("<td>", {text: data.grade});
        var $delete = $("<td>");
        var $delBtn = $("<button>", { class:"btn btn-danger", text:"DELETE", click: deleteGrade });
        $delete.append($delBtn);
        $row.append($name, $course, $grade, $delete);
        return $row;
    }
}