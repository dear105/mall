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
           // this.refresh();
        }
        this.$bus.$on("itemImageLoad", this.itemImgListener)
        //console.log('我是混入的');
    }
}


import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
    components: { BackTop },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = -position.y > 1000
        }
    }

}