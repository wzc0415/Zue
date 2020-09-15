import Dep from './Dep';
class Watch{
    constructor(node,name,vm) {
        this.node = node;
        this.name = name;
        this.vm = vm;
        Dep.target = this;
        this.update()
        Dep.target = null;
    }
    update(){
        this.node.nodeValue = this.vm[this.name];
    }
}
export default Watch
