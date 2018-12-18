<template>
    <div class="complaint">
        <div class="from">
            <div class="item">
                <div class="left">所属行政区</div>
                <div @click="getAreasList()" class="right">
                    <div  v-if="from.districtCode == ''"  >请选择所属行政区</div>
                    <div style="color:#333333;" v-if="from.districtCode != ''">{{brName}}</div>
                    <div class="icon"></div>
                </div>
            </div>
            <div class="item">
                <div class="left">投诉类型</div>
                <div @click="getType()" class="right">
                    <div v-if="from.type == ''">请选择投诉的类型</div>
                    <div style="color:#333333;" v-if="from.type != ''">{{from.type}}</div>
                    <div class="icon"></div>
                </div>
            </div>
            <div class="item  noborder">
                <div class="left">投诉原因</div>
                <div class="right">
                </div>

            </div>
            <div class="textInpu">
                <van-cell-group>
                <van-field
                    v-model="from.complainReason"
                    type="textarea"
                    placeholder="请输入留言"
                    rows="8"
                    @input="changeMessage()"
                />
                </van-cell-group>
                <div class="codeCount">{{from.complainReason.length}}/150</div>
            </div>
            <div class="item  noborder">
                <div class="left">上传图片</div>
                <div class="right">
                </div>
            </div>
            <div class="photosBox">
                <div v-for="(item,i) in from.files" :key="item.id" class="imgbox">
                    <img  @click="imagePreview" :src="item" alt="">
                    <div @click="deleteImg(i)" class="icon"></div>
                </div>
                <div v-if="from.files.length<3" class="addPhotos">
                    <van-uploader :after-read="onRead">
                        <van-icon name="photograph" />
                    </van-uploader>
                    <div class="imgaddicon"></div>
                </div>
            </div>
            <div class="item nameOrTel  ">
                <div class="left">姓名</div>
                <div class="right">
                    <van-cell-group>
                        <van-field v-model="from.userName" placeholder="请输入用户名" />
                    </van-cell-group>
                </div>
            </div>
            <div class="item nameOrTel ">
                <div class="left">联系电话</div>
                <div class="right">
                    <van-cell-group>
                        <van-field v-model="from.telephone" placeholder="请输入您的手机号码" />
                    </van-cell-group>
                </div>
            </div>
            <div class="item nameOrTel ">
                <div class="left">验证码</div>
                <div class="right">
                    <van-cell-group>
                        <van-field  v-model="from.code" placeholder="请输入验证码" />
                    </van-cell-group>
                    <div @click="countDown()" v-if="second==60" class="codeBtn">获取验证码</div>
                    <div v-if="second<60" class="frequency">{{second}}秒后再发送</div>
                </div>
                
            </div>
            <div class="btnBox">
                <div @click="showTips()"  :class="isSubmit?'':'isOK'" class="nextBtn">确认提交</div>
                <div @click="onClickSearch" class="serchBtn">投诉结果查询</div>
            </div>
        </div>

        
        <van-popup v-model="show" position="bottom"   :overlay="true">
            <div class="asdas">
                <div class="head">请选择所属行政区</div>
                <div class="list_b">
                    <div v-for="(item,i) in areasList"   @click="changeArea(i)" :key="item.id" class="item_b">
                        <div :class="checkedIndex == i?'active':''" >{{item.brName}}</div>
                        <div :class="checkedIndex == i?'checket':''" class="checketIcon"></div>
                    </div>
                </div>
            </div>
        </van-popup>

        <van-popup v-model="showType" position="bottom"   :overlay="true">
            <div class="asdas">
                <div class="head">请选择所属行政区</div>
                <div class="list_b">
                    <div v-for="(item,i) in typeList"   @click="changeArea1(i)" :key="item.id" class="item_b">
                        <div :class="checkedIndex1 == i?'active':''" >{{item}}</div>
                        <div :class="checkedIndex1 == i?'checket':''" class="checketIcon"></div>
                    </div>
                </div>
            </div>
        </van-popup>



        <van-popup class="show1" v-model="show1">
            <div class="show1tips">
                <div class="title">提示</div>
            </div>
            <div class="test">
                感谢您对绿色环保事业的积极参与，我们会第一时间进行审核，并及时反馈您处理结果！
            </div>
            <div class="test">
                您可在本页下方的【投诉结果查询】查询本次投诉处理结果
            </div>
            <div  @click="submit" class="iKnowBtn">我知道了 </div>
        </van-popup>




    </div>
