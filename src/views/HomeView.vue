<template>
  <div class="home-index">
    <div class="home-head">
      <!-- <div class="title">
        商城演示项目
      </div> -->
      <div class="seach-head">
        <input v-model="searchText" type="search" class="search-input" placeholder="请输入你想要找得商品" @change="onDebounceSearch">
      </div>
    </div>
    <net-work-error v-if="networkError" />
    <div v-else class="home-body">
      <template v-if="status === 'view'">
        <swiper-comp />
        <tab v-model="tabType" />
      </template>
      <list-content :good-list="goodList" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import httpService from '@/service/httpService'
import { TabType, GoodsInterface } from '@/util/interface'
import { debounce } from 'lodash'

import SwiperComp from "@/components/swiper.vue"
import Tab from "@/components/tab.vue"
import ListContent from "@/components/listContent.vue"
import NetWorkError from '@/components/netWorkError.vue'
@Component({
    components: {
        SwiperComp,
        Tab,
        ListContent,
        NetWorkError
    }
})
export default class HomeView extends Vue {
    tabType:TabType = TabType.FRUITS

    goodList:Array<GoodsInterface> = []

    searchText:string = ''

    status:string = 'view'

    networkError:boolean = false

    onDebounceSearch = debounce(this.delaySearch, 50)

    @Watch('tabType')
    tabTypeChange (){
        this.getStockGoodsListByType()
    }

    getStockGoodsListByType (){
        httpService({url:'goodslist', method:'get', params:{type:this.tabType}}).then((res:any) => {
            this.goodList = res.data
        })
    }

    clearSearch (){
        this.searchText = ''
        this.delaySearch()
    }

    delaySearch (){
        if (this.searchText){
            this.status = 'searching'
            httpService({url:'search', method:'get', params:{key:this.searchText}}).then((res:any) => {
                this.goodList = res.data
            })
        } else {
            this.status = 'view'
            this.getStockGoodsListByType()
        }
    }

    getNetworkError (){
        let rNumber = Math.random() * 10
        if (rNumber < 4){
            // 这里模拟网路出故障得bug
            httpService({url:'neterror', method:'get'}).then((res) => {
                this.networkError = true
            })
        } else {
            this.getStockGoodsListByType()
        }
    }

    created (){
        this.getNetworkError()
    }
}
</script>
<style lang="scss" scoped>
.home-index{
    padding-bottom: var(--footer-height);
    width: 100%;
    height: 100%;
}
.home-head{
    background-color: #fff;
    .title{
        padding: 10px;
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #ededed;
    }
    .seach-head{
        background-color: #fff;
        border-radius: 20px;
        padding: 0 30px;
        position: relative;
        border: 0.5px solid #999999;
        width: 170%;
        height: 50px;
        left: -44%;
        line-height: 50px;
        transform: scale(0.5);
        display: flex;
        .search-input{
            background-color: transparent;
            border: 0;
            color: #999;
            font-size: 18px;
            height: 50px;
            line-height: 50px;
            outline: none;
            padding: 0;
            position: relative;
            width: 100%;
        }
        .clear{
            font-size: 25px;
            color: #777777;
        }
    }
}

</style>
