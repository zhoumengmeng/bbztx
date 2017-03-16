// pages/sign/sign.js
Page({
  data:{
    array: ['美国', '中国', '巴西', '日本'],
    avatar:wx.getStorageSync("userInfo").avatarUrl,
    gender:[
      {value:1,name:"男",checked:'true',active:'active'},
      {value:0,name:"女"}
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  radioChange:function(e){
    var val = parseInt(e.detail.value);
    if(val == 0){
      this.setData({
        gender:[
          {value:1,name:"男"},
          {value:0,name:"女",checked:'true',active:'active'}
        ]
      })
    }else{
      this.setData({
        gender:[
          {value:1,name:"男",checked:'true',active:'active'},
          {value:0,name:"女"}
        ]
      })
    }
  }
})