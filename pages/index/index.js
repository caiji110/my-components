// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    MyTagsList: { 
      type: [ '运动达人',"新手求带" ,"王者大佬","剧本杀爱好者","快跑偷人啦","饮茶先啦落班先"],
      multichoice: true
     },
     SelectMyTag:[],
     nbFrontColor: '#000000',
     nbBackgroundColor: '#ffffff',
     bgTextStyle: 'dark',
     scrollTop: '2000rpx',
     bgColor: '#ff0000',
     bgColorTop: '#00ff00',
     bgColorBottom: '#0000ff',
     nbTitle: '标题',
     nbLoading: true,
     nbFrontColor: '#000000',
     nbBackgroundColor: '#ffffff',
  },
   //选择个人标签
  SelectMyTags(e){
    this.setData({
      SelectMyTag : e.detail.type,
      alreadyselect:true
    })
    console.log(e.detail.type);
  },


})
