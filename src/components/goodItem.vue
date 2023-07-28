<template>
  <div class="good-item" @click="plusGoodToCart">
    <img :src="info.pic" class="goods-pic" alt="" srcset="">
    <div class="des">
      {{ info.name }}
    </div>
    <div class="price">
      ￥{{ info.price }} / {{ info.unit }}
    </div>

    <div class="num">
      {{ info.stockNum }}
    </div>
    <div v-if="info.status === 'notSell' || info.stockNum <= 0" class="sold-out">
      <div class="status">
        {{ info.status === 'notSell' ? '已下架' : '已售罄' }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { GoodsInterface, SellStatus } from '@/util/interface'

import httpService from '@/service/httpService'

@Component({
    components: {
    }
})
export default class GoodItem extends Vue {

    @Prop({default:{}}) readonly info:GoodsInterface | any

    plusGoodToCart (){
        if (this.info.status === 'notSell' || this.info.stockNum <= 0){
            return
        }
        httpService({url:'plus', method:'post', params:{uid:this.info.uid}}).then(() => {
            this.info.stockNum --
        })
    }

}
</script>
<style lang="scss" scoped>
.good-item{
    background-color: #fff;
    border-radius: 6px;
    width: 48%;
    position: relative;
    margin-top:  10px;
    border-radius: 6px;
    padding: 5px;
    box-sizing: border-box;
    user-select:none;

    .goods-pic{
        width: 100%;
        max-height: 200px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .num{
        position: absolute;
        top: 0px;
        right: 0px;
        background-color: rgba($color: #1bbe88, $alpha: 0.1);
        width: 50px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        border-top-right-radius: 6px;
        border-bottom-left-radius: 6px;
        color: #348f27;
    }

    .des{
        padding: 0 10px;
    }

    .price{
        padding: 0 10px;
        font-size: 14px;
        color: red;
    }

    .sold-out{
        background-color: rgba($color: #000000, $alpha: 0.2);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;

        .status{
            width: 100px;
            height: 100px;
            border: 2px solid #eee;
            font-size: 24px;
            line-height: 100px;
            text-align: center;
            border-radius: 50%;
            font-weight: bold;
            color: #eee;
            transform: rotateZ(-45deg);
        }
    }
}
</style>