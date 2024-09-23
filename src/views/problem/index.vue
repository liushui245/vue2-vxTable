<template>
  <Pages :option="option">
    <div>
      <Uploads
        accept=""
        :fileList.sync="fileList"
        multiple
        :disabled="true"
      ></Uploads>
      <el-button class="aaa" type="primary" @click="changea"
        >提交视频</el-button
      >
    </div>
    <EditDprs v-model="addElectricShow" :list="listIds" />
  </Pages>
</template>

<script>
import EditDprs from "./components/edit-dprs.vue";
import { getRandList } from "@/api/user";
export default {
  name: "Drainage",
  props: {},
  data() {
    return {
      option: { isHead: false },
      columns: [
        {
          label: "素材名称",
          prop: "name",
        },
        {
          label: "素材类型",
          prop: "type",
        },
        {
          label: "地址",
          prop: "url",
        },
        {
          label: "操作",
          prop: "handle",
        },
      ],
      fileList: [],
      formModel: {},
      tabelData: [],
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 30,
      },
      addElectricShow: false,
      loading: false,
      curent: {},
      listIds: [],
    };
  },
  computed: {},
  components: { EditDprs },
  mounted() {
    this.getRandList();
    console.log(this.$route);
  },
  methods: {
    changea() {
      this.listIds = this.fileList.map((it) => it.id);
      this.addElectricShow = true;
    },
    async getRandList() {
      try {
        this.loading = true;

        const { data } = await getRandList({
          ...this.listQuery,
        });
        this.fileList = data || [];
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.aaa {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.el-button--mini {
  padding: 4px 10px;
}
</style>
