<template>
    <div class="complaint">
        <div class="from">
            <div class="item">
                <div class="left">所属行政区</div>
                <div class="right">
                    
                    <div  @click="show =true"  >请选择所属行政区</div>
                    <div class="icon"></div>
                </div>
            </div>
            <div class="item">
                <div class="left">投诉类型</div>
                <div class="right">
                    <div>请选择投诉的类型</div>
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
                    v-model="message"
                    type="textarea"
                    placeholder="请输入留言"
                    rows="6"
                />
                </van-cell-group>
            </div>
            <div class="item  noborder">
                <div class="left">上传图片</div>
                <div class="right">
                </div>

            </div>
            <div class="addPhotos"></div>

            <div class="item nameOrTel  ">
                <div class="left">姓名</div>
                <div class="right">
                    <van-cell-group>
                        <van-field v-model="userName" placeholder="请输入用户名" />
                    </van-cell-group>
                </div>
            </div>
            <div class="item nameOrTel ">
                <div class="left">联系电话</div>
                <div class="right">
                    <van-cell-group>
                        <van-field v-model="userName" placeholder="请输入您的手机号码" />
                    </van-cell-group>
                </div>
            </div>
            <div class="item nameOrTel ">
                <div class="left">验证码</div>
                <div class="right">
                    <van-cell-group>
                        <van-field v-model="userName" placeholder="请输入验证码" />
                    </van-cell-group>
                    <div class="codeBtn">获取验证码</div>
                </div>
                
            </div>
            <div class="btnBox">
                <div @click="show1 =true" class="nextBtn">下一步</div>
                <div class="serchBtn">投诉结果查询</div>
            </div>

            
            
        </div>

        <van-popup v-model="show" position="bottom" :overlay="false">
            <div class="asdas">
                <van-picker  class="tips" :columns="columns"    show-toolbar @cancel="onCancel" @confirm="onConfirm"  />
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
            <div class="iKnowBtn">我知道了</div>
        </van-popup>

        

    </div>
</template>

<script>
import {
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
    [Field .name]: Field,
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
      goods: {
        title: '美国伽力是是是果（约680g/3个）',
        price: 2680,
        express: '免运费',
        remain: 19,
        thumb: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
        ]
      },
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      message:'',
      userName:'',
      show:false,
      show1:false
    };
  },

  methods: {
    onChange(picker, value, index) {
        Toast(`当前值：${value}, 当前索引：${index}`);
        
    },
      onConfirm(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.show =false;
    },
    onCancel() {
      Toast('取消');
      this.show =false;
    },
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2);
      
    },

    onClickCart() {
      this.$router.push('cart');
    },

    sorry() {
      Toast('暂无后续逻辑~');
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
    padding-bottom: 50px;
    .item{
        display: flex;
        width: 345px;
        font-size: 17px;
        justify-content: space-between;
        border-bottom: 0.5px solid #dddddd;
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

    }
    .noborder{
        border-bottom: none !important;
    }
    .addPhotos{
        width: 80px;
        height: 80px;
        background: url('./addPhotos.png') no-repeat;
        background-size: 100% 100%;
        margin-left: 15px;
    }
    .nameOrTel{
        justify-content: left;
        overflow: hidden;
        position: relative;
        z-index: 99;
            line-height: 50px;

        .van-cell-group{
            background-color: transparent;
        }
        .van-cell{
            margin-top: 10px;
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
            font-size: 15px;
            color: #118B66;
            border: 0.5px solid #118B66;
            border-radius: 4px;
            text-align: center;
            position: absolute;
            right: 0;
            top: 12px;
            line-height: normal;
            padding: 3.5px;
            
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
        border: 0.5px solid #118B66;
        box-sizing: border-box;
        border-radius: 4px;
        display: inline-block;
        margin-top: 26px;
    }
    .asdas{
        font-size: 15px;
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
        border-top: 0.5px solid #cccccc;
        height: 45px;
        text-align: center;
        color: #00A0E9;
        font-size: 17px;
        margin-top: 20px;
    }



}




.textInpu{
    width: 360px;
    height: 120px;
    margin: 0 auto;
    
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
}
</style>
