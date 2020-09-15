import Watch from "./watch";

const reg = /\{\{(.*)\}\}/;

class Complier {
    constructor(el, vm) {
        console.log(el, vm)
        this.el = document.querySelector(el);
        this.vm = vm;
        this.frag = this._createFragment();
        this.el.appendChild(this.frag);
    }

    _createFragment() {
        let frag = document.createDocumentFragment()
        let child;
        while (child = this.el.firstChild) {
            this._complie(child);
            frag.appendChild(child);
        }
        return frag
    }

    _complie(node) {
        if (node.nodeType === 1) {
            console.log(node)
            let attrs = node.attributes;
            let model = attrs.getNamedItem('z-model');
            if (model) {
                console.log(model.value);
                if (this.vm[model.value] === void 0) {
                    throw Error(`z-model绑定的属性在VM中不存在`)
                    return void 0;
                }
                node.addEventListener('input', (e) => {
                    this.vm[model.value] = e.target.value;
                })
                node.value = this.vm[model.value]
            }
        }
        if (node.nodeType === 3) {
            if (reg.test(node.nodeValue)) {
                var name = RegExp.$1;
                console.log(name);
                name = name.trim();
                new Watch(node, name, this.vm)
            }
        }

    }
}

export default Complier
