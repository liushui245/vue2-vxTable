<template>
  <Pages :option="option" @onSerach="onSerach">
    <div slot="more-table">
      <Table
        :columns="columns"
        :data="tabelData"
        :height="`calc(var(--one-hundred-vh) - 102px)`"
        v-loading="loading"
      >
        <template slot="url" slot-scope="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.url"
            fit="scale-down"
          ></el-image>
        </template>
        <template slot="handle" slot-scope="{ row }">
          <el-button @click="onCheck(row, 0)" size="mini"> 查看 </el-button>
        </template>
      </Table>
      <Pagination
        :total="total"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="getvideoCommitRecordApi"
      />
    </div>
    <EditDprs v-model="addElectricShow" :rows="curent" @close="onSerach" />
  </Pages>
</template>

<script>
import { getvideoCommitRecordApi, getDelete } from "@/api/user";
import EditDprs from "./components/edit-dprs.vue";
export default {
  name: "Drainage",
  props: {},
  data() {
    return {
      option: { isHead: false },
      columns: [
        {
          label: "教师名称",
          prop: "teacherName",
        },
        {
          label: "教师用户id",
          prop: "teacherUserId",
        },
        {
          label: "用户id",
          prop: "userId",
        },
        {
          label: "用户名称",
          prop: "userName",
        },
        {
          label: "创建时间",
          prop: "createTime",
        },
        {
          label: "操作",
          prop: "handle",
        },
      ],
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
    };
  },
  computed: {},
  components: { EditDprs },
  mounted() {
    this.getvideoCommitRecordApi();
    console.log(this.$route);
  },
  methods: {
    addTerm() {
      this.curent = {};
      this.addElectricShow = true;
    },
    onCheck(row, mode) {
      this.curent = row;
      this.curent.mode = mode == 0;
      this.addElectricShow = true;
    },
    onSerach(model) {
      this.listQuery = { pageIndex: 1, pageSize: 30 };
      this.tabelData = [];
      this.formModel = model;
      this.getvideoCommitRecordApi();
    },
    async getvideoCommitRecordApi() {
      try {
        this.loading = true;

        const { data } = await getvideoCommitRecordApi({
          ...this.listQuery,
        });
        this.tabelData = data.records || [];
        this.total = data.total || 0;
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
::v-deep .el-upload {
  display: none;
}
.el-button--mini {
  padding: 4px 10px;
}
</style>
