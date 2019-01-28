<template>
<div id="index">
  <!--日期和正则判断-->
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" label-height="50px" class="demo-ruleForm">
    <el-form-item  label="企业员工数">
      <el-col :span="4">
        <el-form-item prop="date2">
          <el-input-number v-model="num8" controls-position="right" @change="handleChange" :min="1">
          </el-input-number>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item  label="任务发布日" required>
      <el-col :span="3">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="report">导出</el-button>
    </el-form-item>
  </el-form>
  <!--文件上传-->
  <template>
    <div>

      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        border
        style="width: 80%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button type="primary" @click="importData">导入</el-button>
        <el-button type="primary" @click="outportData">导出</el-button>
      </div>

      <!-- 导入 -->
      <el-dialog title="导入" :visible.sync="dialogImportVisible" :modal-append-to-body="false" :close-on-click-modal="false" class="dialog-import">
        <div :class="{'import-content': importFlag === 1, 'hide-dialog': importFlag !== 1}">
          <el-upload class="upload-demo"
                     :action="importUrl"
                     :name ="name"
                     :headers="importHeaders"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :before-upload="beforeUpload"
                     :on-error="uploadFail"
                     :on-success="uploadSuccess"
                     :file-list="fileList"
                     :with-credentials="withCredentials">
            <!-- 是否支持发送cookie信息 -->
            <el-button size="small" type="primary" :disabled="processing">{{uploadTip}}</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
          </el-upload>
          <div class="download-template">
            <a class="btn-download" @click="download">
              <i class="icon-download"></i>下载模板</a>
          </div>
        </div>
        <div :class="{'import-failure': importFlag === 2, 'hide-dialog': importFlag !== 2}" >
          <div class="failure-tips">
            <i class="el-icon-warning"></i>导入失败</div>
          <div class="failure-reason">
            <h4>失败原因</h4>
            <ul>
              <li v-for="(error,index) in errorResults" :key="index">第{{error.rowIdx + 1}}行，错误：{{error.column}},{{error.value}},{{error.errorInfo}}</li>
            </ul>
          </div>
        </div>
      </el-dialog>

      <!-- 文件上传---导出 -->
      <el-upload class="upload-demo"
                 :action="importUrl"
      :name ="name"
      :headers="importHeaders"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-error="uploadFail"
      :on-success="uploadSuccess"
      :file-list="fileList"
      :with-credentials="withCredentials">
      </el-upload>
    </div>
  </template>
  <!--echarts-->
  <Echarts/>
</div>
</template>
<script>
import Echarts from '../components/echartsReport.vue'
export default {
  name: 'index',
  data  () {
    return {
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],
      importUrl: 'www.baidu.com', //  后台接口config.admin_url+'rest/schedule/import/'
      importHeaders:{
        enctype:'multipart/form-data',
        cityCode:''
      },
      name: 'import',
      fileList: [],
      withCredentials: true,
      processing: false,
      uploadTip: '点击上传',
      importFlag: 1,
      dialogImportVisible: false,
      errorResults: [],
      num8: 1,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'string' }
        ]
      }
    }
  },
  methods: {
    handleChange () {
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      //复选框选择回填函数,val返回一整行的数据
      this.multipleSelection = val;
    },
    importData () {
      this.importFlag = 1
      this.fileList = []
      this.uploadTip = '点击上传'
      this.processing = false
      this.dialogImportVisible = true
    },
    outportData () {
      scheduleApi.downloadTemplate()
    },
    handlePreview (file) {
      //可以通过 file.response 拿到服务端返回数据
    },
    handleRemove (file, fileList) {
      //文件移除
    },
    beforeUpload (file){
      //上传前配置
      this.importHeaders.cityCode='上海'//可以配置请求头
      let excelfileExtend = ".xls,.xlsx"//设置文件格式
      let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (excelfileExtend.indexOf(fileExtend) <= -1) {
        this.$message.error('文件格式错误')
        return false
      }
      this.uploadTip = '正在处理中...'
      this.processing = true
    },
    //  上传错误
    uploadFail (err, file, fileList) {
      this.uploadTip = '点击上传'
      this.processing = false
      this.$message.error(err)
    },
    //  上传成功
    uploadSuccess (response, file, fileList) {
      this.uploadTip = '点击上传'
      this.processing = false
      if (response.status === -1) {
        this.errorResults = response.data
        if (this.errorResults) {
          this.importFlag = 2
        } else {
          this.dialogImportVisible = false
          this.$message.error(response.errorMsg)
        }
      } else {
        this.importFlag = 3
        this.dialogImportVisible = false
        this.$message.info('导入成功')
        this.doSearch()
      }
    },
    //  下载模板
    download () {
      //调用后台模板方法,和导出类似
      scheduleApi.downloadTemplate()
    },
    report () {
      window.location.href = '/api/monthlystatement/checkboxExport?userCode='
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {
    Echarts
  }
}
</script>
<style lang="less">
@import "../assets/less/common";
label{
  width: 135px;
}
#index{
  .hide-dialog{
    display:none;
  }
}
</style>
