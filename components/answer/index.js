// components/answer/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    QuestionsArray:{
      type:Array,
      value:[
        { question:'1.深大南区天桥什么时候开通？',
          options:['A．　没有开通','B．　２０１３年','C．　２０１８年','D．　２０２１年'],
          rightoptions:['0'],
        },
        { question:'2.文山湖有几只鹅？',
          options:['A．　1','B．　2','C．　3','D．　以上均是错误选项'],
          rightoptions:['3'],
        },
        { question:'3.南区天桥都没有你6出自哪个典故？',
          options:['A．　迟迟不开通','B．　忙着打官司','C．　天桥是6字形','D．　以上均为正确答案'],
          rightoptions:['3'],
        },
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    limitTime:30,
    current:0,
    SelectedResult:[],
    isshow:true,
    index:0
  },
  lifetimes: {
    attached(){
      this.CheckTimeOut().then(res => {
        wx.navigateTo({
          url: '../../pages/AnswerAuthentication/result/index?'+'result='+this.data.SelectedResult,
        })
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    CheckTimeOut(){
      let timer = null;
      return new Promise((resolve,reject) => {
        timer = setInterval(() =>{
          let {limitTime} = this.data
          if(limitTime<=1) {
            clearInterval(timer);
            resolve('计时结束')}
          this.setData({
            limitTime:limitTime-1
          })
        },1000)
      })
    },
    SelectAnswer(e){
      let resultarr = this.data.SelectedResult
      let str = e.target.dataset.options
      let questions = this.properties.QuestionsArray
      let {selected,index}= this.Getparams(str)
       //拿到选项和题目的下标
      if(selected&&index){
         //判断答题是否正确
        let result = questions[index].rightoptions[0]==selected?'true':'false'
        console.log(result);
        resultarr.push(result)
         //答题结果
        this.setData({
          SelectedResult:[].concat(resultarr),
        })
       }
      this.setData({
        current:this.data.current+1,
      })
      if(this.data.current>this.properties.QuestionsArray.length-1){
        this.setData({
          current:0
        })
        wx.navigateTo({
          url: '../../pages/AnswerAuthentication/result/index?'+'result='+this.data.SelectedResult,
        })
      }
    },
    Getparams(str){
      let newarr = []
      let arr = str.split("=")
      for(let i =0;i<arr.length;i++){
        if(arr[i].includes("&")) newarr.push(...arr[i].split("&"))
        else newarr.push(arr[i])
      }
      return {
        selected:newarr[1],
        index:newarr[3]
      }

    },
    onChangeCurrent(e){
      this.setData({
        index:e.detail.current,
        current:e.detail.current,
      })
    }
  }
})
