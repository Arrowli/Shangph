<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled='pageNo == 1'
      @click="$emit('getPageNo', pageNo - 1)"
    >上一页</button>

    <button v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
    >1</button>

    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->

    <button v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      :class="{active:pageNo == page}"
      @click="$emit('getPageNo', page)"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>

    <button v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)">
      {{ totalPage }}
    </button>

    <button :disabled='pageNo == totalPage'
      @click="$emit('getPageNo', pageNo + 1)"
    >下一页</button>

    <div>
      <span>共{{ totalPage }}页&nbsp;</span>
      <span>共 {{ total }} 条</span>
    </div>
  
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],

  computed: {
    //总共多少页
    totalPage() {
      //向上取整数
      return Math.ceil(this.total / this.pageSize);
    },

    //计算出连续的页码的起始数字与结束数字[连续页码的数字:至少是5]
    startNumAndEndNum() {
      const { pageNo, continues, totalPage } = this;
      //先定义两个变量存储起始数字与结束数字
      let start = 0;
      let end = 0;
      //连续页码数字5【就是至少五页】，如果出现不正常的现象【就是不够五页】
      //不正常现象【总页数没有连续页码多】
      if (totalPage < continues) {
        (start = 1), (end = totalPage);
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);

        //把出现不正常的现象【start数字出现0|负数】纠正
        if(start < 1){
          start = 1
          end = continues
        }

        //把出现不正常的现象[end数字大于总页码]纠正
        if(end > totalPage){
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return {start, end}
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  span {
    line-height: 28px;    
    vertical-align: center;
    color: #ccc;
    &:last-child {
      padding-left: 12px;
    }
  }
}
.active {
  background: skyblue;
}
</style>
