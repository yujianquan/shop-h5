<template>
  <div :class="['slider',{active:deleteBtn}]">
    <div class="contant" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="oneself">
      <slot />
    </div>
    <div v-if="deleteBtn" class="removeBtn" @click="remove">
      删除
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component
export default class SliderComp extends Vue {

    startX:number = 0 
    
    endX:number = 0 

    deleteBtn:boolean = false

    oneself () {
        this.deleteBtn = false
    }
    //滑动开始
    touchStart (e: { touches: { clientX: number }[] }) {
        // 记录初始位置
        this.startX = e.touches[0].clientX
        console.log('touchStart')
        
    }
    //滑动结束
    touchEnd (e: { currentTarget: { parentElement: any }; changedTouches: { clientX: number }[] }) {
        // 记录结束位置
        this.endX = e.changedTouches[0].clientX
        // 左滑大于30距离删除出现
        if (!this.deleteBtn && this.startX - this.endX > 30) {
            this.deleteBtn = true
        }
        // 右滑
        if (this.deleteBtn && this.startX - this.endX < -30) {
            this.deleteBtn = false
        }
        
        this.startX = 0
        this.endX = 0
    }
    
    remove () {
        this.$emit('delete')
        this.deleteBtn = false
    }
}
</script>
<style lang="scss" scoped>
.slider{
    width: 100%;
    min-height: 50px;
    position: relative;
    transition: all 0.2s;
    transform: translate3d(0, 0, 0);
    .contant{
        width: 100%;
        position: relative;
    }

    &.active{
        transform: translate3d(-64px, 0, 0);
    }

    .removeBtn{
        width: 64px;
        height: 100%;
        background: #ff4949;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 22px;
        position: absolute;
        top: 0px;
        right: -64px;
        line-height: 103px;
        text-align: center;
        border-radius: 2px;
    }
}
</style>