<template>
  <div class="tab">
    <ul>
      <li v-for="t in tab" :key="t.key" :class="['tab-list',{active:active === t.key}]" @click="changeType(t.key)">
        {{ t.name }}
      </li>
    </ul>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, VModel } from "vue-property-decorator"
import { TabType } from '@/util/interface'

interface TabInterface {
    key:TabType,
    name:string
}
@Component
export default class Tab extends Vue {

    @VModel({ type: String }) active!: TabType

    tab:Array<TabInterface> = [
        {
            key:TabType.FRUITS,
            name:'水果类'
        },
        {
            key:TabType.DRINKS,
            name:'饮料类'
        },
        {
            key:TabType.OTHER,
            name:'其他'
        }
    ]

    changeType (type:TabType){
        this.active = type
    }
}
</script>
<style lang="scss" scoped>
.tab{
    padding: 10px 10px 0;
    ul{
        list-style: none;
        display: flex;
        background-color: #fff;
        border-radius: 10px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0px;
        font-size: 14px;
        font-weight: bold;
        li{
            position: relative;
        }
    }
    .active{
        color: #0ecc30;

        &::after{
            content: '';
            width: 70%;
            height: 2px;
            border-radius: 2px;
            background-color: #0ecc30;
            position: absolute;
            left: 5px;
            bottom: -7px;
        }
    }
}
</style>