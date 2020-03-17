export { default } from './src/lShppingCartCard'

/**
 * @Description:  用法如下:
 * @author annlo luo
 * @date 2020/3/17
 */

/**
 *
    <l-shopping-cart-card
      :record="item"
      @onChangeCheck="onChangeCheck"
      @onShoppingHandle="onShoppingHandle"
      @onSubstrctHandle="onSubstrctHandle"
      @onPlusHandle="onPlusHandle"
    />

  record : 必须传入的参数包括如下：
 （是否选中）  checked : false,
 （图片连接）  src : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4132984704,2110908246&fm=11&gp=0.jpg',
 （标题）     title : '测试数据标题',
 （价格）     pric : 199.99,
 （数量）     num : 1

  @onChangeCheck    ---->    点击复选框触发的回调函数
  @onShoppingHandle   ---->    点击卡片任意（不包括卡片内按钮）触发的回调函数
  @onSubstrctHandle   ---->    点击减号触发的回调函数
  @onPlusHandle   ---->    点击加号触发的回调函数

  触发回调如下：都可以接收一个record参数
  onChangeCheck(record) {
    console.log(JSON.stringify(record, null, 2))
  },
  onShoppingHandle(record) {
    console.log(JSON.stringify(record, null, 2))
  },
  onSubstrctHandle(record) {
    console.log(JSON.stringify(record, null, 2))
  },
  onPlusHandle(record) {
    console.log(JSON.stringify(record, null, 2))
  }

 *
 */