</template>
<script>
import {getCitysList} from '../../api'
import axios from 'axios';
import {
  ImagePreview,
  Loading ,
  Uploader,
  Actionsheet,
  Field,
  Popup,
  Picker,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant';
export default {
  components: {
    [ImagePreview.name]:ImagePreview,
    [Loading.name]:Loading,
    [Field.name]: Field,
    [Actionsheet.name]:Actionsheet,
    [Uploader.name]:Uploader,
    [Popup .name]:Popup,
    [Picker .name]:Picker ,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
  },
  data() {
    return {
      columns: ['杭州', '宁波', '温州', '嘉兴', '宁波', '温州', '嘉兴','宁波', '温州', '嘉兴','湖州'],
      message:'',
      userName:'',
      show:false,
      show1:false,
      showType:false,
      
      imgList:[],
      second:60,
      textareaDisable:false,
      areasList:'',
      typeList:'',
      checkedIndex:'-1',
      checkedIndex1:'-1',
      brName:'',
      from:{
        "districtCode":"",
        "telephone":"",
        "type":"",
        "complainReason":"",
        "userName":"",
        "code":"",
        "files":[]
      },

      
    };
  },
  mounted(){
    

   

  },
  computed:{
    
    isSubmit() {
        let str = false;

        this.from.districtCode?str = true: str = false
        this.from.telephone?str = true: str = false
        this.from.type?str = true: str = false
        this.from.complainReason?str = true: str = false
        this.from.userName?str = true: str = false
        this.from.code?str = true: str = false

        return str;
    }
  },

  methods: {
    getAreasList(){
        axios.post('/openapi/v2/app/complaints/list').then(res => {
            this.areasList = res.data.content.districts;
            this.show = true;
        })
    },
    getType(){
        
        axios.post('/openapi/v2/app/complaints/typeList').then(res => {
            this.typeList = res.data.content.typeList;
            this.showType = true;
        })
    },
    //  图片预览
    imagePreview(){
        ImagePreview(this.from.files);
    },
    //  图片删除
    deleteImg(i){
        this.from.files = this.from.files.filter( (e,k) => k!=i)
    },
    //  添加图片
    onRead(file) {
        console.log(file)
        this.from.files.push(file.content)
    },
    // onChange(picker, value, index) {
    //     Toast(`当前值：${value}, 当前索引：${index}`);
    // },
    // onConfirm(value, index) {
    //   Toast(`当前值：${value}, 当前索引：${index}`);
    //   this.show =false;
    // },
    // onCancel() {
    //   Toast('取消');
    //   this.show =false;
    // },
    onClickSearch() {
      this.$router.push('search');
    },
    showTips(){

        if(this.from.districtCode == ''){
            Toast.fail('所在区域不能为空');
            return
        }else if(this.from.type == ''){
            Toast.fail('投诉类型不能为空');
            return
        }else if(this.from.complainReason == ''){
            Toast.fail('请填写投诉原因');
            return
        }else if(this.from.userName == ''){
            Toast.fail('用户名不能为空');
            return
        }else if(!(/^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.from.telephone))){
            Toast.fail('请输入正确手机号');
            return
        }else if(!(/^\d{6}$/).test(this.from.code)){
            Toast.fail('请输入正确的验证码');
            return
        }
        this.show1 =true

        

    },
    // 投诉信息提交
    submit() {

        if(!this.isSubmit){
            return false
        }
        this.show1 = false;
        Toast.loading({
            mask: true,
            duration:0,
            message: '加载中...'
        });
        axios.post('/openapi/v2/app/complaints/submit',JSON.stringify(this.from)).then(res => {
            console.log(res)

            if(res.data.content.status == '02' ){
                alert(1)
                Toast.clear();
                Toast.fail('手机验证码错误');
                
                return
            }

            alert(2)
            Toast.clear();
            Toast.success('提交成功');
            sessionStorage.setItem("phone",this.from.telephone);
            this.$router.push('search');
        })

      
    },
    changeMessage(val){
        if(this.from.complainReason.length >= 150){
            this.from.complainReason = this.from.complainReason.substring(0,150)
        }
    },
    changeArea(i){

        this.checkedIndex = i;
        this.from.districtCode = this.areasList[i].brID;
        this.brName = this.areasList[i].brName;

    },
    changeArea1(i){

        this.checkedIndex1 = i;
        this.from.type = this.typeList[i]

    },
    countDown(){

        if(this.from.telephone){
            axios.post(`/openapi/v2/app/complaints/sendCode`,{"telephone":this.from.telephone}).then(res => {
                console.log(res)
            })
            this.second = this.second-1;
            let time = setInterval(() => {
                if(this.second <= 0){
                    this.second = 60;
                    clearInterval(time)
                    return
                }
                this.second = this.second-1;
                console.log(this.second)
            },1000);

        }else{
            Toast.fail('请输入手机号');

        }
        

    }
  }
};
</script>

