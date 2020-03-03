<template>
    <div class="CartBar">
        <div class="CartBar-left">
            <check-button class="check-button" :isChecked='checkState' @click.native="selectClick"/>
            <span>全选</span>
        </div>
        <div class="CartBar-center">
            <span>合计({{addCount}})</span>
        </div>
        <div class="CartBar-right" @click="CartToast">
            <span>去计算({{checkLength}})</span>
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name: 'CartBottomBar',
    components:{
        CheckButton
    },
    computed: {
        addCount(){
            return '￥'+this.$store.state.cartList.filter(res=>{
                return res.isCheck == true
            }).reduce( (pre,res)=>{
                return pre = pre + res.price * res.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(res=>{
                return res.isCheck == true
            }).length
        },
        checkState(){
            if(this.$store.state.cartList.length == 0){
                return false
            }
               
            // 1.普通遍历
            // for(let attr of this.$store.state.cartList){
            //     if(attr.isCheck == false){
            //         return false
            //     }
            // }
            // return true
            // 2.filter方法            
            return this.$store.state.cartList.filter(res=>{
                return res.isCheck == false
            }).length == 0

        }
    },
    methods: {
        selectClick(){
            // 这里直接修改state中的值不好 进行一下封装           
           if(this.checkState){
               this.$store.commit('changeStateFalse');   
            }else{
               this.$store.commit('changeStateTrue');
            }

        // 上面的式子本来可以简化成下面这种，但是由于上面那个函数会互相影响
        //    this.$store.state.cartList.forEach(item => {
        //            item.isCheck = !this.checkState
        //     })
        },
        CartToast(){
            if(!this.checkLength)
                this.$toast.show('请选择商品')
        }
    },
}
</script>

<style scoped>
    .CartBar{
        background-color:#eee;
        position: relative;
        line-height: 40px;
        height: 40px;
        display: flex;
        font-size: 14px;
    }
    .CartBar-left{
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 60px;
    }
    .check-button{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .CartBar-center{
        margin-left: 50px;
        flex: 1
    }
    .CartBar-right{
        width: 90px;
        color: #fff;
        text-align: center;
        background-color: red;
    }
</style>