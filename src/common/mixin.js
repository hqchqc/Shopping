import {debounce} from './utils';
import BackTop from 'components/content/BackTop/BackTop.vue'

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

export const backTop = {
    components:{
        BackTop
    },
    data(){
        return{
            isShow: false,
        }
    },
    methods: {
        backTop(){
            this.$refs.scroll.scrollTo(0,0,300);
        },
        backLinster(position){
            this.isShow = -(position.y) > 1000
        }
    },
}