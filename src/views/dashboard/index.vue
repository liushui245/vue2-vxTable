<template>
  <Pages :option="option" @onSerach="onSerach">
    <div slot="more-head">
      <el-button @click="addTerm()" size="small">素材新增</el-button>
    </div>
    <div slot="more-table">
      <Table
        :columns="columns"
        :data="tabelData"
        :height="`calc(var(--one-hundred-vh) - 142px)`"
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
          <el-button @click="onCheck(row, 1)" size="mini" type="primary">
            修改
          </el-button>
          <el-button @click="onDeilt(row)" size="mini" type="danger">
            删除
          </el-button>
        </template>
      </Table>
      <Pagination
        :total="total"
        :page.sync="listQuery.pageIndex"
        :limit.sync="listQuery.pageSize"
        @pagination="getList"
      />
    </div>
    <EditDprs v-model="addElectricShow" :rows="curent" @close="onSerach" />
  </Pages>
</template>

<script>
import { getList, getDelete } from "@/api/user";
import EditDprs from "./components/edit-dprs.vue";
export default {
  name: "Drainage",
  props: {},
  data() {
    return {
      option: {},
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
          slot: true,
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
    this.getList();
    console.log(this.$route);
  },
  methods: {
    async onDeilt(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await getDelete({ id: row.id });
          this.getList();
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
          });
        })
        .catch(() => {});
    },
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
      this.getList();
    },
    async getList() {
      try {
        this.loading = true;

        const { data } = await getList({
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
.el-button--mini {
  padding: 4px 10px;
}
</style>
