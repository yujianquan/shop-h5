import Vue from "vue"
import "lib-flexible"
import App from "./App.vue"
import router from "./router"
require('@/util/mock')

import $loading from "./util/loading"
Vue.use($loading)

Vue.config.productionTip = false

new Vue({
    router,
    render: (h) => h(App)
}).$mount("#app")
