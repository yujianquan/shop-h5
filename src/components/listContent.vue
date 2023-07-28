<template>
  <div class="list-content">
    <empty-comp v-if="!goodList.length" />
    <good-item v-for="good in goodList" :key="good.uid" :info="good" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator"
import GoodItem from "./goodItem.vue"
import { GoodsInterface, SellStatus } from '@/util/interface'
import EmptyComp from "./empty.vue"

@Component({
    components: {
        GoodItem,
        EmptyComp
    }
})
export default class ListContent extends Vue {
    @Prop({default:() => []}) goodList:Array<GoodsInterface> | undefined
}
</script>
<style lang="scss" scoped>
.list-content{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 10px;
}
</style>