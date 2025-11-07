<template>
  <div class="container add-device-group">
    <!-- 标题栏容器 -->
    <div class="header-section row">
      <router-link to="/Device_Groups">
        <img src="../img/left.png" alt="">
      </router-link>

      <h1 class="text-center">{{ isEditMode ? 'Edit Device Group' : 'Add New Device Group' }}</h1>
    </div>
    <p>Assign devices to a group.</p>

    <!-- 组名输入与保存按钮 -->
    <div class="form-group">
      <label for="groupName" class="control-label" style="font-weight: 700;">Group Name :</label>
      <div class="group-name-section input-group">
        <input
          v-model="groupName"
          placeholder="Add New"
          id="groupName"
          class="form-control group-name-input"
          type="text"
        >
        <span class="input-group-btn">
          <button class="btn btn-primary save-button" @click="saveGroup">Save</button>
        </span>
      </div>
    </div>

    <!-- 设备列表区域 -->
    <div class="device-list-section panel panel-default">
      <div class="panel-heading">
        <div class="device-list-actions pull-right">
          <button class="btn btn-primary" @click="saveAssigned">Save Assigned</button>
          <button class="btn btn-default" @click="selectAll">Select All</button>
          <button class="btn btn-default" @click="deselectAll">Deselect All</button>
        </div>
        <div class="clearfix"></div>
      </div>
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th style="width: 55px;">
              <input type="checkbox" v-model="selectAllCheckbox" @change="handleSelectAllChange">
            </th>
            <th>Group Name</th>
            <th>Group ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(device, index) in deviceList" :key="device.groupID">
            <td>
              <input 
                type="checkbox" 
                v-model="selectedDevices" 
                :value="device"
                @change="handleSelectionChange"
              >
            </td>
            <td>{{ device.groupName }}</td>
            <td>{{ device.groupID }}</td>
          </tr>
        </tbody>
      </table>

      <div v-if="selectedDevices.length === 0" class="no-selection text-center text-muted">No Devices Selected</div>
    </div>
  </div>
</template>

<script>
// import { devicesGroups } from './store';

export default {
  data() {
    return {
      // 组名双向绑定
      groupName: '',
      // 当前编辑的组ID
      currentGroupID: '',
      // 表格数据
      deviceList: [],
      // 选中的设备列表
      selectedDevices: [],
      // 全选复选框状态
      selectAllCheckbox: false
    };
  },
  computed: {
    isEditMode() {
      return this.$route.query.type === 'edit';
    }
  },
  mounted() {
    const { type, groupID } = this.$route.query;
    
    if (type === 'add') {
      // 新增操作：加载所有组数据
      this.deviceList = [...devicesGroups];
    } else if (type === 'edit' && groupID) {
      // 编辑操作：找到对应的组
      const groupData = devicesGroups.find(g => g.groupID === groupID);
      if (groupData) {
        this.currentGroupID = groupID;
        this.deviceList = [groupData]; // 只显示当前编辑的组
        this.groupName = groupData.groupName; // 填充组名
      } else {
        this.$message.error('Group not found');
        this.$router.push('/Device_Groups');
      }
    }
  },
  methods: {
    // 保存组信息（新增或编辑）
    saveGroup() {
      if (!this.groupName.trim()) {
        this.$message.warning('Please enter a group name');
        return;
      }

      if (this.isEditMode && this.currentGroupID) {
        // 编辑模式：更新现有组
        const index = devicesGroups.findIndex(g => g.groupID === this.currentGroupID);
        if (index !== -1) {
          devicesGroups[index].groupName = this.groupName;
          // 更新当前表格数据
          this.deviceList[0].groupName = this.groupName;
          this.$message.success('Group updated successfully');
        }
      } else {
        // 新增模式：创建新组
        const newGroup = {
          groupName: this.groupName,
          groupID: Date.now().toString() // 生成唯一ID
        };
        devicesGroups.push(newGroup);
        this.deviceList.push(newGroup);
        this.$message.success('New group created successfully');
        // 可选择跳转到编辑页或留在当前页继续编辑
        this.currentGroupID = newGroup.groupID;
      }
    },

    handleSelectionChange() {
      // 当选择项变化时更新全选框状态
      this.selectAllCheckbox = this.deviceList.length > 0 && 
                             this.selectedDevices.length === this.deviceList.length;
    },

    handleSelectAllChange() {
      if (this.selectAllCheckbox) {
        this.selectAll();
      } else {
        this.deselectAll();
      }
    },

    selectAll() {
      this.selectedDevices = [...this.deviceList];
      this.selectAllCheckbox = true;
    },

    deselectAll() {
      this.selectedDevices = [];
      this.selectAllCheckbox = false;
    },

    saveAssigned() {
      console.log('已选中设备：', this.selectedDevices);
      this.$message.success('Assigned devices saved');
    }
  },
  components: {
    // Vue 2中不需要显式导入基础组件
  }
};
</script>

<style scoped>
.btn-primary{
background-color:#0C306C !important;
border-color:#0C306C !important;

}
.add-device-group {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  padding: 15px 0;
}

.back-button {
  color: #000;
  position: absolute;
  left: 0;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto;
}

p {
  margin-bottom: 15px;
  color: #666;
}

.group-name-section {
  margin-bottom: 20px;
}

.group-name-section label {
  margin-right: 10px;
  font-weight: bold;
}

.group-name-input {
  flex: 1;
  margin-right: 10px;
}

.save-button {
  margin-left: 10px;
}

.device-list-section {
  margin-top: 20px;
}

.device-list-actions {
  margin-bottom: 10px;
  gap: 10px;
}

.device-list-actions .btn {
  margin-left: 5px;
}

.no-selection {
  text-align: center;
  padding: 10px;
  color: #999;
}

.table {
  margin-bottom: 0;
}

.panel-heading {
  padding: 10px 15px;
}
</style>