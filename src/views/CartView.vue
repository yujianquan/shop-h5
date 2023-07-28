<template>
  <div class="cart-view">
    <div class="title">
      购物车
    </div>
    <div v-if="checkedList.length" class="op-delete" @click="deleteCheckedGoods">
      删除
    </div>
    <empty-comp v-if="!resultfulGoodList.length && !invilidGoodList.length" />
    <transition-group id="dragablelist" class="transition-wrapper" name="sort" tag="div">
      <div v-for="good in resultfulGoodList" :key="good.uid" class="result-item drag-item">
        <slider-comp @delete="handleDelete(good.uid)">
          <div class="item-content">
            <input v-model="checkedList" :value="good.uid" type="checkbox">
            <img :src="good.pic" class="pic" alt="" srcset="">
            <div class="info">
              <div class="name">
                {{ good.name }}
              </div>
              <div class="price">
                <span class="em">￥{{ good.price }}</span> / {{ good.unit }}
              </div>
            </div>
            <div class="item-op">
              <span class="op-uni" @click="decrese(good.uid)">-</span>
              <span class="op-input" @click="invokeKeyboard(good)">{{ good.number }}</span>
              <span class="op-uni" @click="plus(good.uid)">+</span>
            </div>
          </div>
        </slider-comp>
      </div>
    </transition-group>
    <template v-if="invilidGoodList.length">
      <div class="invalid-tips">
        <div class="invalid-dec">
          失效商品{{ invilidGoodList.length }}件
        </div>
        <div class="op-dec" @click="clearInvalidGoods">
          清空失效商品
        </div>
      </div>
      <div v-for="good in invilidGoodList" :key="good.uid" class="result-item invilid">
        <div class="item-content">
          <div class="status">
            {{ good.status === 'notSell' ? '下架' : '缺货' }}
          </div>
          <img :src="good.pic" class="pic" alt="" srcset="">
          <div class="info">
            <div class="name">
              {{ good.name }}
            </div>
            <div class="price">
              <span class="em">￥{{ good.price }}</span> / {{ good.unit }}
            </div>
          </div>
          <div class="item-op">
            <span class="op-uni">-</span>
            <span class="op-input">{{ good.number }}</span>
            <span class="op-uni">+</span>
          </div>
        </div>
      </div>
    </template>
    <div class="op-all">
      <input id="" v-model="checkAll" type="checkbox" name="全选">
      <div class="price-all">
        <div class="totol">
          合计：<span class="em">{{ totalPrice }}</span>
        </div>
        <div class="ex">
          已免运费
        </div>
      </div>
      <div class="btn-order">
        结算（{{ checkedList.length }}）
      </div>
    </div>
    <key-board v-if="opGood" v-model="keyboardShow" :number="opGood.number" @confirm="keyConfirm" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"
import httpService from '@/service/httpService'
import { GoodsInterface, SellStatus } from '@/util/interface'
import Sortable from 'sortablejs'
import { cloneDeep, remove } from 'lodash'

import SliderComp from "@/components/slider.vue"
import EmptyComp from "@/components/empty.vue"
import KeyBoard from "@/components/keyboard.vue"

@Component({
    components: {
        SliderComp,
        EmptyComp,
        KeyBoard
    }
})
export default class CartView extends Vue {

    goodList:Array<GoodsInterface> = []
    // 展示有效的商品
    resultfulGoodList:Array<GoodsInterface> = []
    // 过期的或者库存不足的商品
    invilidGoodList:Array<GoodsInterface> = []

    checkedList:Array<string> = []

    checkAll:boolean = false

    keyboardShow:boolean = false

    totalPrice:number = 0

    opGood:GoodsInterface|null = null

    @Watch('checkAll')
    checkAllChange (val:boolean){
        if (val){
            let uids = this.resultfulGoodList.reduce((ids:Array<string>, good:GoodsInterface) => {
                ids.push(good.uid)
                return ids
            }, [])

            this.checkedList = uids
        } else {
            this.checkedList = []
        }
    }

    @Watch('checkedList')
    checkedListChange (){
        this.calcAllPrice()
    }

    getMyCartGoodList (){
        this.checkedList = []
        this.checkAll = false
        this.totalPrice = 0
        httpService({url:'mycart', method:'get'}).then((res) => {
            this.goodList = res.data
            
            this.classifyGoodList()

            // this.initDragList()
        })
    }

    classifyGoodList (){
        this.resultfulGoodList = []
        this.invilidGoodList = []
        this.goodList.forEach((good) => {
            if (good.stockNum > 0 && !good.soldOut){
                this.resultfulGoodList.push(good)
            } else {
                this.invilidGoodList.push(good)
            }
        })
    }

    handleDelete (uid:string){
        httpService({url:'deleteMyCartById', method:'post', params:{uid}}).then(() => {
            this.resultfulGoodList = remove(this.resultfulGoodList, (n) => n.uid != uid)
            // 重新算当前checked数据
            if (this.checkedList.includes(uid)){
                this.checkedList = remove(this.checkedList, function (n) {
                    return n != uid
                })
            }
        })
    }

