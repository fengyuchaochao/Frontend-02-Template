export function createElement (type, attributes, ...children) {
    let element;
    if (typeof type === 'string') {
        element = new ElementWrapper(type);
    } else {
        element = new type();
    }
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    for (let child of children) {
        if (typeof child === 'string') {
            child = new TextWrapper(child);
        }
        element.appendChild(child);
    }
    return element;
}

export class Component {
    constructor () {
    }
    setAttribute (name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild (child) {
        child.appendTo(this.root);
    }
    appendTo (parent) {
        parent.appendChild(this.root);
    }
}

//将一个普通div元素转化成包含appendTo方法的自定义元素。
class ElementWrapper extends Component {
    constructor (type) {
        this.root = document.createElement(type);
    }
}

class TextWrapper extends Component {
    constructor (text) {
        this.root = document.createTextNode(text);
    }
}
