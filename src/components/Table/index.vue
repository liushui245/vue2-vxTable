<template>
  <el-table
    :data="data"
    :border="true"
    v-on="$listeners"
    v-bind="$attrs"
    tooltip-effect="dark"
    class="table"
  >
    <el-table-column type="selection" width="40" fixed> </el-table-column>
    <el-table-column
      type="index"
      label="序号"
      width="50"
      align="center"
      fixed
    ></el-table-column>
    <template v-for="item in column">
      <el-table-column
        v-if="item.slot"
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <slot
            :item="item"
            :name="item.prop"
            :row="scope.row"
            :index="scope.$index"
          ></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </template>
    <el-table-column
      label="操作"
      fixed="right"
      width="200"
      v-if="isProp(['handle'])"
    >
      <template slot-scope="scope">
        <slot
          name="handle"
          :row="scope.row"
          :column="scope.column"
          :index="scope.index"
        ></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Table",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    column() {
      const column = this.columns.filter((it) => !["handle"].includes(it.prop));
      return column;
    },
    isProp() {
      return function (nameList) {
        return this.columns.some((it) => nameList.includes(it.prop));
      };
    },
  },
  components: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
.el-popover.context-menu {
  padding: 0;
  .context-menu {
    border: none;
  }
  .button,
  .el-button {
    width: 100%;
    height: 100%;
    padding: 0 0 0 15px !important;
    font-weight: normal;
    text-align: left;
    background: none;
    border: none;
    &.but-primary {
      color: var(--color-text-primary);
    }
    &:hover {
      background: none;
      box-shadow: none;
      color: var(--color-primary);
      font-weight: bold;
    }
    &.is-disabled {
      color: var(--color-text-disabled);
    }
  }
}
.context-menu {
  min-width: 105px;
  text-align: left;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  &.context-menu_acctive {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    .context-menu__item {
      &:first-child {
        border-top-left-radius: 0;
      }
      &:last-child {
        border-bottom-right-radius: 0;
      }
    }
  }
  &.context-menu_issub {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  .context-menu__item {
    z-index: 0;
    display: flex;
    height: 34px;
    padding: 0;
    font-size: 12px;
    line-height: 34px;
    text-indent: 15px;
    vertical-align: middle;

    // margin: -1px;
    cursor: pointer;
    border: 1px solid transparent;
    border-bottom: 1px solid var(--color-border);
    justify-content: space-between;
    align-items: center;
    // text-indent: 10px;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      border-bottom: none;
    }
    &.context-menu__item_active,
    &:hover {
      position: relative;
      z-index: 3000;
      background: #ecf2f7;
      border: 1px solid var(--color-primary);
      font-weight: bold;
      color: var(--color-primary);
      &:first-child {
        border-top-right-radius: var(--border-radius);
        border-top-left-radius: var(--border-radius);
      }
      &:last-child {
        border-bottom-right-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      .el-button {
        span {
          color: var(--color-primary);
        }
      }
    }
    &.is-disabled {
      color: #cfcfcf;
      cursor: not-allowed;
      background: #ecf2f7;
      .el-button {
        color: #cfcfcf;
        background: none;
        &:hover {
          background: none;
        }
      }
    }
  }
  .context-menu__item-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
}
</style>
<style scoped lang="scss">
::v-deep.el-table {
  th {
    background-color: #f4f8fb;
  }

  th,
  td {
    padding: 3px 0;
  }
}
::v-deep .table_operate_more {
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  i {
    color: #a1a8b5;
  }
  .svg-icon {
    vertical-align: -3px;
    fill: #a1a8b5;
  }
  &:hover {
    cursor: pointer;
    border-color: var(--color-primary);
    i {
      color: var(--color-primary);
    }
    .svg-icon {
      fill: var(--color-primary);
    }
  }
}
::v-deep .table-operate__box {
  .button__text {
    font-weight: bold;
    color: #8181a5;
  }
  .button:hover:not(.button__primary) {
    .button__text {
      color: var(--color-primary);
    }
  }
  .button__text {
    font-weight: bold;
    color: #8181a5;
  }
  .button.is-disabled {
    .button__text {
      color: var(--color-text-disabled);
    }
  }
  .button__primary {
    .button__text {
      color: #fff;
    }
  }
}
</style>
