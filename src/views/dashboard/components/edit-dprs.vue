<template>
  <Drawer :title="title" v-model="avtive" size="800px" @closeChange="resetForm">
    <div slot="body" v-loading="loading" class="bodys">
      <Uploads
        accept=""
        :fileList.sync="fileList"
        multiple
        :limit="1"
        :disabled="(rows || {}).mode"
      ></Uploads>
    </div>
    <div slot="footer">
      <el-button @click="resetForm" size="small">取消</el-button>
      <el-button
        type="primary"
        @click="submitForm"
        :loading="loading"
        size="small"
        :disabled="(rows || {}).mode"
        >保存</el-button
      >
    </div>
  </Drawer>
</template>

<script>
import { getById, addSave, updateById } from "@/api/user";
export default {
  name: "",
  props: {
    rows: {
      type: Object,
      default: () => {},
    },
    value: Boolean,
  },
  components: {},
  data() {
    return {
      loading: false,
      fileList: [],
    };
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
    title() {
      return Object.keys(this.rows || {})?.length ? "编辑素材" : "新建素材";
    },
  },
  watch: {
    avtive(val) {
      if (val) {
        this.getById();
      }
    },
  },
  mounted() {},
  methods: {
    async getById() {
      if (!Object.keys(this.rows || {}).length) return;
      //   const { data } = await getById({ id: this.rows.id });
      const { name, url, type } = this.rows;
      this.fileList = [{ name, url, type }];
    },
    async submitForm() {
      console.log(this.fileList);
      if (!this.fileList.length) {
        this.$notify({
          title: "提示",
          message: "上传中，请稍等",
          type: "warning",
        });
        return;
      }

      const api = Object.keys(this.rows || {})?.length ? updateById : addSave;
      const { data } = await api({
        ...(this.rows || {}),
        name: this.fileList[0].name,
        url: this.fileList[0].url,
        type: 0,
      });
      this.$notify({
        title: "成功",
        message: "操作成功",
        type: "success",
      });
      this.resetForm();
      this.$emit("close");
    },
    resetForm() {
      this.fileList = [];
      this.avtive = false;
    },
  },
};
</script>
<style scoped lang="scss">
.bodys {
  padding: 0 10px;
}
</style>
