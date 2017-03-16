// pages/child_detail/child_detail.js
var app = getApp();
Page({
  data:{
    options:{},
    index:0,
    comment:{},
    record:{},
    info:{},
    duties:['队长','副队长','财务部长','物资部长','美食部长','交通部长','纪律部长','队员','其他'],
    dutyIndex:0,
    nature:[
      {value:0,name:"活泼开朗"},
      {value:1,name:"温柔听话"},
      {value:2,name:"调皮专横"},
      {value:3,name:"孤僻胆小"},
      {value:4,name:"腼腆害羞"},
      {value:5,name:"其他"}
    ],
    interest:[
      {value:0,name:"乐器"},
      {value:1,name:"舞蹈"},
      {value:2,name:"绘画"},
      {value:3,name:"书法"},
      {value:4,name:"体育"},
      {value:5,name:"其他"}
    ],
    family:[
      {value:0,name:"一般"},
      {value:1,name:"中等"},
      {value:2,name:"富裕"},
      {value:3,name:"超富裕"},
      {value:4,name:"未知"}
    ]
  },
  onLoad:function(options){
    this.data.options = options;
    this.getComment();
  },
  tab:function(e){
    var i = parseInt(e.target.dataset.index);
    this.setData({index:i});
    switch(i){
      case 0 : 
        this.getComment();
        break;
      case 1 :
        this.getRecord();
        break;
      case 2 :
        this.getInfo();
        break;
    }
  },
  getComment:function(){
    var that = this;
    app.ajax({
      func:"leaderhome/child/comment",
      data:{"rid":(wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').rid:"") ,"playerId":that.data.options.id}
    },function(res){
      if(res.code == 0){
        var idx;
        for(var i = 0; i < that.data.duties.length; i++){
          that.data.duties[i] == res.data.job ? idx = i : "";
        }
        that.setData({comment:res.data,dutyIndex:idx});
      }else{
        wx.showToast({
          title:res.reason,
          duration:2000
        });
      }
    })
  },
  getRecord:function(){
    var that = this;
    app.ajax({
      func:"user/growinfo_child",
      data:{"cardNo":that.data.options.cardNo,"cardType":that.data.options.cardType}
    },function(res){
      if(res.code == 0){
        that.setData({record:res.data});
      }else{
        wx.showToast({
          title:res.reason,
          duration:2000
        });
      }
    })
  },
  getInfo:function(){
    var that = this;
    app.ajax({
      func:"leaderhome/child/info",
      data:{"rid":(wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').rid:"") ,"playerId":that.data.options.id}
    },function(res){
      if(res.code == 0){
        for(var i = 0; i < that.data.nature.length; i++){
          if(res.data.nature.indexOf(that.data.nature[i].name) != -1){
            that.data.nature[i].checked = true;
            that.data.nature[i].active = "active";
          }
        }
        for(var i = 0; i < that.data.interest.length; i++){
          if(res.data.interest.indexOf(that.data.interest[i].name) != -1){
            that.data.interest[i].checked = true;
            that.data.interest[i].active = "active";
          }
        }
        for(var i = 0; i < that.data.family.length; i++){
          if(res.data.family.indexOf(that.data.family[i].name) != -1){
            that.data.family[i].checked = true;
            that.data.family[i].active = "active";
          }
        }
        that.setData({info:res.data,nature:that.data.nature,interest:that.data.interest,family:that.data.family});
      }else{
        wx.showToast({
          title:res.reason,
          duration:2000
        });
      }
    })
  },
  changeDuty:function(e){
    var i = parseInt(e.detail.value);
    this.data.comment.job = this.data.duties[i];
    this.setData({dutyIndex:i});
  },
  uploadImg:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.data.comment.pics.push(tempFilePaths[0]);
        that.setData({comment:that.data.comment});
      }
    })
  },
  delImg:function(e){
    var i = e.target.dataset.index;
    this.data.comment.pics.splice(i,1);
    this.setData({comment:this.data.comment});
  },
  fillJob:function(e){
    this.data.comment.job == "其他" ? this.data.comment.job = e.detail.value : '';
  },
  fillComment:function(e){
    this.data.comment.comment = e.detail.value;
  },
  fillUrl:function(e){
    this.data.comment.url = e.detail.value;
  },
  fillSeal:function(e){
    this.data.info.seal = e.detail.value;
  },
  fillMedal:function(e){
    this.data.info.medal = e.detail.value;
  },
  fillPassportNo:function(e){
    this.data.info.passportNo = e.detail.value;
  },
  fillNature:function(e){
    this.data.info.natureRemark = e.detail.value;
  },
  fillInterest:function(e){
    this.data.info.interestRemark = e.detail.value;
  },
  fillFamily:function(e){
    this.data.info.familyRemark = e.detail.value;
  },
  fillAddress:function(e){
    this.data.info.address = e.detail.value;
  },
  fillSchool:function(e){
    this.data.info.school = e.detail.value;
  },
  fillGrade:function(e){
    this.data.info.grade = e.detail.value;
  },
  changeNature:function(e){
    var value = e.detail.value.join(",");
    for(var i = 0; i < this.data.nature.length; i++){
      if(value.indexOf(this.data.nature[i].name) != -1){
        this.data.nature[i].checked = true;
        this.data.nature[i].active = "active";
      }else{
        delete this.data.nature[i].checked;
        delete this.data.nature[i].active;
      }
    }
    this.data.info.nature = value;
    this.setData({nature:this.data.nature});
  },
  changeInterest:function(e){
    var value = e.detail.value.join(",");
    for(var i = 0; i < this.data.interest.length; i++){
      if(value.indexOf(this.data.interest[i].name) != -1){
        this.data.interest[i].checked = true;
        this.data.interest[i].active = "active";
      }else{
        delete this.data.interest[i].checked;
        delete this.data.interest[i].active;
      }
    }
    this.data.info.interest = value;
    this.setData({interest:this.data.interest});
  },
  changeFamily:function(e){
    var value = e.detail.value;
    for(var i = 0; i < this.data.family.length; i++){
      if(value == this.data.family[i].name){
        this.data.family[i].checked = true;
        this.data.family[i].active = "active";
      }else{
        delete this.data.family[i].checked;
        delete this.data.family[i].active;
      }
    }
    this.data.info.family = value;
    this.setData({family:this.data.family});
  },
  commentSubmit:function(){
    var that = this;
    that.data.comment.rid = wx.getStorageSync('userInfo').rid;
    that.data.comment.playerId = this.data.options.id;
    that.data.comment.pics = that.data.comment.pics.join(",");
    console.log(that.data.comment);
    app.ajax({
      func:"leaderhome/child/comment_update",
      data:that.data.comment
    },function(res){
      if(res.code == 0){
        wx.navigateBack();
      }else
        wx.showToast({
          title:res.reason,
          duration:2000
        });
    });
  },
  infoSubmit:function(){
    var that = this;
    that.data.info.rid = wx.getStorageSync('userInfo').rid;
    that.data.info.playerId = this.data.options.id;
    app.ajax({
      func:"leaderhome/child/info_update",
      data:that.data.info
    },function(res){
      if(res.code == 0){
        wx.navigateBack();
      }else
        wx.showToast({
          title:res.reason,
          duration:2000
        });
    });
  }
})