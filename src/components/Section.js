class Section {
    constructor({renderer}, containerSelector) {

        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }

    render = (items) => {
        items.forEach((item) => {
            this._renderer(item);
        });
    };

    addItem = (item) => {
        console.log(item);
        this._container.prepend(item);
    };
}

export default Section;
