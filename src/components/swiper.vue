<template>
  <div ref="swiper" class="swiper">
    <div class="imgBox" :style="{left:`-${leftVal}px`,transition:`${duretion}s`}">
      <img v-for="(item,index) in picList" :key="index" :src="item">
      <img :src="picList[0]" alt="">
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator"
@Component
export default class SwiperComp extends Vue {
    // 图片直接从京东上面拿得
    @Prop({default:() => [
        "//m11.360buyimg.com/babel/s1125x780_jfs/t20260713/116676/36/38683/145781/64b0a8e8Fd3e92cc4/c89dd9ea567f5e74.jpg!q70.dpg",
        "//m11.360buyimg.com/babel/s1125x780_jfs/t20260713/172444/23/38620/110264/64b11bbbF47fad627/522d44efad46559f.jpg!q70.dpg",
        "//m11.360buyimg.com/babel/s1125x780_jfs/t20260718/219450/24/34499/135975/64b79d7eF1648f3a7/8f83f216ee0191c9.jpg!q70.dpg",
        "//m11.360buyimg.com/babel/s1125x780_jfs/t20260713/222212/39/32297/131214/64b0ab30F9a3a8ef6/9856d0609b7abdd9.jpg!q70.dpg",
        "//m11.360buyimg.com/babel/s1125x780_jfs/t20260718/141881/29/34447/178394/64b7b454F3f884ba6/7d0973a586d3b100.jpg!q70.dpg"
    ]
    }) readonly picList: any

    leftVal:number = 0 // 轮播图盒子的偏移值
    flag:boolean = true // 用来节流防止重复点击
    start:any = null // 自动执行下一张定的时器
    imgWidth:number = 0 // 在这里填写你需要的图片宽度
    duretion:number = 1.5 // 设置轮播图过度时间
    showIndex:number = 0 // 表示当前显示的图片索引

    mounted (){
        this.imgWidth = (this.$refs.swiper as any).offsetWidth

        this.run()
    }

    run (){
        this.start = setInterval(() => {
            this.runNextImage()
        }, this.duretion * 1000)
    }

    runNextImage (){
        if (this.leftVal == (this.picList.length - 1) * this.imgWidth) { // 判断显示的图片 是 最后一张时执行
            this.leftVal += this.imgWidth
            this.showIndex = 0
            this.duretion = 1.5
            this.$nextTick(() => {
                setTimeout(() => {
                    this.duretion = 0
                    this.leftVal = 0
                }, this.duretion * 1000)
            })
        } else { // 判断显示的图片 不是 最后一张时执行
            this.duretion = 1.5
            this.leftVal += this.imgWidth
            this.showIndex++
        }

    }
}
</script>
<style scoped lang='scss'>
.swiper {
    position: relative;
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;

    .imgBox {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: flex-start;

        img {
            flex-shrink: 0;
            width: 100%;
            height: 200px;
        }
    }
}
		
</style>