    clearInvalidGoods (){
        httpService({url:'clear', method:'get'}).then(() => {
            this.invilidGoodList = []
        })
    }

    calcAllPrice (){
        let price = this.resultfulGoodList.reduce((price:number, good:any) => {
            if (this.checkedList.includes(good.uid)){
                price += good.number * good.price
            }
            return price
        }, 0)
        this.totalPrice = price
    }

    deleteCheckedGoods (){
        httpService({url:'deleteMyCartByIds', method:'post', params:{ids:this.checkedList}}).then(() => {
            // 不用计算了，直接重新请求数据回来
            this.getMyCartGoodList()
        })
    }

    decrese (uid:string){
        httpService({url:'decrese', method:'post', params:{uid}}).then(() => {
            // 不用计算了，直接重新请求数据回来
            this.getMyCartGoodList()
        })
    }
    plus (uid:string){
        httpService({url:'plus', method:'post', params:{uid}}).then(() => {
            // 不用计算了，直接重新请求数据回来
            this.getMyCartGoodList()
        })
    }

    invokeKeyboard (good:GoodsInterface){
        this.opGood = good
        this.keyboardShow = true
    }

    keyConfirm (num:string){
        if (+num){
            httpService({url:'ordingGoodsByNum', method:'post', params:{uid:(this.opGood as any).uid, number:+num}}).then((res) => {
                // 本来应该在service层拦截得，因为时间关系和mock数据，就先不写在service
                if (res){
                    (this.opGood as any).number = +num
                }
            })
        }
    }

    initDragList (){
        const draglist:any = document.getElementById('dragablelist')
        
        new Sortable(draglist, {
            animation: 300,
            delay:500,
            handle: '.drag-item', // 拖拽的节点名称
            onChoose: (evt: any) => {
                /* const choseIndex = evt.oldIndex
                   console.log(evt) */
                
            },
            onEnd: (evt: any) => {
                let {oldIndex, newIndex} = evt
                console.log(evt)
                
                const temp = cloneDeep(this.resultfulGoodList[oldIndex])
                this.resultfulGoodList.splice(oldIndex, 1)
                this.resultfulGoodList.splice(newIndex, 0, temp)
            }
        })
    }

    created (){
        this.getMyCartGoodList()
    }

    mounted (){
        this.initDragList()
    }
    
}
</script>
<style lang="scss" scoped>
.cart-view{
    height: 100vh;
    width: 100vw;
    font-size: 14px;
    background-color: var(--backgroud-color);
    padding-bottom: calc(var(--footer-height) + 70px);
    box-sizing: border-box;
    overflow: auto;

    .title{
        height: 30px;
        background-color: #fff;
        line-height: 30px;
        padding: 0 10px;
    }

    .op-delete{
        color: #6e6c6c;
        margin-right: 10px;
        margin-top: 10px;
        font-size: 14px;
        text-align: right;
    }

    .result-item{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        padding: 0 10px;
        user-select:none;
        
        .item-content{
            position: relative;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            width: 100%;
            border-radius: 10px;
            box-sizing: border-box;
            .status{
                border-radius: 10px;
                width: 100%;
                height: 100%;
                z-index: 2;
                position: absolute;
                background-color: rgba($color: #000000, $alpha: 0.1);
                top: 0;
                left: 0;
                padding: 30px;
                font-size: 18px;
                box-sizing: border-box;
                font-weight: bold;
            }

            .pic{
                width: 70px;
                height: 70px;
                margin: 0 10px;
            }
            .info{
                flex: 1;
                height: 70px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .em{
                    color: red;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
        }

        .item-op{
            width: 80px;
            border-radius: 20px;
            background-color: rgba($color: #000000, $alpha: 0.1);
            position: absolute;
            bottom: 10px;
            right: 10px;
            padding: 0px 12px;
            display: flex;
            justify-content: space-around;
            line-height: 30px;

            .op-input{
                display: inline-block;
                width: 30px;
                text-align: center;
                line-height: 35px;
            }

            .op-uni{
                color: #66a800;
                font-weight: bold;
                font-size: 22px;
            }
        }
    }
    .invilid{
        opacity: 0.4;
        cursor: not-allowed;
    }

    .invalid-tips{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        font-size: 14px;
        margin-top: 10px;
        .op-dec{
            color: red;
        }
    }
    .op-all{
        background-color: #fff;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        left: 0;
        right: 0;
        bottom: var(--footer-height);

        .price-all{
            flex: 1;
            margin-left: 10px;
        }

        .em{
            font-size: 14px;
            font-weight: bold;
            color: red;
        }
        .ex{
            font-size: 12px;
            color: #a1a1a1;
        }

        .btn-order{
            padding: 8px 20px;
            border-radius: 20px;
            background-color: green;
            color: #fff;
        }
    }
}
</style>