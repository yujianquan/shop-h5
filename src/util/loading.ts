import LoadingComp from '@/components/loading.vue'

const $loading = {
    install: (Vue:any) => {
        const LoadingComponent = Vue.extend(LoadingComp)
        const vm = new LoadingComponent()
        const tpl = vm.$mount().$el
        document.body.appendChild(tpl)
        Vue.prototype.$showLoading = () => {
            vm.isShow = true
        }
        Vue.prototype.$hideLoading = () => {
            vm.isShow = false
        }
    }
}
export default $loading