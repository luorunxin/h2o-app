export { default } from './src/lRefresh'

/**
 * @Description:  用法
 * @author annlo luo
 * @date 2020/3/14
 */

/**
 *
 * <l-refresh
     ref="refresh"
     @refresh="refresh"
   >
     <div class="container">            |
       <div>                            |
         <h1 class="title">h2o</h1>     | -----》》》   内容区
       </div>                           |
     </div>                             |
   </l-refresh>
 *
 * ------------------------------------------------------
 *
 * 正在刷新调用函数 (发送请求等操作)
 * refresh() {
      let _that = this
      setTimeout(() => {
        _that.$refs['refresh'].refreshComplete()
      }, 2000)
    }
 *
 */


