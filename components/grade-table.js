class GradeTable {
    constructor(tableElement) {
        this.tableElement = tableElement;
    }

    updateGrades(grades) {
        var tbody = this.tableElement.children("tbody");
        var $tr = $("<tr>");
        var $id = $("<td>", {text: grades[0].id});
        var $id = $("<td>", {text: grades[0].first});
        var $id = $("<td>", {text: grades[0].id});

        $tr.append($id);
        tbody.empty().append($tr);
        console.log(grades);
    }
}