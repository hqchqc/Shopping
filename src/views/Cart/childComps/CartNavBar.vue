<template>
    <nav-bar class="CartBar">
        <div slot="center">购物车({{getLength}})</div>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'

export default {
    name:'CartNavBar',
    components:{
        NavBar
    },
    computed: {
        ...mapGetters(['getLength'])
    },
}
</script>

<style scoped>
    .CartBar{
        background-color: var(--color-tint);
        color: #fff;
    }
</style>