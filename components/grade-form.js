class GradeForm {
    constructor(formElement, buttonElement, cancelElement, formTitle, errorBox) {
        this.formElement = formElement;
        this.buttonElement = buttonElement;
        this.cancelElement = cancelElement;
        this.formTitle = formTitle;
        this.errorBox = errorBox;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.formElement.submit(this.handleSubmit);
    }

    showButtons() {
        this.renderAddButton();
        this.renderCancelButton();
    }

    renderAddButton() {
        var $addButton = $("<button>", {class: "btn btn-success add-btn", text: "Add", type: "submit"});
        this.buttonElement.empty().append($addButton);
        this.formTitle.empty().text("Add Grade");
    }

    renderUpdateButton() {
        var $updateButton = $("<button>", {class: "btn btn-success update-btn", text: "Update", type: "submit"});
        this.buttonElement.empty().append($updateButton);
        this.formTitle.empty().text("Add Grade");
    }

    renderCancelButton() {
        var $cancelButton = $("<button>", {class: "btn btn-outline-success cancel-btn", text: "Cancel", type:"reset", click: this.handleCancelClick});
        this.cancelElement.empty().append($cancelButton);
    }

    onSubmit(createGrade) {
        this.createGrade = createGrade;
    }

    onUpdate(updateGrade) {
        this.updateGrade = updateGrade;
    }

    updateForm(name, course, grade, id) {
        this.renderUpdateButton();
        this.formTitle.empty().text("Update Grade");
        this.formElement.find("#student-name").val(name);
        this.formElement.find("#student-course").val(course);
        this.formElement.find("#student-grade").val(grade);
        this.formElement.find("#student-id").val(id);
    }

    resetForm() {
        this.formElement.trigger("reset");
    }

    handleSubmit(event) {
        event.preventDefault();
        var form = new FormData(event.target);
        var studentName = form.get("name");
        var studentCourse = form.get("course");
        var studentGrade = form.get("grade");
        var studentId = form.get("student-id");

        var clicked = this.formElement.find("button").click(event.target.id);
        if (clicked.hasClass("update-btn")) {
            this.updateGrade(studentName, studentCourse, studentGrade, studentId);
        } else {
            this.createGrade(studentName, studentCourse, studentGrade);
        }
    }

    handleCancelClick() {
        this.renderAddButton();
    }

    handleError(error) {
        var errors = JSON.parse(error.responseText).errors;
        var errorModal = this.errorBox.find(".error-list").empty()
        errors.forEach(errorMessage => {
            var $error = $("<div>", {text: errorMessage, class: "alert alert-danger" });
            errorModal.append($error);
        });
        this.errorBox.modal("show");
    }
}