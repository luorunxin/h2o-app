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
 * width（Number）: 表单宽度 ----> 可以100%，100%是字符串
 * maxlength: 最大输入长度
 * showWordLimit: 是否显示字数统计，只在text和textarea有效
 *
 * reset（String）: 只有在 "重置" 按钮操作中使用
 *
 */

export default {
  REPLY: [
    {
      label: '',
      value: null,
      name: 'review',
      mode: 'input',
      type: 'textarea',
      width: '100%',
      maxlength: '500',
      showWordLimit: true,
      required: true,
      showDeleteBtn: false,
      rules: [
        {required: true, message: '请输入回复内容', trigger: 'change'}
      ]
    },
  ],
  HANDLEDATA: [
    {
      text: '发送',
      type: 'primary',
      size: 'mini',
      functionName: 'submitHandle',
      mode: 'submit'
    },
    {
      text: '重置',
      type: '',
      size: 'mini',
      functionName: 'resetHandle',
      mode: 'reset'
    },
  ]
}