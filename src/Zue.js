import Complier from "./Complier";
import Observer from "./Observer";

class Zue {
    constructor(
        options = {}
    ) {
        try {
            this.$option = options;
            let data = (this._data = typeof this.$option.data == 'function' ? this.$option.data() : this.$option.data);
            console.log(data);
            Object.keys(data).forEach(key => this._proxy(key));
            new Observer(this._data)
            new Complier(options.el,this);
        }catch (e) {
            console.error(e);
        }

    }

    _proxy(key) {
        var self = this;
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get() {
                console.log(`${key}属性被读取了`);
                return self._data[key]
            },
            set(val) {
                console.log(`${key}属性被修改了:新值:${val}`);
                self._data[key] = val;
            }
        })
    }
}

export default Zue
