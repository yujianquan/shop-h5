<template>
  <div v-show="isShow" class="mask">        
    <div class="loading" />         
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator"
@Component({
    components: {}
})
export default class LoadingComp extends Vue {
    isShow:boolean = false
}
</script>
<style lang="scss" scoped>
@keyframes rotate {
  0%{
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.mask{
  position: fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background-color: rgba(0,0,0,.2);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading{
    width: 30px;
    height: 30px;
    border: 2px solid rgb(131, 31, 224);
    border-radius: 21px;
    border-left-color:transparent;
    animation: rotate 500ms infinite;
  }
}
</style> 