<style lang="less">
.complaint {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 375px;
    height: 100vh;
    margin-top: 5px;
    padding-bottom: 150px;
    .isOK{
        background-color: #E2E2E3 !important;
        color: #A4A9B0 !important;
    }
    .item{
        display: flex;
        width: 345px;
        font-size: 17px;
        justify-content: space-between;
        border-bottom: 1px solid #dddddd;
        line-height: 46.5px;
        color: #333333;
        padding: 0 5px;
        margin: 0 auto;
        .right{
            color: #888888;
            display: flex;
            font-size: 15px;
            margin-right: 5px;
            letter-spacing: 0.5px;
        }
        .icon{
            width: 10px;
            height: 10px;
            border: 1px solid #888888;
            transform:rotate(45deg);
            margin-top: 18px;
            border-bottom: none;
            border-left: none;
            margin-left: 5px;
        }
        .frequency{
            font-size: 12px;
        }
    }
    .noborder{
        border-bottom: none !important;
    }
    .addPhotos{
        width: 80px;
        height: 80px;
        background: url('./addPhotos.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        .van-uploader .van-icon-photograph{
            display: none !important;
        }
        .van-uploader{
            width: 100%;
            height: 100%;
        }
    }
    .photosBox{
        display: flex;
        flex-direction: row;
        padding: 15px;
        padding-top: 10px;
        
        .imgbox{
            position: relative;
            margin-right: 15px;

            img{
                width: 80px;
                height: 80px;
                vertical-align: top;
                
            }
            
            .icon{
                width: 15px;
                height: 15px;
                background: url('./del.png') no-repeat;
                background-size: 100% 100%;
                position: absolute;
                right: -7px;
                top: -7px;;
            }
        }

        
    }
    .nameOrTel{
        justify-content: left;
        overflow: hidden;
        position: relative;
        z-index: 999;
            line-height: 50px;

        .van-cell-group{
            background-color: transparent;
        }
        .van-cell{
            margin-top: 4px;
            input{
                background-color: #ffffff;
                color: #333333;
            }
        }
        .right{
            input{
                width: 150px;
                position: relative;
            }
        }
        .left{
            width: 75px;
        }
        .codeBtn{
            font-size: 14px;
            color: #118B66;
            border: 1px solid #118B66;
            border-radius: 4px;
            text-align: center;
            position: absolute;
            right: 0;
            top: 12px;
            line-height: normal;
            padding: 4px 5px;
            
        }
        .codeBtn:active{
            background-color: #118B66;
            color: #ffffff;
        }
    }
    .btnBox{
        text-align: center;
        font-size: 18px;
    }
    .nextBtn{
        width: 345px;
        height: 42px;
        background-color: #118B66;
        color: #ffffff;
        line-height: 42px;
        text-align: center;
        border-radius: 4px;
        display: inline-block;
        margin-top: 26px;
    }
    .serchBtn{
        width: 345px;
        height: 42px;
        background-color: #ffffff;
        color: #118B66;
        line-height: 42px;
        text-align: center;
        border: 1px solid #118B66;
        box-sizing: border-box;
        border-radius: 4px;
        display: inline-block;
        margin-top: 26px;
    }
    .asdas{
        font-size: 12px;
        color: #333333;
        height: 420px;
        background-color: #ffffff;
        
        
        .head{
            font-size: 17px;
            text-align: center;
            margin-top: 15px;
        }
        .list_b{
            height: 90%;
            overflow: scroll;

        }
        .item_b{
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            padding: 8px 15px; 
            .checketIcon{
                width: 15px;
                height: 15px;
                margin-top: 3px;
                
                border: 1px dashed #dddddd;
            }
            .checket{
                background: url('./active.png') no-repeat;
                background-size: 100% 100%;
            }
            .active{
                color: #118B66;
            }
        }
        
    }
    .show1{
        border-radius: 7.5px;
        background-color: #F7F7F7;
        .test{
            font-size: 13px;
            padding: 10px 10px 0px 10px;

        }

    }
    .show1tips{
        width: 270px;
        .title{
            text-align: center;
            font-size: 17px;
            color: #333333;
            margin-top: 22.5px;
        }
        
        
        
    }
    .iKnowBtn{
        line-height: 45px;
        border-top: 1px solid #cccccc;
        height: 45px;
        text-align: center;
        color: #00A0E9;
        font-size: 17px;
        margin-top: 20px;
    }



}

.textInpu{
    width: 346px;
    // height: 120px;
    position: relative;
    margin: 0 auto;
    .van-cell{
        padding: 0;
    }
    .codeCount{
        position: absolute;
        right: 10px;
        bottom: 0px;
        color: #888888;
        font-size: 15px;
        letter-spacing: -2px;
    }
    
}
.van-cell__value--alone{
    color: #888888;
    background-color: #F5F5F9;
    font-size: 15px !important;
    
}
.van-hairline--top-bottom::after{
    border: none !important;
    
}
.van-field--min-height .van-field__control{
    text-indent: 5px;
    line-height: 17px;
    padding:  5px;
    color: #333333;
    padding-top: 10px;
}
.van-popup--bottom{
    border-radius: 8px 8px 0 0;
}
</style>
