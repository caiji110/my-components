// app.js
App({
  globalData: {
    userInfo: null,
    navHeight:''
  },
  onLaunch() {
    let navHeight=''
    let cachet = wx.getMenuButtonBoundingClientRect();
    let {height,top}  = cachet;
    wx.getSystemInfo({
      success:res=> {
        navHeight= (top-res.statusBarHeight)*2+height;
        this.globalData.navHeight=navHeight;
        this.globalData.statusBarHeight =res.statusBarHeight
        console.log(navHeight);
      }
    });
    //console.log(systemInfo);
    

    console.log(cachet);
  },
  
})
