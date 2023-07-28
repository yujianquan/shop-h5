<template>
  <div id="app">
    <router-view />
    <footer-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import FooterView from "./components/footer.vue"
@Component({
    components:{
        FooterView
    }
})
export default class App extends Vue{
    
}
</script>
<style lang="scss">
@import url('@/assets/css/index.scss');
</style>
