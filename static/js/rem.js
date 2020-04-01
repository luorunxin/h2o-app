(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 10 * (clientWidth / 375) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', function() {
    recalc();
    FastClick.attach(doc.body);//解决手机浏览器点击事件300ms延迟的bug
  }, false);
  window.onLoad  = function(){
    var map = new AMap.Map('container');
    map.plugin('AMap.Geolocation', function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      })

      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete)
      AMap.event.addListener(geolocation, 'error', onError)

      function onComplete (data) {
        // data是具体的定位信息
        alert(JSON.stringify(data,null,2))
        localStorage.setItem('location', JSON.stringify(data))
      }

      function onError (err) {
        // 定位出错
        map.plugin('AMap.CitySearch', function () {
          var citySearch = new AMap.CitySearch()
          citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // 查询成功，result即为当前所在城市信息
              localStorage.setItem('location', JSON.stringify(result))
            }
          })
        })
      }
    })
  }
  var url = 'https://webapi.amap.com/maps?v=1.4.15&key=f1a5af642a8d071df5d5e1b5a5954495&callback=onLoad';
  var jsapi = document.createElement('script');
  jsapi.charset = 'utf-8';
  jsapi.src = url;
  document.head.appendChild(jsapi);
})(document, window);