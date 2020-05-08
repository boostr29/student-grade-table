class PageHeader {
    constructor(headerElement) {
        this.headerElement = headerElement;
    }

    updateAverage(newAverage) {
        var $average = $(this.headerElement).find(".average-grade");
        $average.text(newAverage);
    }
}