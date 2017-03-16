//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    item:{}
  },
  onLoad: function () {
    var that = this;
    app.ajax({
      func:"leaderhome/index",
      data:{"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : ""}
    },function(res){
      console.log(res.data);
      if(res.code == 0){
        that.setData({item:res.data});
      }else{
        wx.showToast({
          title:res.reason,
          duration: 2000
        });
      }
    })
  }
})
