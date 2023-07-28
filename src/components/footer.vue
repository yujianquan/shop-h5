<template>
  <div class="footer">
    <div v-for="route in routeConfig" :key="route.path" :class="['footer-item',{active:active === route.path}]" @click="routeTo(route.name)">
      <span>{{ route.meta.title }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import { routes } from '@/router/index'

@Component({
    components: {
    }
})
export default class Footer extends Vue {
    routeConfig:Array<any> = []
    // 只有两个路由，暂时就不写太复杂了
    active:string = '/home'

    @Watch("$route.path")
    $routeChange (val: any) {
        this.calcCurrentActive(val)
    }

    calcCurrentActive (val:string){
        this.active = val
    }

    routeTo (type:string){
        this.$router.push(type)
    }

    created (){
        this.routeConfig = routes.filter((r:any) => {
            // eslint-disable-next-line no-prototype-builtins
            if (r.hasOwnProperty('meta')){
                return r?.meta.isFooter
            }
        })
        this.calcCurrentActive(this.routeConfig[0].path)
    }

}
</script>
<style lang="scss" scoped>
.footer{
    height: var(--footer-height);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    right: 0;
    border-top: 1px solid #eee;

    .footer-item{
        width: 50%;
        text-align: center;
        line-height: var(--footer-height);

        &.active{
            color: #0ecc30;
        }
    }
}
</style>