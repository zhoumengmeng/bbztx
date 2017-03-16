// pages/teams/teams.js
var app = getApp();
Page({
  data:{
    index:0,
    item:[],
    activity:[]
  },
  onLoad:function(options){
    var that = this;
    app.ajax({
      func:"leaderhome/me/article",
      data:{"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : ""}
    },function(res){
      if(res.code == 0){
        for(var i=0;i<=res.data.length - 1;i++){
          res.data[i]['title'] = res.data[i]['sname']+" "+res.data[i]['title'];
        }
        that.setData({activity:res.data});
        that.getList();
      }else{
        wx.showToast({
          title:res.reason,
          duration: 2000
        });
      }
    })
  },
  changeActivity:function(e){
    this.setData({index:e.detail.value});
    this.getList();
  },
  getList:function(){
    var that = this;
    app.ajax({
      func:"leaderhome/team/list",
      data:{"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : "","groupid":that.data.activity[that.data.index].groupid}
    },function(res){
      if(res.code == 0){
        for(var i = 0; i < res.data.length; i++){
          res.data[i].flag = (i == 0 ? false : true);
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
  changeName:function(e){
    var that = this, name = e.detail.value;
    var index = e.target.dataset.index;
    var defaultName = that.data.item[index].name;
    if(defaultName != name){
      wx.showModal({
        title: '提示',
        content: '确定修改队名吗',
        success: function(res) {
          if(res.confirm){
            app.ajax({
              func:'leaderhome/team/info_update',
              data:{"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : "",'name':name,'teamId':e.target.dataset.id}
            },function(req){
              if(req.code == 0){
              }else{
                wx.showToast({
                    title:req.reason,
                    duration: 2000
                  });
                }
            },false);
          }else{
            for (let i = 0; i < that.data.item.length; ++i) {
              if(e.target.dataset.index == i)
                that.data.item[i].name = defaultName;
            }
            that.setData({item:that.data.item});
          }
        }
      })
    }
  },
  changeCall:function(e){
    var that = this, call = e.detail.value;
    var index = e.target.dataset.index;
    var defaultCall = that.data.item[index].call;
    if(defaultCall != call){
      wx.showModal({
        title: '提示',
        content: '确定修改队名吗',
        success: function(res) {
          if(res.confirm){
            app.ajax({
              func:'leaderhome/team/info_update',
              data:{"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : "",'call':call,'teamId':e.target.dataset.id}
            },function(req){
              if(req.code == 0){
              }else{
                wx.showToast({
                    title:req.reason,
                    duration: 2000
                  });
                }
            },false);
          }else{
            for (let i = 0; i < that.data.item.length; ++i) {
              if(e.target.dataset.index == i)
                that.data.item[i].call = defaultCall;
            }
            that.setData({item:that.data.item});
          }
        }
      })
    }
  },
  fold:function(e){
    var index = e.target.dataset.index;
    for(var i = 0; i < this.data.item.length; i++){
      index == i ? this.data.item[i].flag = !this.data.item[i].flag : "";
    }
    this.setData({item:this.data.item});
  }
})