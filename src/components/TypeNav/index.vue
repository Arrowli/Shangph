<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div
      class="container"
      @mouseenter="ShowCategorys"
      @mouseleave="hideCategorys"
    >
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition-group name="sort">
        <div class="sort" v-if="isShow" key="1" >
          <div class="all-sort-list2" @click="search">
            <div
              class="item bo"
              v-for="(c1, index) in baseCategoryList"
              :key="c1.categoryID"
              :class="{ 'item-on': index === currentIndex }"
              @mouseenter="showCategorys(index)"
            >
              <h3>
                <a 
                :data-categoryName='c1.categoryName'
                :data-category1Id='c1.categoryId'
                >{{ c1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryID"
                  >
                    <dt>
                      <a 
                      :data-categoryName="c2.categoryName"
                      :data-category2Id="c2.categoryId"
                      >{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryID">
                        <a 
                        :data-categoryName="c3.categoryName"
                        :data-category3Id="c3.categoryId"
                        >{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",

  data() {
    return {
      currentIndex: -1, // 当前一级分类的下标(基2/3级分类需要显示)
      isShow: false, // 是否显示一级列表
    };
  },

  mounted() {
    this.isShow = this.$route.path === "/home";
  },

  computed: {
    ...mapState({
      // 读取home模块的所有分类数组
      baseCategoryList: (state) => state.home.baseCategoryList,
    }),
  },

  methods: {
    showCategorys: throttle(function (index) {
      this.currentIndex = index;
    }, 200), //鼠标移动的快，2s以内，只发一次请求


    //进行路由跳转的回调函数
    search(event){
      //event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
      let node = event.target
      //给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性，别的标签名字----dataset纯属扯淡
      let {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = node.dataset;

      //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
      //当前这个if语句：一定是a标签才会进入
      if(categoryname) {
        //准备路由跳转的参数对象
        let location = { name: 'search' }
        let query = { categoryName: categoryname}
        //一定是a标签：一级目录
        if(category1id){
          query.category1Id = category1id
        }else if (category2id) {
          query.category2Id = category2id;
          //一定是a标签：三级目录
        } else {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        // console.log('1212',location)
        if(this.$route.params) {
          location.params = this.$route.params
          //动态给location配置对象添加query属性
          location.query = query
          //路由跳转
          this.$router.push(location)
        }
      }

    },

    //当鼠标移入的时候，让商品分类列表进行展示
    ShowCategorys(){
      if (this.$route.path != "/home") {
        this.isShow = true;
      }
    },

    hideCategorys() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },


  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      // overflow: hidden;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;
              height: 464px;
              overflow-y: scroll;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
          &.item-on {
            background-color: skyblue;
          }
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter,
    .sort-leave-to {
      height: 0;
    }
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.2s linear;
    }
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
  }
}
</style>
