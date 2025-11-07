<template>
  <div class="device-management-container container-fluid">
    <!-- 顶部操作栏 -->
    <div class="row header-row align-items-center">
      <div class="col-md-3">
        <h1 class="page-title">Devices (A6)</h1>
      </div>
      <div class="col-md-4">
        <div class="input-group search-input">
          <span class="input-group-addon">
            <img src="../img/Vector.png" style="height: 18px;" alt="">
          </span>
          <input 
            type="text" 
            class="form-control" 
            v-model="searchQuery" 
            placeholder="Search"
          >
        </div>
      </div>
      <div class="col-md-5 text-right action-buttons">
        <!-- Import File Button with tooltip -->
        <div class="btn-tooltip-container" style="display: inline-block; position: relative;">
          <button 
            type="button" 
            class="btn text-orange"
            @mouseenter="showTooltip('import')"
            @mouseleave="hideTooltip('import')"
          >
            Import File
          </button>
          <div 
            v-if="tooltips.import.show" 
            class="custom-tooltip"
            @click="showDetail('import')"
          >
            <p>{{ tooltips.import.content }}</p>
            <span class="tooltip-click-indicator">Click to view details</span>
          </div>
        </div>

        <!-- Export File Button with tooltip -->
        <div class="btn-tooltip-container" style="display: inline-block; position: relative;">
          <button 
            type="button" 
            class="btn text-blue"
            @mouseenter="showTooltip('export')"
            @mouseleave="hideTooltip('export')"
          >
            Export File
          </button>
          <div 
            v-if="tooltips.export.show" 
            class="custom-tooltip"
            @click="showDetail('export')"
          >
            <p>{{ tooltips.export.content }}</p>
            <span class="tooltip-click-indicator">Click to view details</span>
          </div>
        </div>

        <router-link to="/devices_types">
          <button type="button" class="btn device-types-btn">Devices Types</button>
        </router-link>
        <router-link to="/devices_edit">
          <button type="button" class="btn btn-primary add-device-btn">Add New Device</button>
        </router-link>
      </div>
    </div>

    <!-- 设备表格 -->
    <table class="table table-bordered devices-table" style="width: 100%; margin-top: 16px;">
      <thead>
        <tr>
          <th class="text-left" style="min-width: 120px;">Device Name</th>
          <th class="text-left" style="min-width: 100px;">Device ID</th>
          <th class="text-left" style="min-width: 120px;">Assigned Bay</th>
          <th class="text-left" style="min-width: 100px;">Device Type</th>
          <th class="text-left" style="min-width: 250px;">Device Groups</th>
          <th class="text-left" style="min-width: 100px;">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in filteredDevices" :key="device.id">
          <td>{{ device.deviceName }}</td>
          <td>{{ device.deviceId }}</td>
          <td>{{ device.assignedBay }}</td>
          <td>{{ device.deviceType }}</td>
          <td>{{ device.deviceGroups }}</td>
          <td>
            <button 
              class="btn edit-btn"
              @click="handleEdit(device.id)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Detail Modal -->
    <div class="modal fade" :id="'detailModal'" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeDetail">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">{{ currentDetail.title }}</h4>
          </div>
          <div class="modal-body">
            <p>{{ currentDetail.fullContent }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="closeDetail">Close</button>
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
      searchQuery: '',
      devices: [],
      tooltips: {
        import: {
          show: false,
          content: 'Import device list from CSV or Excel files',
          fullContent: 'Import device list from CSV or Excel files. Supported formats: .csv, .xlsx, .xls. The file must contain columns: Device Name, Device ID, Assigned Bay, Device Type, and Device Groups. Maximum file size: 10MB.'
        },
        export: {
          show: false,
          content: 'Export device list to CSV or Excel format',
          fullContent: 'Export current device list to CSV or Excel format. You can choose to export all devices or only the filtered results. The exported file will contain all device information including Device Name, Device ID, Assigned Bay, Device Type, and Device Groups.'
        }
      },
      currentDetail: {
        title: '',
        fullContent: ''
      }
    };
  },
  created() {
    // 生成模拟设备数据
    this.devices = this.generateDevices();
  },
  computed: {
    filteredDevices() {
      if (!this.searchQuery) return this.devices;
      
      const query = this.searchQuery.toLowerCase();
      return this.devices.filter(device => 
        device.deviceName.toLowerCase().includes(query) ||
        device.deviceId.toLowerCase().includes(query) ||
        device.assignedBay.toLowerCase().includes(query) ||
        device.deviceType.toLowerCase().includes(query) ||
        device.deviceGroups.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    generateDevices() {
      // 创建6条示例数据，实际项目中可以从API获取
      return Array(6).fill().map((_, index) => ({
        id: index + 1,
        deviceName: 'iPhone 25',
        deviceId: 'BAY 25',
        assignedBay: 'BAY 25',
        deviceType: 'iPhone',
        deviceGroups: 'Day Shift Managers, Staff, Office Staff'
      }));
    },
    handleEdit(deviceId) {
      this.$router.push({
        path: '/devices_edit',
        query: { id: deviceId }  // 通过URL参数传递设备ID
      });
    },
    showTooltip(type) {
      this.tooltips[type].show = true;
    },
    hideTooltip(type) {
      this.tooltips[type].show = false;
    },
    showDetail(type) {
      // 保存当前详情内容
      this.currentDetail = {
        title: type === 'import' ? 'Import File Details' : 'Export File Details',
        fullContent: this.tooltips[type].fullContent
      };
      
      // 显示模态框（Bootstrap 3 方式）
      $('#detailModal').modal('show');
      
      // 防止鼠标离开时关闭提示
      event.stopPropagation();
    },
    closeDetail() {
      $('#detailModal').modal('hide');
    }
  },
  // 确保组件销毁时关闭模态框
  beforeDestroy() {
    $('#detailModal').modal('hide');
  }
};
</script>

<style scoped>
/* =====滚轮样式 */
.table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
  overflow: auto;
  border: 0;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: #000;
  /* border:none!important; */
}
table {
  padding: 16px;
  overflow: auto;
  /* height: 730px; */
  border:none!important;
}

