import {Component, createElement} from './framework';

class Carousel extends Component {
    constructor () {
        super();
        this.attributes = Object.create(null);
    }
    setAttribute (name, value) {
        this.attributes[name] = value;
    }
    appendTo (parent) {
        parent.appendChild(this.render())
    }
    render () {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        for (let value of this.attributes['src']) {
            let child = document.createElement('div');
            child.style.backgroundImage = `url('${value}')`;
            this.root.appendChild(child);
        }

        let position = 0;
        this.root.addEventListener('mousedown', (event) => {
            let children = this.root.children;
            let startX = event.clientX;
            let move = (event) => {
                let x = event.clientX - startX;

                let current = position - (x - x % 400) / 400;

                for (let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = 'none';
                    children[pos].style.transform = `translateX(${ - pos * 400 + offset * 400 + x % 400}px)`;
                }
            };
            let up = (event) => {
                let x = event.clientX - startX;
                position = position - Math.round(x / 400);

                let current = position - (x - x % 400) / 400;
                for (let offset of [0, - Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = '';
                    children[pos].style.transform = `translateX(${ - pos * 400 + offset * 400}px)`;
                }
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            };

            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        });
        /*
        let currentIndex = 0;
        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (currentIndex + 1)  % children.length;

            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = 'none';
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

            setTimeout(() => {
                next.style.transition = '';
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
                next.style.transform = `translateX(${- nextIndex * 100}%)`;
                currentIndex = nextIndex;
            }, 16);
        }, 3000);
         */
        return this.root;
    }
}


let imgs = [
    './imgs/img1.jpg',
    './imgs/img2.jpg',
    './imgs/img3.jpg',
];
let a = <Carousel src={imgs}/>;
a.appendTo(document.body);
