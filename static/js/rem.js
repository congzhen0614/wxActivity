! function (e) {
  function t(a) {
    if (i[a]) return i[a].exports
    var n = i[a] = {
      exports: {},
      id: a,
      loaded: !1
    }
    return e[a].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports
  }
  var i = {}
  return t.m = e, t.c = i, t.p = "", t(0)
}([function (e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  })
  var i = window
  t["default"] = i.flex = function (e, t) {
    var a = e || 100,
      n = t || 1,
      r = i.document,
      o = navigator.userAgent,
      d = o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
      l = o.match(/U3\/((\d+|\.){5,})/i),
      c = l && parseInt(l[1].split(".").join(""), 10) >= 80,
      p = navigator.appVersion.match(/(iphone|ipad|ipod)/gi),
      s = i.devicePixelRatio || 2
    p || d && d[1] > 534 || c || (s = 1)
    r.documentElement.style.fontSize = a / s * s * n + "px"
  }, e.exports = t["default"]
}])
flex(50, 1)