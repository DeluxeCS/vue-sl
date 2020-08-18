// new compile(el,vm)
class compile {
    constructor(el, vm) {
        // 遍历的宿主节点
        this.$el = document.querySelector(el);
        this.$vm = vm;
    }
}