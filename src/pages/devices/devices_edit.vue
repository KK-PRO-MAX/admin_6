<template>
  <div class="edit-device-page container">
    <!-- 标题栏（含返回箭头和标题） -->
    <div class="header-bar row" @click="handleBack2">
      <div class="col-xs-1">
        <img src="../img/left.png" alt="">
      </div>
      <div class="col-xs-10 text-center">
        <h2 class="page-title">Edit Device</h2>
      </div>
      <div class="col-xs-1"></div>
    </div>

    <!-- 表单容器 -->
    <div class="form-container">
      <!-- 第一行：设备名称、ID、类型 -->
      <div class="form-row row">
        <div class="form-item col-md-4">
          <label class="form-label">Device Name *</label>
          <input 
            v-model="deviceForm.deviceName" 
            class="form-control custom-input"
            type="text"
          >
        </div>
        <div class="form-item col-md-4">
          <label class="form-label">Device ID *</label>
          <input 
            v-model="deviceForm.deviceId" 
            class="form-control custom-input"
            type="text"
          >
        </div>
        <div class="form-item col-md-4">
          <label class="form-label">Device Type *</label>
          <select 
            v-model="deviceForm.deviceType" 
            class="form-control custom-select"
            placeholder="Select type"
          >
            <option value="">Select type</option>
            <option value="iPhone">iPhone</option>
            <option value="iPad">iPad</option>
            <option value="Android Phone">Android Phone</option>
            <option value="Android Tablet">Android Tablet</option>
            <option value="Zebra">Zebra</option>
          </select>
        </div>
      </div>

      <!-- 第二行：分配仓位、条形码 -->
      <div class="form-row row" style="margin-top: 25px;">
        <div class="form-item col-md-6">
          <label class="form-label">Select Assigned Bay *</label>
          <p class="form-note">Note: Every device must have a bay assigned.</p>
          <!-- Bay选择输入框（点击弹出选择框） -->
          <input 
            v-model="deviceForm.assignedBay" 
            class="form-control custom-input bay-input"
            :class="{ 'selected-bay': deviceForm.assignedBay }"
            readonly
            @click="showBayDialog = true"
            type="text"
          >
        </div>
        <div class="form-item col-md-6">
          <label class="form-label">Barcode or NFC *</label>
          <p class="form-note">Note: Enter Barcode or Scan</p>
          <input 
            v-model="deviceForm.barcode" 
            class="form-control custom-input"
            type="text"
          >
        </div>
      </div>

      <!-- 已分配组 -->
      <div class="form-section" style="margin-top: 25px;">
        <label class="form-label">Assigned Groups</label>
        <div class="groups-container">
          <span 
            v-for="group in deviceForm.assignedGroups" 
            :key="group" 
            class="group-tag"
          >
            {{ group }}
          </span>
        </div>
      </div>

      <!-- 保存按钮 -->
       <div class="save-btn-container" style="margin-top: 25px;">
    <button 
      type="button"
      class="btn btn-primary delete-btn"
      @click="handleDelete"
    >
      Delete
    </button>
    <button 
      type="button"
      class="btn btn-primary save-btn"
      @click="handleSave"
    >
      Save
    </button>
  </div>
    </div>

    <!-- Bay选择弹框 -->
    <div class="modal fade" :class="{ 'in': showBayDialog }" tabindex="-1" role="dialog" :style="{ display: showBayDialog ? 'block' : 'none' }">
      <div class="modal-dialog" role="document" style="width: 800px; border-radius: 12px;">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Select Bay</h4>
          </div>
          <div class="modal-body bay-dialog-content">
            <!-- 说明文字 -->
            <p class="bay-description">Please select the bay you want the device to be assigned to</p>
            
            <!-- Bay选择网格 -->
            <div class="bay-grid">
              <button 
                v-for="num in 30" 
                :key="num" 
                :class="['bay-button', { 'selected': selectedBayNum === num }]"
                @click="selectedBayNum = num"
                type="button"
              >
                {{ num.toString().padStart(2, '0') }}
              </button>
            </div>
          </div>
          <div class="modal-footer bay-dialog-actions">
            <button 
              type="button" 
              class="btn btn-default cancel-btn"
              @click="showBayDialog = false"
            >
              Cancel
            </button>
            <button 
              type="button" 
              class="btn btn-primary save-bay-btn"
              @click="confirmBaySelection"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="modal-backdrop fade" :class="{ 'in': showBayDialog }" :style="{ display: showBayDialog ? 'block' : 'none' }" v-if="showBayDialog"></div>
  </div>
</template>

<script>
// import { ArrowLeft } from '@element-plus/icons-vue';

