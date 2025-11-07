<template>
  <div class="locker-management container">
    <!-- 头部区域：标题、部门筛选、操作按钮 -->
    <div class="row header">
      <!-- 左侧：标题 + 部门下拉框 -->
      <div class="col-md-6">
        <div class="header-group">
          <h1 class="title">Lockers</h1>
          <!-- 部门下拉框（Bootstrap 替换Element Plus） -->
          <select
            v-model="selectedDept"
            class="form-control department-dropdown"
            style="margin-left: 20px; width: 160px; display: inline-block"
            @change="filterByDept(selectedDept)"
          >
            <option value="all">All Locations</option>
            <option v-for="dept in ['HW-001', 'HW-002', 'HW-003', 'HW-004']" :value="dept" :key="dept">
              {{ dept }}
            </option>
          </select>
        </div>
      </div>

      <!-- 右侧：操作按钮 -->
      <div class="col-md-6 text-right">
        <div class="action-buttons">
          
          <!-- 添加储物柜 -->
           <router-link to="/Lockers_all">
            <button
            type="button"
            class="btn btn-primary add-btn"
          >
            Add Locker
          </button>
           </router-link>
          
          <!-- 编辑储物柜 -->
           <router-link to="/Lockers_all">
            <button
            type="button"
            class="btn btn-primary edit-btn"
          >
            Edit
          </button>
           </router-link>
          
          <!-- 删除按钮（批量删除触发） -->
          <button
            type="button"
            class="btn btn-default delete-btn"
            @click="handleBatchDeleteClick"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- 储物柜卡片列表（Bootstrap 网格布局） -->
    <div class="row lockers-container" style="margin-bottom: 30px;">
      <div
        v-for="locker in filteredLockers"
        :key="locker.id"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
        style="display: flex; padding: 10px;"
      >
        <!-- 储物柜卡片（Bootstrap Card） -->
        <div
          class="locker-card panel panel-default"
          :class="{ 'disabled-locker': locker.isDisabled }"
          :data-id="locker.id"
          :data-dept="locker.dept"
          style="width: 100%;"
        >
          <div class="panel-body" style="padding: 15px; position: relative;">
            <!-- 自定义圆形复选框（仅非禁用状态显示） -->
            <div 
              v-if="!locker.isDisabled"
              class="custom-checkbox"
              :class="{ 'checked': selectedLockerIds.includes(locker.id) }"
              @click.stop="toggleCheckbox(locker.id)"
            ></div>

            <!-- WiFi图标（绝对定位） -->
            <div class="wifi-icon">
              <img
                v-if="!locker.isDisabled"
                :src="wifiImageIndex === 0 ? require('./1.png') : require('./2.png')"
                alt="WiFi Signal"
                class="wifi-img"
              >
              <img
                v-else
                src="./2.png"
                alt="WiFi Signal Disabled"
                class="wifi-img"
              >
            </div>

            <!-- 储物柜信息 -->
            <div class="locker-name">Name : {{ locker.name }}</div>
            <div class="locker-sn">SN: {{ locker.sn }}</div>
            <div class="locker-dept">Location: {{ locker.dept }}</div>
            <div class="locker-bay">Bay in use : {{ locker.bayInUse }}</div>

            <!-- 详情按钮（删除单个触发） -->
         <!-- 修改Details按钮部分 -->
<router-link to="/devices">
  <button
    class="btn details-btn"
    :class="{ 'disabled': locker.isDisabled }"
    :disabled="locker.isDisabled"
    @click="$root.$emit('showExtraMenus')" 
  >
    Details
  </button>
