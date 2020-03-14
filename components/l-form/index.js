export { default } from './src/lForm'

/**
 * @Description:  使用
 * @author annlo luo
 * @date 2020/3/11
 *
 * <xh-form
     v-model="value"
     :formData="selectQueryCondition"
     :handleData="handleData"
     :otherData="otherData"
     @onDeleteHandler="deleteCondition"
     @submitHandle="submitHandle"
   />
 *
 * v-model  ---->  双向绑定获取表单数据
 * :formData ----> 表单属性
 * :handleData ----> 操作按钮属性
 * :otherData ---->  其他需要传递的数据
 * @onDeleteHandler  ---->  单个表单删除操作回调函数
 * @submitHandle  ---->  表单提交回调
 *
 */

/**
 * @Description:  表单传参属性格式
 * @author annlo luo
 * @date 2020/3/9
 *
 * ---------------------------------------
 *
 * label（String）: 标签名
 * value（Object）: 返回值（未用）
 * name（String）: 字段名（唯一）
 * mode（String）: 表单模式  --->  (input/select/inputSelect/datePicker/submit/reset)
 * type（String）: input类型用type类型
 * required（Boolean）: 是否必填
 * rules（Array / Object）: 校验格式
 * options（Array）: 选择框选项,select/inputSelect模式下能用
 * showDeleteBtn（Boolean）: 是否显示表单删除按钮
 * format（String）: datePicker日期选择器中的value格式
 * size（String）: 表单大小
 * width（Number）: 表单宽度
 * maxlength: 最大输入长度
 * showWordLimit: 是否显示字数统计，只在text和textarea有效
 *
 * reset（String）: 只有在 "重置" 按钮操作中使用
 *
 */