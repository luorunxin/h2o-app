export { default } from './src/lHeader'

/**
 * @Description:  使用：
 * @author annlo luo
 * @date 2020/3/20
 */

/**
 *
    <l-header
      :fixed="true"
      :bgColor="'#ff8000'"
      :title="'标题'"
      :back="true"
      :color="'#333'"
    >
      <!--<div slot="backRight">...</div>-->
      <!--<div slot="headerRight">...</div>-->
    </l-header>

    组件属性（props）：
      fixed : 是否固定在页面顶部，默认固定是true
      bgColor : 组件的背景颜色，默认是白色
      title : 组件标题，不传则是空，不显示，默认是空
      back : 组件返回按钮，默认显示是true
      color : 组件中间标题的字体颜色，默认是'#333'

    组件插槽（slot）：
      backRight : 返回按钮右边插槽
      headerRight : 组件最右边插槽

 *
 */