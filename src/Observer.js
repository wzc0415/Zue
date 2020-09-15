import Dep from './Dep.js';

export class Observer {
    constructor(value) {
        this.value = value;
        this._bind(value);
    }

    _bind(data) {
        Object.keys(data).forEach(key => {
                defineProperty(data, key, data[key])
            }
        );
    }
}

function defineProperty(obj, key, value) {
    const dep = new Dep();
    // 给当前属性的值添加监听
    // let ob = Observer(obj);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log(`${key}属性被读取了`);
            // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
            // target指向一个Watcher实例，每个Watcher都是一个订阅者
            // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
            if (Dep.target) {
                // dep.depend();
                dep.listen(Dep.target)
            }
            return value;
        },
        set(newValue) {
            if (newValue === value) return void 0;
            console.log(`${key}属性被修改了:新值:${newValue}`);
            value = newValue;
            // 对新值进行监听
            // ob = observer(newValue);
            // 通知所有订阅者，数值被改变了
            dep.notify();
        }
    })
}

// function observer(obj) {
//     if (!obj || typeof obj === 'object') {
//         return void 0;
//     }
//     return new Observer(obj);
// }
export default Observer;
