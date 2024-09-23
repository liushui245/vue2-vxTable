<template>
  <el-drawer
    class="drawer"
    :visible.sync="avtive"
    :with-header="false"
    :show-close="false"
    :wrapperClosable="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="drawer-main">
      <div class="drawer-main-header">
        <slot name="header">
          <div>{{ title }}</div>
          <div class="close" @click="closeChange">
            <svg-icon iconClass="close"></svg-icon>
          </div>
        </slot>
      </div>
      <div class="drawer-main-body">
        <slot name="body"></slot>
      </div>
      <div class="drawer-main-footer" v-if="isFooter">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "Drawer",
  props: {
    title: String,
    value: Boolean,
    isFooter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    avtive: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  components: {},
  mounted() {},
  methods: {
    closeChange() {
      this.avtive = false;
      this.$emit("closeChange");
    },
  },
};
</script>
<style scoped lang="scss">
.drawer-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: var(--one-hundred-vh);
  overflow: hidden;
  .drawer-main-header {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid var(--color-border);
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    .close {
      cursor: pointer;
    }
  }
  .drawer-main-body {
    flex: 1;
    padding: 10px 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .drawer-main-footer {
    height: 40px;
    padding: 5px;
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: end;
    ::v-deep button {
      min-width: 100px;
    }
  }
}
</style>
