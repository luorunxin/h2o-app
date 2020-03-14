import Vue from 'vue'

Vue.filter('getPrice', function (val) {
  let value = val
  if(val >= 1000){
    let decimal = ''
    if(val.toString().indexOf('.') > -1){
      value = val.toString().split('.')[0].split('').reverse()
      decimal = '.' + val.toString().split('.')[1]
    }else{
      value = val.toString().split('').reverse()
    }
    for(let i in value){
      if(i%3 == 0 && i != 0){
        value.splice(i, 0, ',')
      }
    }
    value = value.reverse().join('') + decimal
  }
  return value
})