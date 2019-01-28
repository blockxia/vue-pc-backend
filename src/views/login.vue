<template>
<div id="login">
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="审批人">
      <el-input v-model="formInline.user" placeholder="审批人"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="formInline.region" placeholder="活动区域">
        <el-option label="上海市普陀区金沙江路 1518 弄" value="上海市普陀区金沙江路 1518 弄"></el-option>
        <el-option label="上海市普陀区金沙江路 1516 弄" value="上海市普陀区金沙江路 1516 弄"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="newTableData"
    border
    style="width: 50%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <span>{{scope.row.date}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <span>{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="地址">
      <template slot-scope="scope">
        <span>{{scope.row.address}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="编辑">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small" :class="scope.row.status? 'red' : 'green'">{{scope.row.status | statusT}}</el-button>
        <el-button type="text" size="small" class="orange" @click="handleClickEdit(scope.$index, scope.row)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--弹窗-->
  <el-dialog title="修改" :visible.sync="dialogFormVisible"
             >
    <el-form :model="form">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
         <el-input v-model="form.region" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
  <el-pagination
    background
    layout="prev, pager, next"
    :current-page="pageNum"
    :page-size="pageSize"
    :total="total"
    @current-change="currentChange"
  >
  </el-pagination>
  <!--<i class="el-icon-circle-plus-outline"></i>-->
</div>
</template>
<script>
import {gettableData} from '../api/api'
import {statusT} from '../filter/status'
//  import {setLocal, getLocal} from '../utils/storage'
export default {
  name: 'login',
  data  () {
    return {
      total: 20, // 数据总条数
      pageNum: 1, // 当前页码
      pageSize: 10,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      formInline: {
        user: '',
        region: ''
      },
      flag: true,
      editIndex: '',
      newTableData: [],
//      tableData: [{
//        date: '2016-05-02',
//        name: 'lili',
//        address: '上海市普陀区金沙江路 1518 弄',
//        status: true
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      },
//      {
//        date: '2016-05-04',
//        name: 'zhangsan',
//        address: '上海市普陀区金沙江路 1517 弄',
//        status: false
//      }, {
//        date: '2016-05-01',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1519 弄'
//      }, {
//        date: '2016-05-03',
//        name: '王小虎',
//        address: '上海市普陀区金沙江路 1516 弄'
//      }
//      ]
    }
  },
  created () {
    this.newTableData = this.tableData
  },
  methods: {
    currentChange (page) {
      this.pageNum = page
      console.log(page)
      this.dataList(page)
    },
    dataList (pageNum) {
      const data1 = {
        pageNum: pageNum,
        logSort: this.logSort,
        sort: this.sort,
        pageSize: this.pageSize
      }
      //  请求接口函数胡
      gettableData(data1).then(res => {
        this.tableData = res.page.logs
        this.total = res.total
      }).catch((err) => {
        console.log(err)
      })
    },
    confirm () {
      this.dialogFormVisible = false
      this.tableData[this.editIndex].name = this.form.name
      this.tableData[this.editIndex].address = this.form.region
    },
    handleClick (row) {
      this.flag = !this.flag
      if (this.flag) {
        row.status = row.status
      } else {
        row.status = !row.status
      }
      this.flag = true
      //  console.log(row.status)
    },
    handleClickEdit (index, row) {
      this.editIndex = index
      this.dialogFormVisible = true
      this.form.name = row.name
      this.form.region = row.address
    },
    onSubmit () {
      this.newTableData = []
      this.newTableData = this.tableData.filter((item, index) =>
        (item.name === this.formInline.user && item.address === this.formInline.region))
    }
  },
  filters: {
    statusT
  }
}
</script>
<style lang="less" scoped>
@import "../assets/less/common";
#login{
  .el-icon-circle-plus-outline{
    font-size: 50px;
    //  color:red;
  }
  .red{
    color: red;
  }
  .green{
    color: #57ff6b;
  }
  .orange{
    color:orange;
  }
}
</style>
