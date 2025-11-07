<template>
  <div class="add-new-user-page container">
    <!-- 页面头部：返回图标+面包屑 与 标题同行，标题居中 -->
    <div class="page-header row">
      <div class="header-left col-md-4">
        <router-link to="/Users_1">
            <img src="./left.png" alt="">
        </router-link>
      </div>
      <h1 class="page-title col-md-4 text-center">{{ pageTitle }}</h1>
      <div class="header-right col-md-4"></div>
    </div>
    
    <!-- 表单区域 -->
    <form class="user-form">
      <!-- 第一行3个输入框 -->
      <div class="form-row row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" class="form-control" id="firstName" placeholder="Enter First Name" v-model="form.firstName">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" class="form-control" id="lastName" placeholder="Enter Last Name" v-model="form.lastName">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="userId">User ID *</label>
            <input type="text" class="form-control" id="userId" placeholder="Enter User ID" v-model="form.userId">
          </div>
        </div>
      </div>
      
      <!-- 第二行3个输入框 -->
      <div class="form-row row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="badgeId">Badge ID</label>
            <input type="text" class="form-control" id="badgeId" placeholder="Enter Badge ID" v-model="form.badgeId">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="pin">Pin # *4 digits minimum</label>
            <input type="text" class="form-control" id="pin" placeholder="Enter your pin" v-model="form.pin">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="role">Role *</label>
            <select class="form-control" id="role" v-model="form.role">
              <option value="">Select Role</option>
              <option value="temporary">Temporary</option>
              <option value="fullTime">Full Time</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- 设备管理：文字在单选框上方 -->
      <div class="form-group">
        <label>Note: Will Show list of all selected device types for the user.</label>
        <div class="device-management-label">Device Management</div>
        <div class="radio" v-for="option in deviceManagementOptions" :key="option.value">
          <label>
            <input type="radio" name="deviceManagement" :value="option.value" v-model="form.deviceManagement">
            {{ option.label }}
          </label>
        </div>
      </div>
      
      <!-- 最后一组：单选框与下拉框同行 -->
      <div class="form-group last-group">
        <label>Multiple Device Check-Out *</label>
        <div class="row inline-group">
          <div class="col-md-4">
            <div class="radio radio-inline">
              <label>
                <input type="radio" name="multipleDeviceCheckout" value="no" v-model="form.multipleDeviceCheckout">
                No
              </label>
            </div>
            <div class="radio radio-inline">
              <label>
                <input type="radio" name="multipleDeviceCheckout" value="yes" v-model="form.multipleDeviceCheckout">
                Yes
              </label>
            </div>
          </div>
          <div class="col-md-8" v-if="form.multipleDeviceCheckout === 'yes'">
            <select class="form-control" v-model="form.deviceCount">
              <option value="">Select Count</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- 保存按钮 -->
      <div class="save-btn-container text-right">
        <button type="button" class="btn btn-primary" @click="showConfirmDialog">Save</button>
      </div>
    </form>
    
    <!-- 弹框 -->
    <div class="modal fade" :class="{ 'in': dialogVisible }" :style="{ display: dialogVisible ? 'block' : 'none' }">
      <div class="modal-dialog" style="width: 450px;">
        <div class="modal-content" style="border-radius: 12px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);">
          <div class="modal-body" style="text-align: center; padding: 30px 24px;">
            <div class="dialog-icon" style="margin-bottom: 18px;">
              <span class="glyphicon glyphicon-exclamation-sign" style="font-size: 45px; color: #ff4d4f;"></span>
            </div>
            <p class="dialog-text">
              <strong style="display: block; font-size: 1.8rem; margin-bottom: 18px;">Are you Sure?</strong>
              <strong style="font-weight: 700; color: #000 !important;">Do you really want to delete this User "{{ form.firstName }} {{ form.lastName }}"?</strong>
            </p>
            <p class="dialog-text" style="font-weight: 700; color: #000 !important;">This process cannot be Undone.</p>
          </div>
          <div class="modal-footer" style="justify-content: center; border-top: none; padding: 12px 15px 30px;">
            <button type="button" class="btn btn-primary" @click="dialogVisible = false">Cancel</button>
            <button type="button" class="btn btn-danger" @click="handleConfirmDelete">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="modal-backdrop fade" :class="{ 'in': dialogVisible }" :style="{ display: dialogVisible ? 'block' : 'none' }" v-if="dialogVisible"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      pageTitle: 'Add New User',
      dialogVisible: false,
      form: {
        firstName: '',
        lastName: '',
        userId: '',
        badgeId: '',
        pin: '',
        role: '',
        deviceManagement: 'anyLocker',
        multipleDeviceCheckout: 'yes',
        deviceCount: ''
      },
      deviceManagementOptions: [
        { label: 'Any Locker', value: 'anyLocker' },
        { label: 'Assigned Locker', value: 'assignedLocker' },
        { label: 'Groups', value: 'groups' }
      ]
    };
  },
  methods: {
    showConfirmDialog() {
      this.dialogVisible = true;
    },
    handleConfirmDelete() {
      // 实际删除逻辑
      console.log('Deleting user data:', this.form);
      this.dialogVisible = false;
      // 可扩展：删除成功后的提示
      // this.$message({ type: 'success', message: 'User deleted' })
    },
    handleBack() {
      console.log('返回上一页');
    }
  }
};
</script>

<style scoped>
@media (min-width: 1200px) {
    .container {
        width: 1280px!important;
    }
}
.add-new-user-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.back-icon {
  font-size: 18px;
  color: #666;
  cursor: pointer;
}

.back-icon:hover {
  color: #1890ff;
}

.page-title {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.header-right {
  width: 120px;
}

.user-form {
  width: 100%;
}

.form-row {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px !important;
}

.device-management-label {
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
  display: block;
}

.radio {
  margin-bottom: 8px;
}

.last-group {
  margin-top: 10px !important;
}

.inline-group {
  display: flex;
  align-items: center;
}

.save-btn-container {
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.dialog-text {
  color: #333;
  line-height: 1.8;
  margin: 8px 0;
  text-align: center;
  font-size: 14px;
}

.btn-primary {
  background-color: #0C306C !important;
  border-color: #0C306C !important;
  color: #FFF !important;
}

.modal-footer {
  display: flex;
  gap: 16px;
}
</style>