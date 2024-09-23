<template>
  <div class="pages">
    <div class="pages-head" v-if="cuOption.isHead">
      <slot name="more-head"></slot>
      <div class="">
        <el-button @click="onSerach" size="small" >搜索</el-button>
      </div>
    </div>
    <div class="pages-table" v-if="cuOption.isTable">
      <slot name="more-table"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Pages",
  components: {},
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formModel: {},
      isMore: false,
    };
  },
  computed: {
    cuOption() {
      return {
        isHead: true, //显示按钮
        isSearch: true, // 搜索
        isTable: true,
        searchList: [],
        ...this.option,
      };
    },
  },
  mounted() {},
  methods: {
    onSerach() {
      this.$emit("onSerach", this.formModel);
    },

  },
};
</script>
<style scoped lang="scss">
.pages {
  margin: var(--box-margin);
  min-height: calc(var(--one-hundred-vh) - 50px - 10px);
  background-color: #fff;
  border-radius: var(--border-radius);
  &-head {
    height: 40px;
    padding: var(--box-padding);
    display: flex;
    justify-content: space-between;
  }
  &-search {
    padding: var(--box-padding);
    padding-bottom: 0;
    .search-forms {
      display: flex;
      position: relative;
      overflow: hidden;
      transition: all 0.2s;

      &.search-forms-mr,
      &.search-length {
        .search-form {
          margin-right: 135px;
        }
        .form-s {
          width: 135px;
        }
      }
      .search-form {
        flex: 1;
        margin-right: 210px;
      }
      .form-s {
        width: 210px;
        position: absolute;
        right: 0;
        &.form-s-more {
          width: 135px;
          .btn-more {
            margin-top: 15px;
            margin-left: 30px;
            .svg-icon {
              transform: rotate(180deg);
            }
          }
        }
        .btn-more {
          //   margin-left: 30px;
          display: inline-block;
          font-size: 12px;
          color: #409eff;
          margin-left: 5px;
          cursor: pointer;
          .svg-icon {
            transition: all 0.2s;
            vertical-align: -0.25em;
          }
          &.el-button {
            padding: 6px 9px;
          }
        }
      }
    }
  }
}
</style>
