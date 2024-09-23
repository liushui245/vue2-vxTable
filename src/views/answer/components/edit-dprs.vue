<template>
  <Drawer title="查看" v-model="avtive" size="800px" @closeChange="resetForm">
    <div slot="body" v-loading="loading" class="bodys">
      <div class="s">
        <div class="t">使用的题目</div>

        <Uploads
          accept=""
          :fileList="(rows || {}).sourceList"
          multiple
          :disabled="true"
        ></Uploads>
      </div>
      <div class="s">
        <div class="t">提交的答案</div>
        <video
          ref="videoRef"
          :src="(rows || {}).url"
          width="650"
          height="400"
          autoplay
          controls
        ></video>
        <!-- <Uploads
          accept=""
          :fileList="[{ url: (rows || {}).url }]"
          multiple
          :disabled="true"
        ></Uploads> -->
      </div>
    </div>
    <div slot="footer">
      <el-button @click="resetForm" size="small">取消</el-button>
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
.s {
  padding: 10px;
  .t {
    padding-bottom: 10px;
  }
}
</style>
