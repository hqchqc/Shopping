import {debounce} from './utils';

export const itemListenerMixin = {
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 50)
        // 对监听事件进行保存
        this.ItemImgListener = () => {
            refresh();
        }
        this.$bus.$on('FinishLoad', this.ItemImgListener)
    },

    data() {
        return {
            ItemImgListener:null
        }
    },
}