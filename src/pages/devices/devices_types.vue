<template>
  <div class="device-types-container container">
    <!-- 顶部导航和操作区 -->
    <div class="header row">
      <router-link to="/devices">
        <img src="../img/left.png" alt="">
      </router-link>
     
      <h1 class="page-title text-center">Device Types</h1>
      <div class="action-buttons col-md-offset-9">
        <button 
          class="btn btn-primary add-button"
          @click="handleAdd"
        >
          Add New Device Type
        </button>
        <div class="csv-buttons">
          <button type="button" class="btn text-orange">Import File</button>
        <button type="button" class="btn text-blue">Export File</button>
        </div>
      </div>
    </div>

    <!-- 设备类型表格 -->
    <div class="table-wrapper">
      <table class="table table-striped device-table">
        <thead class="table-header">
          <tr>
            <th class="first-column">Device Type</th>
            <th>Check out current</th>
            <th>Fully charged current</th>
            <th>Number of Devices</th>
            <th class="last-column">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in deviceTypes" :key="device.id">
            <td>{{ device.type }}</td>
            <td>{{ device.checkoutCurrent }}</td>
            <td>{{ device.fullyChargedCurrent }}</td>
            <td>{{ device.deviceCount }}</td>
            <td>
              <button 
                class="btn btn-sm edit-btn"
                @click="handleEdit(device)"
              >
                Edit
              </button>
              <button 
                class="btn btn-sm delete-btn"
                @click="handleDelete(device)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 新增设备类型弹框 -->
    <div class="modal fade rounded-dialog" tabindex="-1" role="dialog" v-if="addDialogVisible">
      <div class="modal-dialog" role="document" style="width: 500px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="handleCancel">&times;</button>
            <h4 class="modal-title">Add New Device Type</h4>
          </div>
          <div class="modal-body">
            <form ref="formRef" class="add-form">
              <div class="form-group">
                <label for="type">Device Type Name*</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="type"
                  v-model="addDeviceForm.type" 
                  placeholder="Enter device type (e.g. iPhone)"
                >
                <span class="text-danger" v-if="errors.type">{{ errors.type }}</span>
              </div>
              <div class="form-group">
                <label for="checkoutCurrent">Check out current*</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="checkoutCurrent"
                  v-model="addDeviceForm.checkoutCurrent" 
                  placeholder="Enter check out current (e.g. 1500 mA)"
                >
                <span class="text-danger" v-if="errors.checkoutCurrent">{{ errors.checkoutCurrent }}</span>
              </div>
              <div class="form-group">
                <label for="fullyChargedCurrent">Fully charged current*</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="fullyChargedCurrent"
                  v-model="addDeviceForm.fullyChargedCurrent" 
                  placeholder="Enter fully charged current (e.g. 500 mA)"
                >
                <span class="text-danger" v-if="errors.fullyChargedCurrent">{{ errors.fullyChargedCurrent }}</span>
              </div>
              <div class="form-group">
                <label for="deviceCount">Number of Devices*</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="deviceCount"
                  v-model="addDeviceForm.deviceCount" 
                  placeholder="Enter number of devices (e.g. 1651)"
                  min="0"
                >
                <span class="text-danger" v-if="errors.deviceCount">{{ errors.deviceCount }}</span>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="handleCancel">Cancel</button>
            <button type="button" class="btn btn-primary" @click="handleSave">Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑设备类型弹框 -->
    <div class="modal fade rounded-dialog" tabindex="-1" role="dialog" v-if="editDialogVisible">
      <div class="modal-dialog" role="document" style="width: 500px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="handleEditCancel">&times;</button>
            <h4 class="modal-title">Edit Device Type</h4>
          </div>
          <div class="modal-body">
            <form ref="editFormRef" class="add-form">
              <div class="form-group">
                <label for="editType">Device Type Name*</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="editType"
                  v-model="editDeviceForm.type" 
                  placeholder="Enter device type (e.g. iPhone)"
                >
                <span class="text-danger" v-if="editErrors.type">{{ editErrors.type }}</span>
              </div>
              <div class="form-group">
                <label for="editCheckoutCurrent">Check out current*</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="editCheckoutCurrent"
                  v-model="editDeviceForm.checkoutCurrent" 
                  placeholder="Enter check out current (e.g. 1500 mA)"
                >
                <span class="text-danger" v-if="editErrors.checkoutCurrent">{{ editErrors.checkoutCurrent }}</span>
              </div>
              <div class="form-group">
                <label for="editFullyChargedCurrent">Fully charged current*</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="editFullyChargedCurrent"
                  v-model="editDeviceForm.fullyChargedCurrent" 
                  placeholder="Enter fully charged current (e.g. 500 mA)"
                >
                <span class="text-danger" v-if="editErrors.fullyChargedCurrent">{{ editErrors.fullyChargedCurrent }}</span>
              </div>
              <div class="form-group">
                <label for="editDeviceCount">Number of Devices*</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="editDeviceCount"
                  v-model="editDeviceForm.deviceCount" 
                  placeholder="Enter number of devices (e.g. 1651)"
                  min="0"
                >
                <span class="text-danger" v-if="editErrors.deviceCount">{{ editErrors.deviceCount }}</span>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="handleEditCancel">Cancel</button>
            <button type="button" class="btn btn-primary" @click="handleEditSave">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 表格数据
      deviceTypes: [
        { id: 1, type: 'iPhone', checkoutCurrent: '1500 mA', fullyChargedCurrent: '500 mA', deviceCount: 1651 },
        { id: 2, type: 'iPad', checkoutCurrent: '2000 mA', fullyChargedCurrent: '800 mA', deviceCount: 987 },
        { id: 3, type: 'Android Phone', checkoutCurrent: '1800 mA', fullyChargedCurrent: '600 mA', deviceCount: 1243 },
        { id: 4, type: 'Android Tablet', checkoutCurrent: '2500 mA', fullyChargedCurrent: '1000 mA', deviceCount: 756 },
        { id: 5, type: 'Laptop', checkoutCurrent: '6500 mA', fullyChargedCurrent: '1500 mA', deviceCount: 421 },
        { id: 6, type: 'Smart Watch', checkoutCurrent: '300 mA', fullyChargedCurrent: '100 mA', deviceCount: 892 },
        { id: 7, type: 'Bluetooth Speaker', checkoutCurrent: '1200 mA', fullyChargedCurrent: '400 mA', deviceCount: 356 },
      ],

      // 新增弹框相关数据
      addDialogVisible: false,
      addDeviceForm: {
        type: '',
        checkoutCurrent: '',
        fullyChargedCurrent: '',
        deviceCount: 0
      },
      errors: {},

      // 编辑弹框相关数据
      editDialogVisible: false,
      editDeviceForm: {
        id: null,
        type: '',
        checkoutCurrent: '',
        fullyChargedCurrent: '',
        deviceCount: 0
      },
      editErrors: {}
    };
  },

  methods: {
    // 表单验证方法
    validateForm(form, errors) {
      let isValid = true;
      errors.type = form.type ? '' : 'Please enter device type name';
      errors.checkoutCurrent = form.checkoutCurrent ? '' : 'Please enter check out current';
      errors.fullyChargedCurrent = form.fullyChargedCurrent ? '' : 'Please enter fully charged current';
      
      if (form.deviceCount === null || form.deviceCount === undefined || form.deviceCount < 0) {
        errors.deviceCount = 'Number of devices cannot be negative';
        isValid = false;
      } else if (form.deviceCount === '') {
        errors.deviceCount = 'Please enter number of devices';
        isValid = false;
      } else {
        errors.deviceCount = '';
      }
      
      if (errors.type || errors.checkoutCurrent || errors.fullyChargedCurrent) {
        isValid = false;
      }
      
      return isValid;
    },

    // 新增弹框操作方法
    handleAdd() {
      this.addDialogVisible = true;
      this.$nextTick(() => {
        this.resetForm('add');
      });
    },

    handleCancel() {
      this.addDialogVisible = false;
      this.resetForm('add');
    },

    handleSave() {
      if (this.validateForm(this.addDeviceForm, this.errors)) {
        const maxId = this.deviceTypes.reduce((max, item) => Math.max(max, item.id), 0);
        const newDevice = {
          id: maxId + 1,
          type: this.addDeviceForm.type,
          checkoutCurrent: this.addDeviceForm.checkoutCurrent,
          fullyChargedCurrent: this.addDeviceForm.fullyChargedCurrent,
          deviceCount: this.addDeviceForm.deviceCount
        };
        this.deviceTypes.push(newDevice);
        this.$message.success('Device type added successfully!');
        this.addDialogVisible = false;
        this.resetForm('add');
      } else {
        this.$message.error('Please complete all required fields correctly');
      }
    },

    // 编辑弹框操作方法（核心修改）
    handleEdit(row) {
      // 1. 填充选中行的数据到编辑表单
      this.editDeviceForm.id = row.id;
      this.editDeviceForm.type = row.type;
      this.editDeviceForm.checkoutCurrent = row.checkoutCurrent;
      this.editDeviceForm.fullyChargedCurrent = row.fullyChargedCurrent;
      this.editDeviceForm.deviceCount = row.deviceCount;
      
      // 2. 使用 Vue2 的 this.$nextTick 确保数据更新后再显示弹框
      this.$nextTick(() => {
        this.editDialogVisible = true;
      });
    },
    // 编辑取消方法
    handleEditCancel() {
      this.editDialogVisible = false;
      this.$refs.editFormRef && this.$refs.editFormRef.resetFields();
    },

    handleEditSave() {
      if (this.validateForm(this.editDeviceForm, this.editErrors)) {
        // 找到并更新对应的数据
        const index = this.deviceTypes.findIndex(item => item.id === this.editDeviceForm.id);
        if (index !== -1) {
          this.deviceTypes.splice(index, 1, Vue.util.extend({}, this.editDeviceForm));
          this.$message.success('Device type updated successfully!');
          this.editDialogVisible = false;
          this.resetForm('edit');
        }
      } else {
        this.$message.error('Please complete all required fields correctly');
      }
    },

    // 删除操作
    handleDelete(row) {
      this.deviceTypes = this.deviceTypes.filter(item => item.id !== row.id);
      this.$message.success('Device type deleted successfully!');
    },

    // 重置表单
    resetForm(type) {
      if (type === 'add') {
        this.addDeviceForm = {
          type: '',
          checkoutCurrent: '',
          fullyChargedCurrent: '',
          deviceCount: 0
        };
        this.errors = {};
      } else {
        this.editErrors = {};
      }
    }
  }
};
</script>