.groups-grid::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.groups-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.groups-grid::-webkit-scrollbar-thumb {
  background: #2C4F9E;
  border-radius: 4px;
}
.groups-grid::-webkit-scrollbar-thumb:hover {
  background: #2C4F9E;
}
/* ====== */
.table th, .table td {
  font-size: 16px;
  font-weight: 600;
  vertical-align: middle !important;
}

.btn {
  height: 45px !important;
  font-weight: 700 !important;
  margin-right: 8px;
  padding: 6px 12px;
}

.table th {
  background-color: #C7EDFF; /* 蓝色背景 */
  color: #000; /* 字体黑色 */
  height: 70px;
  padding-right: 22px;
}

/* 表格圆角 */
.table th:first-child {
  border-top-left-radius: 22px;
}

.table th:last-child {
  border-top-right-radius: 22px;
}

.table-bordered > thead > tr > td, 
.table-bordered > thead > tr > th {
  border-right-color: transparent;
}

.device-management-container {
  padding: 0 20px;
  background-color: #ffffff;
  min-height: 100vh;
}

.header-row {
  margin-bottom: 8px;
  padding-top: 15px;
}

.page-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #000;
}

.search-input {
  width: 100%;
}

.action-buttons {
  padding-top: 0; /* 移除顶部内边距，确保垂直对齐 */
}

.text-orange {
  color: #FF9900 !important;
  background-color: transparent;
  border: none;
}

.text-blue {
  color: #7389A3 !important;
  background-color: transparent;
  border: none;
}

.device-types-btn {
  background-color: #ffffff;
  color: #000 !important;
  border-color: #0C306C;
}

.add-device-btn {
  background-color: #0C306C !important;
  border-color: #0C306C !important;
  color: white !important;
}

.edit-btn {
  background-color: #ffffff;
  color: #FF9900 !important;
  border-color: #FF9900;
  padding: 4px 12px;
}

.edit-btn:hover {
  background-color: #fff7e6;
  color: #FF9900 !important;
  border-color: #FF9900;
}

/* Custom tooltip styles */
.custom-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: normal;
  white-space: nowrap;
  z-index: 100;
  margin-bottom: 8px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
}

/* Tooltip arrow */
.custom-tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #0C306C transparent transparent transparent;
}

.tooltip-click-indicator {
  display: block;
  font-size: 12px;
  color: #ccc;
  margin-top: 4px;
}

/* Ensure tooltip stays visible when hovering over it */
.btn-tooltip-container:hover .custom-tooltip {
  display: block !important;
}
</style>