export default {
  name: 'DevicesEdit',
  data() {
    return {
      // 设备表单数据
      deviceForm: {
        id: null,
        deviceName: '',
        deviceId: '',
        deviceType: '',
        assignedBay: '',
        barcode: '',
        assignedGroups: []
      },
      // Bay选择相关
      showBayDialog: false,
      selectedBayNum: 1,
      // 设备列表数据
      devices: []
    };
  },
  computed: {
    // 从当前Bay值提取数字
    initBayNum() {
      const num = parseInt(this.deviceForm.assignedBay.replace('Bay ', ''));
      return isNaN(num) ? 1 : num;
    }
  },
  mounted() {
    // 生成设备数据
    this.devices = this.generateDevices();
    
    // 获取URL中的设备ID参数
    const deviceId = parseInt(this.$route.query.id);
    if (deviceId) {
      // 查找对应的设备数据
      const device = this.devices.find(d => d.id === deviceId);
      if (device) {
        // 填充表单数据
        this.deviceForm = { ...device };
        // 初始化选中的Bay数字
        const num = parseInt(device.assignedBay.replace('Bay ', ''));
        this.selectedBayNum = isNaN(num) ? 1 : num;
      }
    }
  },
  methods: {
    // 生成设备数据
    generateDevices() {
      return Array(6).fill().map((_, index) => ({
        id: index + 1,
        deviceName: `iPhone ${index + 25}`,
        deviceId: `BAY ${index + 25}`,
        assignedBay: `Bay ${index + 25}`,
        deviceType: 'iPhone',
        deviceGroups: 'Day Shift Managers, Staff, Office Staff',
        barcode: `1562-3124-6561-${1331 + index}`,
        assignedGroups: ['Day Shift Managers', 'Staff', 'Office Staff']
      }));
    },
    // 返回操作
    handleBack2() {
      this.$router.push('/devices');
    },
     handleDelete() {
      // 可以在这里添加删除逻辑
      if (confirm('Are you sure you want to delete this device?')) {
        // 实现删除功能的代码
        this.showMessage('Device deleted', 'success');
        this.$router.push('/devices');
      }
    },
    // 保存操作 - 更新数据并返回列表页
    handleSave() {
      // 找到原设备数据并更新
      const index = this.devices.findIndex(d => d.id === this.deviceForm.id);
      if (index !== -1) {
        this.devices.splice(index, 1, { ...this.deviceForm });
      }
      
      // 显示成功消息
      this.showMessage('save ok', 'success');
      // 保存后返回列表页
      this.$router.push('/devices');
    },
    // 确认Bay选择
    confirmBaySelection() {
      this.deviceForm.assignedBay = `Bay ${this.selectedBayNum}`;
      this.showBayDialog = false;
    },
    // 消息提示
    showMessage(message, type = 'info') {
      // 创建消息元素
      const alertEl = document.createElement('div');
      alertEl.className = `alert alert-${type} alert-dismissible`;
      alertEl.role = 'alert';
      alertEl.innerHTML = `
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        ${message}
      `;
      
      // 添加到页面
      document.body.appendChild(alertEl);
      
      // 3秒后自动关闭
      setTimeout(() => {
        $(alertEl).alert('close');
      }, 3000);
    }
  }
};
</script>

<style scoped>
@media (min-width: 1200px) {
    .container {
        width: 100%;
    }
}
.save-btn-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px; /* 添加按钮间距 */
}

.save-btn {
  background-color: #0C306C;
  border-color: #0C306C;
  padding: 10px 24px;
  font-size: 14px;
  border-radius: 4px;
}

.save-btn:hover {
  background-color: #1e293b;
  border-color: #1e293b;
}

/* 删除按钮样式 */
.delete-btn {
  background-color: #dc3545; /* 红色背景 */
  border-color: #dc3545;
  padding: 10px 24px;
  font-size: 14px;
  border-radius: 4px;
}

.delete-btn:hover {
  background-color: #bb2d3b; /* hover时稍深的红色 */
  border-color: #bb2d3b;
}
.edit-device-page {
  padding: 20px;
  max-width: 96%;
  margin: 0 auto;
}

/* 标题栏布局（箭头和标题水平对齐） */
.header-bar {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
  cursor: pointer;
}

.back-arrow {
  font-size: 20px;
  color: #333;
}

.page-title {
  font-size: 24px;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 20px;
  width: 100%;
}

.form-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.form-note {
  font-size: 12px;
  color: #666;
  margin: 0;
  line-height: 1.2;
}

/* 输入框和下拉框统一高度 */
.custom-input, .custom-select {
  height: 44px !important;
  min-height: 44px;
  font-size: 14px;
}

/* Bay输入框样式 */
.bay-input {
  background-color: #f0fdf4 !important;
  cursor: pointer;
}

/* 选中Bay后的样式（虚线边框+绿色背景） */
.selected-bay {
  border-style: dashed !important;
  border-color: #22c55e !important;
  background-color: #f0fdf4 !important;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.groups-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.group-tag {
  background-color: #e5e7eb;
  color: #374151;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
}

.save-btn-container {
  display: flex;
  justify-content: flex-end;
}

.save-btn {
  background-color: #0C306C;
  border-color: #0C306C;
  padding: 10px 24px;
  font-size: 14px;
  border-radius: 4px;
}

.save-btn:hover {
  background-color: #1e293b;
  border-color: #1e293b;
}

/* Bay选择弹框样式 */
.bay-dialog-content {
  padding: 10px 0;
}

.bay-description {
  color: #666;
  font-size: 14px;
  margin: 0 0 20px 0;
  line-height: 1.5;
  padding: 0 10px;
}

/* Bay网格布局 */
.bay-grid {
    padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 30px;
}

/* Bay按钮样式 */
.bay-button {
  height: 50px;
  border: 1px solid #000000;
  background: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.2s;
}

.bay-button:hover {
  background-color: #f5f5f5;
}

/* 选中状态 */
.bay-button.selected {
  border-color: #0C306C;
  background-color: #e6f0ff;
  font-weight: 500;
}

/* 弹框底部按钮 */
.bay-dialog-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.cancel-btn {
  border: 1px solid #ccc;
  background: #fff;
  color: #333;
  padding: 6px 20px;
  width: 140px !important;
  height: 50px !important;
}

.save-bay-btn {
  background-color: #0C306C;
  border-color: #0C306C;
  padding: 6px 20px;
  width: 140px !important;
  height: 50px !important;
}

.save-bay-btn:hover {
  background-color: #0C306C;
  border-color: #0C306C;
}

/* 模态框标题样式 */
.modal-title {
  font-weight: 700 !important;
  font-size: 25px !important;
  color: #181818 !important;
}

/* 修复模态框显示问题 */
.modal {
  overflow-y: auto;
}

.modal-backdrop.in {
  opacity: 0.5;
}
</style>