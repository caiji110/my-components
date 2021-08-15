// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    MyTagsList: {
      type: ['运动达人', "新手求带", "王者大佬", "剧本杀爱好者", "快跑偷人啦", "饮茶先啦落班先"],
      multichoice: true
    },
    SelectMyTag: [],
    navHeight: '',
    statusBarHeight: '',
    rgba1:'',
    rgba2:'',
    current:0
  },
  //选择个人标签
  SelectMyTags(e) {
    this.setData({
      SelectMyTag: e.detail.type,
      alreadyselect: true
    })
    console.log(e.detail.type);
  },

  onLoad:async function() {
    this.setData({
      navHeight: app.globalData.navHeight,
      statusBarHeight: app.globalData.statusBarHeight
    });
    const canvas = wx.createOffscreenCanvas({type:'2d',width:300,height:150});
    const context = canvas.getContext("2d");
    const image = canvas.createImage();
    const that = this
    await new Promise(resolve => {
      image.onload = resolve
      image.src =`./img/${that.data.current}.gif` // 要加载的图片 url
    })
    context.clearRect(0, 0, 300, 150)
    context.drawImage(image, 0, 0, 300, 150)
  
    // 获取画完后的数据
    const imgData = context.getImageData(0, 0, 300, 150)
    let colorList=this.getCountsArr(imgData.data)
    let arr =[]
    for(let key in colorList){
      arr.push({
        color:`rgba(${key})`,
        counts:colorList[key]
      })
    }
    arr.sort((a,b)=>b.counts-a.counts)
    this.setData({
      rgba1:arr[0].color,
      rgba2:arr[arr.length-1].color
    })
    //console.log(arr);
   
  },
  getCountsArr(arr){
    let originData = arr;
    let rgba =[];
    let colorList =[];
    for(let i=0;i<originData.length;i=i+4){
      rgba[0] =originData[i]
      rgba[1] =originData[i+1]
      rgba[2] =originData[i+2]
      rgba[3] =originData[i+3]
    
      if (rgba.indexOf(undefined) !== -1 || originData[i + 3] === 0) {
        continue;
      }
      let rgbaStr = rgba.join(",");
      
      if(rgbaStr in colorList){
        ++colorList[rgbaStr]
      }
      else{
        colorList[rgbaStr]=1
      }
    }
    return colorList
  },
  onChangeColor(e){
    this.setData({
      current:e.detail.current
    })
    this.onLoad()
  }
})