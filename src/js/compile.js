// new compile(el,vm) 分析元素  获取vue实例
class Compile {
    constructor(el, vm) {
        // 遍历的宿主节点
        this.$el = document.querySelector(el);
        this.$vm = vm;
        // 编译
        if (this.$el) {
            // 减少DOM操作，提取片段
            this.$fragment = this.node2Fragment(this.$el);
            // 执行编译
            this.compile(this.$fragment);
            // 编译后，替换后的html结果追加至$el中
            this.$el.appendChild(this.$fragment);
        }
    };

    //  提取片段操作
    node2Fragment(el) {
        // 创建一个新的空白的文档片段
        const frag = document.createDocumentFragment();
        // 将el子元素移动至frag文档片段中;el循环减少
        let child;
        while (el.firstChild) {
            child = el.firstChild;
            frag.appendChild(child);
        }
        return frag;
    };

    // 进行编译，为画面属性赋值
    compile(fragment) {
        const childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(node => {
            // 判断node类型
            // 文本类型
            if (this.isInterpolation(node)) {
                // console.log(`编译文本${node.nodeName}`)
                // 编译插值文本
                this.commpileText(node)
            }

            // 元素类型
            else if (this.isElement(node)) {
                // console.log(`编译元素${node.nodeName}`)
            }

            //  递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    };

    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
    isElement(node) {
        return node.nodeType === 1;
    }

    // 编译插值文本的更新
    commpileText(node) {
        this.update(node, this.$vm, RegExp.$1, 'text')
    }

    // 更新指令
    // node : 宿主节点。vm,vue实例。 exp表达式。指令：text、html
    update(node, vm, exp, dir) {
        const updaterFun = this[dir + 'Updater'];
        // 初始化
        updaterFun && updaterFun(node, vm[exp]);
        // 依赖收集
        new Watcher(vm, exp, function (newVal) {
            updaterFun && updaterFun(node, newVal)
        });
    }

    textUpdater(node, value) {
        node.textContent = value;
    }
}