<template>
  <div class="search">
    <div class="header">
      <div class="item">
        <van-cell-group>
          <van-field
            v-model="phone"
            label="手机号"
            placeholder="请输入手机号"
          />
        </van-cell-group>
      </div>
      <van-button :disabled="isSearch"  @click="getList()"  type="primary">查询</van-button>
    </div>
    
    <div class="list">
      <div v-for="item in list" :key="item.id"  @click="onClickResult(item)" class="items">
        <div class="time">投诉时间：{{item.createDate}}</div>
        <div class="type">投诉类型：{{item.type}}</div>
        <div class="areas">所属行政区：{{item.districtName}}</div>
        <div class="icon">
          <img v-if="item.status == '02'" src="./1.png" alt="">
          <img v-if="item.status == '01'" src="./2.png" alt="">
        </div>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import { Field, CellGroup, Button ,Toast} from 'vant';
import axios from 'axios';
export default {
  components: {
    [Field.name]: Field,
    [CellGroup. name]:CellGroup,
    [Button. name]:Button ,
    [Toast.name]:Toast
    
  },

  data() {
    return {
      phone:'',
      list:''
    };
  },
  

  computed: {
    
    isSearch(){
      
      if(!(/^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.phone))){ 
        
        return true; 
      }else{
        // Toast.fail('手机号格式不正确');
        return false;
      } 
    }
  },
  mounted(){

    if(sessionStorage.getItem('phone')){
      this.phone =sessionStorage.getItem('phone');
      this.getList();
    }
    
    
  },

  methods: {
    
    getList(){
      axios.post('/openapi/v2/app/complaints/getComplaints',{"telephone":this.phone}).then(res => {
        this.list = res.data.content.complaintsList.map(e => {
          var date = new Date(e.createDate);
          e.createDate = date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8);
          return e
        });
        console.log(this.list)
      })
    },
    onClickResult(item){
      let goWhere = item.status == '02'?'result':'issuccess';
      sessionStorage.setItem("phone",this.phone);

      
      
      this.$router.push({
          path: goWhere,
          query: {
            item:item
          }
        })

    }
  }
};
</script>

<style lang="less">
.search{
  width: 375px;
  height: 100vh;
  text-align: center;
  background-color: #f5f5f9;
  .header{
    background-color: #fff;
    padding: 10px 0;
  }
  .item {
    
    width: 345px;
    border-bottom:1px solid #dddddd;
    margin: 20px auto 20px auto; 
    .van-hairline--top-bottom::after{
      width: 0;
    }
    .van-cell{
      font-size: 17px;
      text-align: left;
    }
    .van-field__control{
      font-size: 15px;
    }
    .van-field__body{
      margin-top: 2px;
    }
  }
  .van-button--normal{
    width: 345px;
    border-radius: 5px;
    display: inline-block;
    font-size: 18px;
  }
  .van-button--primary {
      color: #fff;
      background-color: #21825E;
      border: 0.02667rem solid #21825E;
  }
  .van-button--disabled{
    background-color: #E2E2E3;
    color: #A4A9B0;
    opacity: 1;
    border-color:#E2E2E3;
  }
  .list{
    text-align: left;
    .items{
      background-color: #fff;
      margin-top: 10px;
      padding: 0 10px;
      padding-bottom: 20px;
      font-size: 17px;
      border: 1px solid #ffffff;
      position: relative;
      .time{
        color: #666666;
        margin-top: 25px;
        
      }
      .type{
        margin-top: 4px;
      }
      .areas{
        margin-top: 4px;
      }
      .icon{
        width: 62px;
        height: 62px;
        position: absolute;
        right: 10px;
        top: 0;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  
}

</style>
