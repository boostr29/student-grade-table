class GradeTable {
    constructor(tableElement) {
        this.tableElement = tableElement;
    }

    updateGrades(grades) {
        var tbody = this.tableElement.children("tbody");
        tbody.empty()
        grades.forEach(data => {
            var $row = $("<tr>");
            var $name = $("<td>", {text: data.name});
            var $course = $("<td>", {text: data.course});
            var $grade = $("<td>", {text: data.grade});
            tbody.append($row, $name, $course, $grade);
        });
    }
}