<template>
  <div class="result">
    <div class="header">
      <div class="title">处理结果</div>
      <div class="info">{{info.result}}</div>
    </div>
    <div class="time">
      <div>处理时间</div>
      <div>{{info.resultDate}}</div>
    </div>
    <div class="message">
      <div class="title">投诉信息</div>
      <div class="main">
        <div>投诉时间：{{info.createDate}}</div>
        <div>投诉类型：{{info.type}}</div>
        <div>所属行政区：{{info.districtName}}</div>
        <div>投诉原因：{{info.complainReason}}</div>
      </div>
      
      <div class="imgBox">
        <img  v-for="item in imgs" :key="item.id" @click="preview()" :src="item" alt="">
        
      </div>

    </div>


  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, ImagePreview  } from 'vant';
import axios from 'axios';

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ImagePreview.name]:ImagePreview 
  },
  data(){
    return{
      info:'',
      imgs:[]

    }
  },
  mounted(){

    this.getDtails();
  },
  methods:{
    preview(){
      ImagePreview({
        images:this.imgs,
        showIndex:false
      });

    },
    getDtails(){
      axios.post('/openapi/v2/app/complaints/getDetailBycomplaintsCode',{"complaintCode":this.$route.query.item.complaintCode}).then(res => {
        this.info = res.data.content.userts;
        console.log(this.info,"666")
        this.imgs = res.data.content.pictures;
        var date = new Date(this.info.resultDate);
        var date1 = new Date(this.info.createDate);
        this.info.resultDate = date.toLocaleDateString().replace(/\//g, "-") ;
        this.info.createDate = date1.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8);
        
      })


    }
  }
};
</script>

<style lang="less">
.result{
  background-color: #f5f5f9;
  height: 100vh;
  .header{
    background-color: #ffffff;
    padding: 15px;
    .title{
      font-size: 17px;
    }
    .info{
      font-size: 15px;
      color: #333;
      margin-top: 10px;
    }
  }
  .time{
    display: flex;
    justify-content: space-between;
    font-size: 17px;
    line-height: 45px;
    height: 45px;
    padding: 0 15px;
    background-color: #ffffff;
    margin-top: 10px;
    color: #333;
  }
  .message{
    padding: 15px;
    background-color: #ffffff;
    margin-top: 10px;
    .title{
      font-size: 17px;
      color: #333333;
    }
    .main{
      font-size: 15px;
      color: #666666;
    }
    .imgBox{
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      padding-bottom: 10px;
      img{
        width: 80px;
        height: 80px;
        margin-right: 15px;

      }
    }
  }



}
</style>
