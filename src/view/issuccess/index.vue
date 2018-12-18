<template>
  <div class="result">
    <div class="res">
        <div class="icon"></div>
        <div>投诉已提交</div>
    </div>
    <div class="message">
      <div class="title">投诉信息</div>
      <div class="main">
        <div>投诉时间：{{info.create_data}}</div>
        <div>投诉类型：{{info.type}}</div>
        <div>所属行政区：{{info.district_name}}</div>
        <div>投诉原因：{{info.complain_reason}}</div>
      </div>
      <div class="imgBox">
        <img  v-for="(item,index) in imgs" :key="item.id" @click="preview(index)" :src="item" alt="">
        
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
      imgs:[],
      item:''
    }
  },
  mounted(){
    this.item = JSON.parse(this.$route.query.item)
    this.getDtails();
  },
  methods:{
    preview(index){
      ImagePreview({
        images:this.imgs,
        showIndex:index,
        startPosition: index,
      });
    },
    getDtails(){
      axios.post('/openapi/v2/app/complaints/getDetailBycomplaintsCode',{"complaintCode":this.item.complaintCode}).then(res => {
        this.info = res.data.content.userts;
        console.log(res,"666")
        this.imgs = res.data.content.pictures;
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
