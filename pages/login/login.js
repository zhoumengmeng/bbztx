// pages/login/login.js
Page({
  data:{
    phone:null,
    password:null
  },
  onLoad:function(options){
    console.log(wx.getStorageSync("userInfo"));
    //wx.getStorageSync("userInfo") ? wx.redirectTo({url:'../index/index'}) : '';
  },
  listenPhone:function(e){
    this.data.phone = parseInt(e.detail.value);
  },
  listenPassword:function(e){
    this.data.password = parseInt(e.detail.value);
  },
  login:function(){
    var that = this;
     getApp().ajax({
          func:"login_in",
          data:{loginName:that.data.phone,password:that.data.password}
      },function(res){
        if(res.code == 0){
          console.log(res);
          wx.setStorage({
            key: 'userInfo',
            data: res.data
          })
          wx.navigateTo({
            url: '../index/index'
          })
        }else{
          wx.showToast({
            title:res.reason,
            duration: 2000
          });
        }
      });
  }
})