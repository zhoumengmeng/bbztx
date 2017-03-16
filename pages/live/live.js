// pages/live/live.js
var app = getApp();
Page({
  data:{
    activityIndex:0,
    teamIndex:0,
    activity:[],
    team:[]
  },
  onLoad:function(options){
    this.getActivity();
  },
  getActivity:function(){
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
        that.getTeams();
      }else{
        wx.showToast({
          title:res.reason,
          duration: 2000
        });
      }
    })
  },
  getTeams:function(){
    var that = this;
    app.ajax({
      func:"leaderhome/team/simple_list",
      data:{"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : "","groupid":that.data.activity[that.data.activityIndex].groupid}
    },function(res){
      if(res.code == 0){
        for(var i=0;i<=res.data.length - 1;i++){
          res.data[i]['name'] = res.data[i]['number']+(res.data[i]['name'] ? " "+res.data[i]['name'] : '');
        }
        that.setData({team:res.data});
        that.getList();
      }else{
        wx.showToast({
          title:res.reason,
          duration: 2000
        });
      }
    })
  },
  getList:function(){
    var that = this;
    var teamId = that.data.team[that.data.teamIndex].id;
    var aid = that.data.activity[that.data.activityIndex].aid;
    var data = {"rid":wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo").rid : "","teamId":teamId,"aid":aid}
    app.ajax({
      func:"leaderhome/live/process",
      data:data
    },function(res){
      if(res.code == 0){
        that.setData({item:res.data.process});
      }else
        wx.showToast({
          title:res.reason,
          duration: 2000
        });
    }); 
  },
  changeActivity:function(e){
    this.setData({activityIndex:e.detail.value});
    this.getTeams();
  },
  changeTeam:function(e){
    this.setData({teamIndex:e.detail.value});
    this.getList();
  },
})