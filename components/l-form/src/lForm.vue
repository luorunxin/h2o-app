<template>
  <el-form :model="formsData" ref="formsData" class="forms">
    <div
      class="from-single-box"
      v-for="(item, index) in formData"
      :key="item.name+index"
    >
      <span v-if="item.required" class="require">*</span>
      <label v-if="item.label">{{item.label}}</label>
      <el-form-item
        :rules="item.required?item.rules:null"
        :prop="item.name"
        class="input-box"
      >
        <el-input
          v-if="item.mode === 'input'"
          v-model="formsData[item.name]"
          :show-word-limit="item.showWordLimit"
          :maxlength="item.maxlength"
          :type="item.type"
          :size="item.size"
          :placeholder="item.label?'请输入'+item.label:''"
          :style="'width:'+item.width+(item.width.indexOf('%')!=-1?'':'px')"
        />
        <el-select
          v-if="item.mode === 'select'"
          v-model="formsData[item.name]"
          :placeholder="'请选择'+item.label"
          :size="item.size"
          :style="'width:'+item.width+(item.width.indexOf('%')!=-1?'':'px')"
        >
          <el-option
            v-for="(its, index) in item.options"
            :key="its.value+index"
            :label="its.label"
            v-model="its.value">
          </el-option>
        </el-select>
        <el-select
          v-if="item.mode === 'inputSelect'"
          v-model="formsData[item.name]"
          filterable
          :placeholder="'请选择'+item.label"
          :size="item.size"
          :style="'width:'+item.width+(item.width.indexOf('%')!=-1?'':'px')"
        >
          <el-option
            v-for="(its, index) in item.options"
            :key="its.value+index"
            :label="its.label"
            v-model="its.value">
          </el-option>
        </el-select>
        <el-date-picker
          :value-format="item.format"
          :size="item.size"
          :style="'width:'+item.width+(item.width.indexOf('%')!=-1?'':'px')"
          v-if="item.mode === 'datePicker'"
          v-model="formsData[item.name]"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-button
        v-if="item.showDeleteBtn"
        class="delete-btn"
        size="mini"
        @click.stop="deleteHandler(item.name)"
      >
        删除
      </el-button>
    </div>
    <el-form-item style="margin-bottom: 0;">
      <el-button
        v-for="(item, index) in handleData"
        :key="index"
        :type="item.type"
        :size="item.size"
        @click.stop="btnHandle(item.functionName, item.mode, otherData)"
      >
        {{item.text}}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "xhInput",
    data() {
      return {
        formsData: {},
      }
    },
    props: ['formData','handleData','otherData'],
    watch: {
      'formsData': {
        handler(value) {
          this.$emit('input', value)
        },
        deep: true
      }
    },
    methods: {
      /**
       * @Description:  删除指定表单
       * @author annlo luo
       * @date 2020/3/10
       */
      deleteHandler(name) {
        delete this.formsData[name]
        this.$emit('onDeleteHandler', name)
      },

      /**
       * @Description:  点击按钮操作
       * @author annlo luo
       * @date 2020/3/10
       */
      btnHandle(functionName, mode, otherData) {
        if(mode === 'reset') {
          this.$refs.formsData.resetFields()
          return
        }
        if(mode === 'submit') {
          this.$refs.formsData.validate(valid => {
            if(!valid) {
              return false
            }
          })
        }
        this.$emit(functionName, otherData)
      }
    }
  }
</script>

<style lang="less">
  .from-single-box{
    display: flex;
    align-items: center;
    width: 100%;
    margin: 12px auto 0;
    position: relative;
    margin-bottom: 22px;
    &>.require{
      font-size: 16px;
      color: red;
      position: absolute;
      top: 0px;
      left: -10px;
    }
    &>label{
      min-width: 60px;
      margin-right: 10px;
    }
    &>.input-box{
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 0;
      .el-input{
        margin-left: 0;
      }
      .el-form-item__content{
        width: 100%;
      }
    }
    &>.delete-btn{
      margin-left: 10px;
    }
  }
</style>