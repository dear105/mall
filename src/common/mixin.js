import { debounce } from './utils'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            // refresh:null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 500);
        // this.refresh = debounce(this.$refs.scroll.refresh, 500);
        this.itemImgListener = () => {
            refresh();
            //this.refresh();
        }
        this.$bus.$on("itemImageLoad", this.itemImgListener)
        //console.log('我是混入的');
    }
}