<template>
  <div class="network-error">
    <span class="tips">网络开小差了，试试 <span class="em" @click="refresh">刷新</span></span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"

@Component({
    components: {
    }
})
export default class NetworkError extends Vue {

    refresh (){
        window.location.reload()
    }
}
</script>
<style lang="scss" scoped>
.network-error{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    color: #333;

    .tips{
        margin-top: 150px;
    }

    .em{
        color: #0ecc30;
    }
}
</style>