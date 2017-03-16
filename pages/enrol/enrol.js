// pages/enrol/enrol.js
var app = getApp();
Page({
  data:{
    page:1,
    pageSize:10
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.renderHtml();
  },
  onPullDownRefresh: function(){
    //wx.stopPullDownRefresh();
    console.log("refresh");
  },
  renderHtml:function(){
    var that = this;
    app.ajax({
      func:"leaderhome/article/plan",
      data:{"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : "","pageIndex":that.data.page,"pageSize":that.data.pageSize}
    },function(res){
      if(res.code == 0){
        for(var i = 0; i< res.data.length; i++){
          res.data[i].leaderLevel = wx.getStorageSync("userInfo").leaderLevel;
          res.data[i].flags = {"pFlag":false,"lFlag":false,"sFlag":false,"fFlag":false};
        }
        that.setData({item:res.data});
      }else{
        wx.showToast({
          title:res.reason,
          duration: 2000
        });
      }
    })
  },
  fold:function(e){
    var index = e.target.dataset.index, ftype = e.target.dataset.type;
    for(var i = 0; i < this.data.item.length; i++){
      index == i ? this.data.item[i].flags[ftype] = !this.data.item[i].flags[ftype] : "";
    }
    this.setData({item:this.data.item});
  },
  sign:function(e){
    console.log(e);
    var that = this, 
      val = e.target.dataset.val,
      id = e.currentTarget.dataset.id,
      ptype = e.currentTarget.dataset.ptype;
    switch(val){
      case "立即报名":
        app.ajax({
          func:"leaderhome/article/apply",
          data:{"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : "","planId":id,"ptype":ptype}
        },function(res){
          if(res.code==0){
            wx.showToast({
              title:"修改成功",
              duration: 2000
            });
            that.renderHtml();
          }else{
            wx.showToast({
              title:res.reason,
              duration: 3000
            });
          }
        });
        break;
      case "取消报名":
        app.ajax({
          func:"leaderhome/article/apply_cancel",
          data:{"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : "","planId":id,"ptype":ptype}
        },function(res){
          if(res.code==0){
            that.renderHtml();
          }else{
            wx.showToast({
              title:res.reason,
              duration: 3000
            });
          }
        });
        break;
    }
  }
})