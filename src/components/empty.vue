<template>
  <div class="empty">
    <span>这里空空如也</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component
export default class EmptyComp extends Vue {}
</script>
<style lang="scss" scoped>
.empty{
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #d6d6d6;
    min-height: 200px;
}
</style>