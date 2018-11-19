<template>
  <div class="result">
    <div class="res">
        <div class="icon"></div>
        <div>投诉已提交</div>
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
        console.log(res,"666")
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
  .res{
      font-size: 17px;
      text-align: center;
      padding: 26px 0;
      background-color: #fff;

      .icon{
          width: 62px;
          height: 62px;
          background: url('./res.png') no-repeat;
          background-size: 100% 100%;
          margin:0 auto;
      }
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
