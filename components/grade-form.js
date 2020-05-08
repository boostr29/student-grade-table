class GradeForm {
    constructor(formElement) {
        this.formElement = formElement;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formElement.submit(this.handleSubmit);
    }

    onSubmit(createGrade) {
        this.createGrade = createGrade;
    }

    handleSubmit(event) {
        event.preventDefault();
        var form = new FormData(event.target);
        var studentName = form.get("name");
        var studentCourse = form.get("course");
        var studentGrade = form.get("grade");
        this.createGrade(studentName, studentCourse, studentGrade);
        event.target.reset();
    }
}