//app.js

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  length:function(jsonObj){
      var Length = 0;
      if(jsonObj != undefined){
          for (var item in jsonObj) {
              Length++;
          }
      }
      return Length;
  },
  isObjEmpty:function(obj) {
      for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
      }

      return true;
  },
  ajax: function(options, callback, load){
      var that = this;
      load = load != undefined ? load : true;
      load && wx.showToast({title:''});
      options = options || {};
      options.type = options.type || 'jsonp';
      options.method = options.method || 'GET';
      options.data = options.data ? options.data : {};
      wx.request({
          type: options.method,
          url: that.getRequestURL(options),
          data: options.data,
          dataType: options.type,
          success: function(res) {
              load && wx.hideToast();
              (typeof(callback) === 'function') ? callback(JSON.parse(res.data)) : '';
          },
          error: function(xhr, type) {
              load && wx.hideToast();
              wx.showToast({title:'网络请求失败。',duration:2000});
          }
      });
  },
  getRequestURL: function(options){
      var query = options.query || {};
      var func = options.func || '';

      var apiServer = this.globalData.apiServer + func + '.do' +
      (this.isObjEmpty(query) ? '' : '?');

      var name;
      for (name in query) {
          apiServer += name + '=' + query[name] + '&';
      }
      return apiServer.replace(/&$/gi, '');
  },
  globalData:{
    userInfo:null,
    appid: 'wx6e309b6f1ecc081d',
    currentUrl:'http://app.bbztx_v3.com/leader_system/',
    apiServer: "http://wap.bbztx.com/",
    imgPath: "https://img.bbztx.com/"
  }
})