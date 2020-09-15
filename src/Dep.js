class Dep {
    // static target = null;
    constructor() {
        this.depIds = {};
        this.subs = []; //订阅者
    }

    depend() {
        Dep.target.addDep(this);//相当于调用this.addSubs 将 watcher实例添加进订阅列表 等待通知更新
        //本来按照我们的理解，在denpend里面是需要将watcher添加进 Dep对象， 等待通知更新的，所以应该调用 this.addSubs(Dep.target)
        //但是由于需要解耦 所以 先调用 watcher的addDep 在addDep中调用Dep实例的addSubs
        //简化理解就是 将 watcher实例添加进订阅列表 等待通知更新
    }

    listen(sub) {
        this.subs.push(sub)
    }

    notify() {
        this.subs.forEach(sub => sub.update())
    }
}
Dep.prototype.target = null;
export default Dep;
