<template>
  <Drawer
    title="上传视频"
    v-model="avtive"
    size="800px"
    @closeChange="resetForm"
  >
    <div slot="body" v-loading="loading" class="bodys">
      <Uploads
        accept=""
        :fileList.sync="fileList"
        multiple
        :limit="1"
      ></Uploads>
    </div>
    <div slot="footer">
      <el-button @click="resetForm" size="small">取消</el-button>
      <el-button @click="changeForm" size="small" type="primary">提交</el-button>
    </div>
  </Drawer>
</template>

<script>
import { videoCommitRecordApiSave } from "@/api/user";
export default {
  name: "",
  props: {
    value: Boolean,
    list: {
      type: Array,
      default: () => [],
    },
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
  },

  mounted() {},
  methods: {
    async changeForm() {
      if (!this.fileList.length) {
        this.$notify({
          title: "提示",
          message: "上传视频中，请稍等",
          type: "warning",
        });
        return;
      }
      const userInfo = JSON.parse(sessionStorage.getItem("user"));
      console.log(userInfo);
      const { data } = await videoCommitRecordApiSave({
        sourceIdList: this.list,
        ...([1, 2].includes(userInfo.role)
          ? { userId: userInfo.userId }
          : { teacherUserId: userInfo.userId }),
        url: this.fileList[0].url,
      });
      this.$notify({
        title: "成功",
        message: "操作成功",
        type: "success",
      });
      this.resetForm();
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