<style scoped>
.device-types-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}
.header {
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.back-button {
  color: #606266;
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  margin-right: 10px;
  margin-top: 2px;
}
.page-title {
  font-size: 25px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  position: absolute;
  left: 46%;
  transform: translateX(-50%);
}
.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  margin-left: auto;
}
.add-button {
  background-color: #0C306C;
  border-color: #0C306C;
  color: #fff;
  font-weight: 600;
  padding: 8px 16px;
}
.csv-buttons {
  display: flex;
  gap: 15px;
  margin-top: 5px;
}
.text-orange {
    font-weight: 600;
  color: #FF9900 !important;
  background-color: transparent;
  border: none;
}

.text-blue {
    font-weight: 600;
  color: #7389A3 !important;
  background-color: transparent;
  border: none;
}
.table-wrapper {
  max-height: 400px;
  overflow: auto;
  display: inline-block;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}
.table-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.table-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.table-wrapper::-webkit-scrollbar-thumb {
  background: #2C4F9E;
  border-radius: 4px;
}
.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: #2C4F9E;
}
.device-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
.table-header th {
  background-color: #C7EDFF !important;
  color: #000 !important;
  font-weight: 500;
  padding: 12px;
  border: none;
  border-bottom: 1px solid #e4e7ed;
}
.table-header th.first-column {
  border-top-left-radius: 8px;
}
.table-header th.last-column {
  border-top-right-radius: 8px;
}
.device-table td {
  padding: 12px;
  border: none;
  border-bottom: 1px solid #e4e7ed;
}
.edit-btn {
  background-color: #fff7e8;
  border-color: #ffbb50;
  color: #fa8c16;
  margin-right: 8px;
}
.delete-btn {
  background-color: #fff1f0;
  border-color: #FF0000;
  color: #FF0000;
}

/* 弹框样式 */
.rounded-dialog .modal-content {
  border-radius: 12px;
  overflow: hidden;
}
.rounded-dialog .modal-footer {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px;
}
.add-form {
  margin-top: 20px;
}
.add-form .form-group {
  margin-bottom: 20px;
}
.add-form input.form-control {
  width: 100%;
}
.text-danger {
  font-size: 12px;
  margin-top: 5px;
  display: block;
}
</style>