<template>
  <div>
    <el-upload
      action=""
      :list-type="listType"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-error="onRrror"
      :fileList="fileList"
      v-bind="$attrs"
      v-on="$listeners"
      :http-request="uploadRequest"
      :auto-upload="autoUpload"
      :class="{ 'card-class': listType == 'picture-card' }"
      ref="upload"
    >
      <slot>
        <i class="el-icon-plus"></i>
      </slot>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { importImages } from "@/api/user";
export default {
  name: "Upload",
  props: {
    action: {
      type: String,
      default: "",
    },
    fileList: {
      type: Array,
      default: () => [],
    },
    listType: {
      type: String,
      default: "picture-card",
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      uploadList: [],
    };
  },
  computed: {},
  components: {},
  mounted() {},
  methods: {
    onSuccess(url) {
      const list = [...this.fileList, url];
      this.$emit("update:fileList", list);
      this.$notify.success("上传成功");
    },
    onRrror(err, file, fileList) {
      console.log(err, file, fileList);
      this.$notify.success("上传失败");
    },
    async uploadRequest(params) {
      console.log(params, this.fileList);
      this.uploadList.push(params);
      if (!this.autoUpload) return;
      const formData = new FormData();
      formData.append("file", params.file);
      try {
        const { data } = await importImages(formData);
        console.log(data);
        this.onSuccess({
          name: params.file.name,
          type: params.file.type,
          url: data,
        });
      } catch (error) {
        console.log(error);
        this.onError(error, data);
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.$emit(
        "update:fileList",
        fileList.map((it) => {
          return {
            type: 0,
            name: it.name,
            url: it.url,
          };
        })
      );
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async submit() {
      await this.$refs.upload.submit();
      return this.uploadList;
    },
    clearFiles() {
      this.uploadList = [];
      this.$refs.upload.clearFiles();
    },
  },
};
</script>
<style scoped lang="scss">
.card-class {

  ::v-deep .el-upload--picture-card,
  ::v-deep .el-upload-list__item {

    width: 100px;
    height: 100px;
    line-height: 105px;
    .el-upload-list__item-status-label {
      .el-icon-check {
        position: absolute;
        top: 0px;
        left: 13px;
      }
    }
  }
}
</style>
