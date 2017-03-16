// pages/sel_team/sel_team.js
var app = getApp();
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that = this;
    app.ajax({
      func:"leaderhome/team/list",
      data:{"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : "","groupid":options.groupid}
    },function(res){
      if(res.code == 0){
        that.setData({item:res.data,options:options})
      }else
        wx.showToast({
          title:res.reason,
          duration:2000
        })
    });
  },
  changeTeam:function(e){
    var that = this, teamid = e.target.dataset.teamid;
    var data = {"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : "","groupid":that.data.options.groupid,"teamId":teamid};
    !that.data.options.id ? data.playerId = that.data.options.playerId : data.uid = that.data.options.id;
    app.ajax({
      func:!that.data.options.id ? "leaderhome/team/change_player" : "/leaderhome/team/change_leader",
      data:data
    },function(res){
      if(res.code == 0){
        that.data.options.teamId = teamid;
        that.setData({options:that.data.options});
        var teams = getCurrentPages()[getCurrentPages().length-2];
        teams.getList();
        wx.navigateBack({
          delta: 1
        })
      }else{
        wx.showToast({
          title:res.reason,
          duration:2000
        })
      }
    })
  }
})