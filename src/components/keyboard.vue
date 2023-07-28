<template>
  <div v-if="visible" class="key-board">
    <div class="mask" @click="cancle" />       
    <div class="board-show">
      <div class="board-head">
        <div class="number-content">
          {{ num }}
        </div>
        <div class="clear" @click="clear">
          x
        </div>
      </div>
      <div class="board-content">
        <div v-for="(n) in 9" :key="n" class="number-list" @click="choose(n)">
          {{ n }}
        </div>
        <div class="number-list" @click="cancle">
          取消
        </div>
        <div class="number-list" @click="choose(0)">
          0
        </div>
        <div class="number-list" @click="confirm">
          确定
        </div>
      </div>
    </div>  
  </div>
</template>
<script lang='ts'>
import { Component, Vue, VModel, Prop, Watch } from "vue-property-decorator"
@Component({
    components: {}
})
export default class KeyBoard extends Vue {
    @VModel({ default:false }) visible: boolean|undefined

    @Prop() number:number|string = 0

    num:string = ''

    @Watch('visible')
    visibleChange (){
        this.num = this.number + ''
    }

    created (){
        this.num = this.number + ''
    }

    cancle (){
        this.visible = false
    }

    clear (){
        this.num = ''
    }

    choose (n:string){
        this.num = this.num + n
    }

    confirm (){
        if (+this.num && +this.num < 10){
            alert('起订数量为10')
            return
        }
        if (this.num){
            this.$emit('confirm', this.num)
        }
        this.visible = false
    }
}
</script>

<style lang="scss" scoped>
.key-board{
    position: fixed;
    z-index: 1000;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
}
.mask{
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background-color: rgba(0,0,0,.7);
}

.board-show{
    width: 100%;
    height: 297px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;

    .board-head{
        height: 50px;
        font-size: 14px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
    }

    .board-content{
        background-color: #fff;
        z-index: 111;
        display: grid;
        grid-template-columns: 33.33% 33.33% 33.33%;
        grid-template-rows: 25% 25% 25% 25%;
    }

    .number-list{
        border:1px solid #e8e8e8;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;

        &:active{
            background-color: rgb(224, 224, 224);
        }
    }
}
</style>