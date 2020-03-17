<template>
  <div class="l-textarea-box">
    <div ref="tacover" class="text-covering">
      <div class="shadow">{{text}}</div>
    </div>
    <textarea
      ref="ta"
      :placeholder="placeholder"
      v-model="text"
      @keyup="changeValue($event)"
    ></textarea>
  </div>
</template>

<script>
  export default {
    name: "lTextarea",
    data() {
      return {
      }
    },
    model: {
      prop: 'textareaVal',
      event: 'input'
    },
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      textareaVal: {
        type: String,
        default: ''
      }
    },
    computed: {
      text: {
        get() {
          return this.textareaVal
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    },
    watch: {
      textareaVal(newVal) {
        if(!newVal) {
          this.$refs['ta'].style.height = 'calc(60px - 2rem)'
          this.$refs['ta'].parentNode.style.height = 'calc(60px - 2rem)'
        }
      }
    },
    methods: {
      changeValue(e) {
        e.target.style.height = this.$refs['tacover'].offsetHeight + 'px'
        e.target.parentNode.style.height = this.$refs['tacover'].offsetHeight + 'px'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .l-textarea-box{
    width: 100%;
    margin-right: 1rem;
    position: relative;
    textarea{
      list-style: none;
      width: 100%;
      height: calc(60px - 2rem);
      padding: 1rem;
      font-size: 1.4rem;
      resize: none;
      outline: none;
      border: none;
      border-radius: .5rem;
      overflow-y: visible;
      position: absolute;
      bottom: 0;
      z-index: 999;
    }
    .text-covering{
      word-break: break-all;
      font-size: 1.4rem;
      min-height: calc(60px - 2rem);
      padding: 1rem;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      opacity: 0;
    }
  }
</style>