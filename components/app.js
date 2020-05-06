class App {
    constructor() {
        this.handleGetGradesError = this.handleGetGradesError.bind(this);
        this.handleGetGradesSucccess = this.handleGetGradesSucccess.bind(this);
    }

    handleGetGradesError(error){
        console.log(error);
    }

    handleGetGradesSucccess(grades){
        console.log(grades)
    }
}