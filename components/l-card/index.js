export { default } from './src/lCard'

/**
 * @Description:  用法
 * @author annlo luo
 * @date 2020/3/14
 */

/**
 *
  <l-card
    :record="item"
    @onCardHandle="onCardHandle"
  >
    <l-label class="label" :label="item.label" />     ----->  这个可以插入你想插入的html
  </l-card>
 *
 * -----------------------------------------------------------------------
 *
 * record（传入的数据，数据内容如下：）
 *
 *
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584191214702&di=d330763a4c2d9173eaac684f3e4ea392&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg',
      title: '憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨憨',
      price: 1000,
      paymentNum: 10000,

    src（图片）
    title（标题）
    price（价格）
    paymentNum（付款人数）
 *
 * ----------------------------------------------------------------------
 *
 * onCardHandle（点击单个卡片的回调函数，用来获取当前点击的卡片数据）
 *
      onCardHandle(record) {
        console.log(record)
      }
 *
 */