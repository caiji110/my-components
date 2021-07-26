// components/TeamTag/index.js
Component({
  /**
   * tags:{}
   */
  properties: {
    CurrentSelected: {
      type:Number,
      value:0,
      observer:function(newvalue){
        this.setData({
          selected:newvalue
        })
      }
    },
    tags: {
      type: Object,
      value:{
       type: ['学习局','运动局','游戏局','其他']
      },
      multichoice: false //不能多选
    }
  },

  /**
   * 组件的初始数据
   */
  data: { 
    selected:0,
    AlreadySelected:[ ],
    TagList:[]
  },
  lifetimes:{
    attached(){
      const NewTypeArr =[]
      if(this.properties.tags.multichoice){
        this.properties.tags.type.forEach(item => {
          NewTypeArr.push({type:item,checked:false})
        })
        this.setData({
          TagList:NewTypeArr
        })
        
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClickSelectType(e){
      const {index} = e.currentTarget.dataset
      //console.log(index);
      //判断是否为多选
      if(this.properties.tags.multichoice==true){
        let SelectArr = this.data.AlreadySelected
        let taglist = this.data.TagList
        //判断是否选中
        let isselected = SelectArr.findIndex(item => this.properties.tags.type[index]==item.type)
      //  console.log(isselected);
        //已经选中，重复点击更改为未选中的状态
        if(isselected!=-1) {         
          SelectArr.splice(isselected,1);
          taglist[index].checked=false
          this.setData({
            selected:index,
            AlreadySelected:[].concat(SelectArr),
            TagList: [].concat(taglist)
          })
        }
        else{
          SelectArr.push({ type:this.properties.tags.type[index],id:index })
          taglist[index].checked=true
          this.setData({
            selected:index,
            AlreadySelected:[].concat(SelectArr),
            TagList: [].concat(taglist)
          })
        }
        //选中的标签
        this.triggerEvent("onClickSelectTypeMulit",{type:this.data.AlreadySelected})
      }
      else{
        this.setData({
          selected:index
        })
        this.triggerEvent("onClickSelectType",{index,type:this.properties.tags.type[index]})
      }
     
     
    },
  }
})
