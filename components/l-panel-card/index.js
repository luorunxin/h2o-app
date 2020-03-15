export { default } from './src/lPanelCard'

/**
 * @Description:  用法
 * @author annlo luo
 * @date 2020/3/15
 */

/**
 *
   <l-panel-card
      :record="datas"
      @onPanelCardHandle="onPanelCardHandle"
   >
      <div></div>      -------->   插入的内容
   </l-panel-card>
 *
 *  ------------------------------华丽的分割线----------------------------------
 *
 *  record（传入的数据，如下:）
 *
 *      title:  卡片标题
 *      arrowTitle:  卡片右边箭头文字
 *
 *  ------------------------------华丽的分割线----------------------------------
 *
 * onPanelCardHandle（点击标题部分执行的回调函数）
 *
    onPanelCardHandle() {
      this.$toast('跳转全部订单')
    }
 *
 */

