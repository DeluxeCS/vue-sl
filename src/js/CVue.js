// new CVue({data:{...}})

class CVue {
    // 构造函数接收配置对象
    constructor(options) {
        // 缓存options其他类用得到
        this.$options = options;
        // 数据响应化
        this.$data = options.data;
        // 对data进行遍历，逐个设置get/set
        // 观察函数，监听函数
        this.observe(this.$data);

        // 模拟watcher
        new Watcher();
        this.$data.test;
        new Watcher();
        this.$data.foo.batchch;
    }

    observe(val) {
        // 确定val存在性、是否为object
        if (!val || typeof val !== 'object') {
            return;
        }
        // 遍历该对象
        Object.keys(val).forEach(key => {
            this.defineReactive(val, key, val[key]);
        });
    }
    // 数据响应化函数
    defineReactive(obj, key, val) {
        // 递归数据嵌套
        this.observe(val);

        // 初始化dep
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            get: function () {
                // 假设向test中添加target依赖
                Dep.target && dep.addDep(Dep.target);
                return val;
            },
            set: function (newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // console.log(`${key}发生变化,更新${val}`)
                // 通知watcher进行更新
                dep.notify();
            }
        })
    }
}
class Dep {
    constructor() {
        // 用于存放画面对应依赖属性(watcher)
        this.deps = [];
    }

    //收集依赖向Dep中添加
    addDep(dep) {
        this.deps.push(dep);
    }

    //通知依赖
    notify() {
        this.deps.forEach(dep => {
            dep.update();
        })
    }

}

// 实现更新依赖
class Watcher {
    constructor() {
        // 将当前watcher实例指定到Dep的静态属性target
        // 当新的watch产生，即覆盖掉
        Dep.target = this;
    }

    update() {
        console.log('属性更新成功！');
    }
}