</router-link>
            
          </div>
        </div>
      </div>
    </div>

    

    <!-- 确认删除模态框（Bootstrap Modal） -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel">
      <div class="modal-dialog" role="document" style="width: 350px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="deleteModalLabel">Message!</h4>
          </div>
          <div class="modal-body">
            <div class="message-content">
              {{ modalMessage }}
              <!-- 待删除项目列表 -->
              <div id="itemsToDelete" style="margin-top: 10px;">
                <div
                  class="detail-item"
                  v-for="item in itemsToDelete"
                  :key="item.id"
                >
                  Name : {{ item.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default cancel-btn" @click="closeModal">Cancel</button>
            <button type="button" class="btn btn-danger confirm-btn" @click="confirmDeletion">Confirm Deletion</button>
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
      lockers: [
        { id: 'A1', name: 'A1', sn: '60394AFA', dept: 'HW-001', bayInUse: 5, isDisabled: false },
        { id: 'A2', name: 'A2', sn: '60394AFA', dept: 'HW-002', bayInUse: 2, isDisabled: false },
        { id: 'A3', name: 'A3', sn: '60394AFA', dept: 'HW-003', bayInUse: 8, isDisabled: true },
        { id: 'A4', name: 'A4', sn: '60394AFA', dept: 'HW-004', bayInUse: 6, isDisabled: false },
        { id: 'A2-2', name: 'A2', sn: '60394AFA', dept: 'HW-002', bayInUse: 2, isDisabled: false },
        { id: 'A3-2', name: 'A3', sn: '60394AFA', dept: 'HW-003', bayInUse: 8, isDisabled: true },
        { id: 'A4-2', name: 'A4', sn: '60394AFA', dept: 'HW-004', bayInUse: 6, isDisabled: false },
        { id: 'A1-2', name: 'A1', sn: '60394AFA', dept: 'HW-001', bayInUse: 5, isDisabled: false }
      ],
      selectedLockerIds: [], // 选中的储物柜ID
      selectedDept: 'all', // 选中的部门（默认全部）
      isDropdownActive: false, // 下拉框展开状态
      modalMessage: '', // 模态框提示文字
      itemsToDelete: [], // 待删除项目列表
      itemToDelete: null, // 单个待删除项目ID
      wifiImageIndex: 0, // WiFi图标切换索引
      wifiImageInterval: null // WiFi图标切换定时器
    };
  },
  computed: {
    filteredLockers() {
      if (this.selectedDept === 'all') {
        return this.lockers;
      }
      return this.lockers.filter(locker => locker.dept === this.selectedDept);
    }
  },
  methods: {
    // 切换复选框状态
    toggleCheckbox(lockerId) {
      const index = this.selectedLockerIds.indexOf(lockerId);
      if (index > -1) {
        this.selectedLockerIds.splice(index, 1);
      } else {
        this.selectedLockerIds.push(lockerId);
      }
    },
    // 切换下拉框状态
    toggleDropdown() {
      this.isDropdownActive = !this.isDropdownActive;
    },
    // 按部门筛选
    filterByDept(dept) {
      this.selectedDept = dept;
      this.isDropdownActive = false;
    },
   
    // 处理批量删除（删除按钮点击）
    handleBatchDeleteClick() {
      if (this.selectedLockerIds.length > 0) {
        this.itemToDelete = null;
        this.modalMessage = "Are you sure you want to delete the following cabinets?";
        this.itemsToDelete = this.lockers.filter(locker => 
          this.selectedLockerIds.includes(locker.id)
        );
        $('#deleteModal').modal('show');
      }
    },
    // 确认删除（执行删除逻辑）
    confirmDeletion() {
      if (this.itemToDelete) {
        // 单个删除
        this.lockers = this.lockers.filter(locker => locker.id !== this.itemToDelete);
      } else {
        // 批量删除
        this.lockers = this.lockers.filter(locker => 
          !this.selectedLockerIds.includes(locker.id)
        );
        this.selectedLockerIds = []; // 清空选中状态
      }
      this.closeModal(); // 关闭模态框
    },
    // 关闭模态框（重置数据）
    closeModal() {
      $('#deleteModal').modal('hide');
      this.itemToDelete = null;
      this.itemsToDelete = [];
    },
    // 页面跳转（添加/编辑储物柜）
    loadPage(url) {
      window.location.href = url;
    }
  },
  mounted() {
    // 点击文档空白处关闭下拉框
    document.addEventListener('click', () => {
      this.isDropdownActive = false;
    });

    // WiFi图标定时切换（每500ms切换一次）
    this.wifiImageInterval = setInterval(() => {
      this.wifiImageIndex = this.wifiImageIndex === 0 ? 1 : 0;
    }, 500);
  },
  beforeDestroy() {
    // 清除定时器，防止内存泄漏
    if (this.wifiImageInterval) {
      clearInterval(this.wifiImageInterval);
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
/* 基础样式（与原页面一致） */
.locker-management {
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f9f9f9;
  padding: 20px;
}

/* 头部样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  display: inline-block;
}

.header-group {
  display: flex;
  align-items: center;
}

/* 操作按钮样式 */
.action-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
}

.test-link {
  text-decoration: none;
  color: #333;
  margin-right: 10px;
}

.add-btn, .edit-btn {
  background-color: #0d47a1 !important;
  border-color: #0d47a1 !important;
}

.delete-btn {
  background-color: #e53935 !important;
  color: #FFF !important;
  border-color: #e53935 !important;
}

/* 储物柜卡片样式 */
.locker-card {
  border: 1px solid #d0d0d0 !important;
  border-radius: 4px !important;
  background-color: #fff !important;
  transition: all 0.3s ease;
}

/* 禁用状态卡片样式 */
.disabled-locker {
  background-color: #f0f0f0 !important;
  border-color: #e0e0e0 !important;
}

.disabled-locker .locker-name,
.disabled-locker .locker-sn,
.disabled-locker .locker-dept,
.disabled-locker .locker-bay {
  color: #999 !important;
}

/* 圆形复选框样式 */
.custom-checkbox {
  position: absolute !important;
  top: 15px !important;
  right: 15px !important;
  cursor: pointer !important;
  width: 18px !important;
  height: 18px !important;
  border: 2px solid #ccc !important;
  border-radius: 50% !important; /* 圆形 */
  background-color: #fff !important;
  transition: all 0.3s ease !important;
}

/* 复选框选中状态 - 移除position: relative的修改 */
.custom-checkbox.checked {
  background-color: #0d47a1 !important;
  border-color: #0d47a1 !important;
  /* 保持绝对定位，移除relative定位 */
}

/* 复选框选中对勾 */
.custom-checkbox.checked::after {
  content: "" !important;
  position: absolute !important;
  left: 6px !important;
  top: 2px !important;
  width: 5px !important;
  height: 10px !important;
  border: solid white !important;
  border-width: 0 2px 2px 0 !important;
  transform: rotate(45deg) !important;
}

/* 储物柜信息样式 */
.locker-name {
    width: 50%;
  font-size: 18px !important;
  border-bottom: 2px solid #000 !important;
  font-weight: bold !important;
  margin-bottom: 10px !important;
  color: #333 !important;
  transition: color 0.3s ease !important;
}

.locker-sn,
.locker-dept,
.locker-bay {
  margin-bottom: 8px !important;
  font-size: 14px !important;
  color: #666 !important;
  transition: color 0.3s ease !important;
}

/* WiFi图标样式 */
.wifi-icon {
  position: absolute !important;
  top: 15px !important;
  right: 40px !important;
  color: #666 !important;
}

.wifi-img {
  width: 24px !important;
  height: 18px !important;
  display: block !important;
}

/* 详情按钮样式 */
.details-btn {
  float: right !important;
  width: 35% !important;
  background-color: #0d47a1 !important;
  color: #fff !important;
  margin-top: -35px !important;
  font-size: 14px !important;
  border: none !important;
}

.details-btn.disabled {
  background-color: #b0b0b0 !important;
  cursor: not-allowed !important;
}



/* 模态框内容样式 */
.message-content {
  color: #666 !important;
  font-size: 14px !important;
  text-align: center !important;
  line-height: 1.5 !important;
  margin-bottom: 10px !important;
}

.detail-item {
  margin: 5px 0 !important;
  padding: 5px !important;
  background-color: #f9f9f9 !important;
  border-radius: 4px !important;
  text-align: left !important;
}

/* 模态框按钮样式 */
.modal-footer {
  display: flex !important;
  justify-content: center !important;
  gap: 10px !important;
}

.cancel-btn {
  background-color: #fff !important;
  color: #333 !important;
  border-color: #ddd !important;
  margin-right: 15px !important;
}

.confirm-btn {
  background-color: #e74c3c !important;
  border-color: #e74c3c !important;
}
</style>