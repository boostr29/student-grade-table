class GradeTable {
    constructor(tableElement, noGradesElement) {
        this.tableElement = tableElement;
        this.noGradesElement = noGradesElement;
    }

    updateGrades(grades) {
        grades.length > 0 ? this.noGradesElement.removeClass().addClass("d-none") : this.noGradesElement.removeClass().addClass("d-block");
        var tbody = this.tableElement.children("tbody");
        tbody.empty();
        grades.forEach(studentData => {
            var studentGrades = this.renderGradeRow(studentData, this.deleteGrade, this.pullData);
            tbody.append(studentGrades);
        });
    }

    onDeleteClick(deleteGrade) {
        this.deleteGrade = deleteGrade;
    }

    onPullClick(pullData) {
        this.pullData = pullData;
    }

    renderGradeRow(data, deleteGrade, pullData) {
        var $row = $("<tr>");
        var $name = $("<td>", {text: data.name, class:"align-middle"});
        var $course = $("<td>", {text: data.course, class:"align-middle"});
        var $grade = $("<td>", {text: data.grade, class:"align-middle"});
        var $operations = $("<td>", {class:"align-middle text-center"});
        var $editBtn = $("<i>", { class:"fas fa-edit pr-3", style:"color:green;", click: function() { pullData(data.name, data.course, data.grade, data.id) } });
        var $delBtn = $("<i>", { class:"fas fa-trash-alt", style:"color:red;", click: function() { deleteGrade(data.id) } });
        $operations.append($editBtn, $delBtn);
        $row.append($name, $course, $grade, $operations);
        return $row;
    }
}