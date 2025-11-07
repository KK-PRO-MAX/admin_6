<template>
  <div class="container">
    <!-- 顶部区域（含返回按钮和动态标题） -->
    <div class="row">
      <div class="col-md-12">
        <!-- 左侧返回按钮 + 中间标题 -->
        <div class="pull-left" style="margin-top: 40px;">
         <router-link to="/Lockers">
            <img src="./img/left.png" alt="">
        </router-link>
        </div>
        <div class="text-center">
          <h2>{{ title }} Locker</h2>
        </div>
      </div>
    </div>

    <!-- 表单主体区域（提交按钮移至框内右下角） -->
    <div class="row">
      <div class="col-md-12">
        <div class="well" style="position: relative; padding-bottom: 40px;">
          <form @submit.prevent="handleSubmit">
            <!-- 储物柜类型选择 -->
            <div class="form-group">
              <label for="lockerType">Locker Type :</label>
              <select 
                class="form-control" 
                v-model="lockerForm.lockerType" 
                id="lockerType"
                required
              >
                <option value="">Select Type</option>
                <option 
                  v-for="type in lockerTypes" 
                  :key="type.value" 
                  :value="type.value"
                >
                  {{ type.label }}
                </option>
              </select>
            </div>

            <!-- 储物柜名称输入 -->
            <div class="form-group">
              <label for="lockerName">Locker Name :</label>
              <input 
                type="text" 
                class="form-control" 
                v-model="lockerForm.lockerName" 
                id="lockerName" 
                placeholder="Enter Locker Name"
                required
              >
            </div>

            <!-- SN 码输入 -->
            <div class="form-group">
              <label for="sn">SN :</label>
              <input 
                type="text" 
                class="form-control" 
                v-model="lockerForm.sn" 
                id="sn" 
                placeholder="Enter SN Tag Barcode Number"
                required
              >
            </div>

            <!-- 提交按钮（移至框内右下角，不超出） -->
            <button 
              type="submit" 
              class="btn btn-primary pull-right"
              style=""
            >
              {{ title }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false,
      lockerForm: {
        lockerType: '',
        lockerName: '',
        sn: '',
        id: ''
      },
      lockerTypes: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' }
      ]
    };
  },
  computed: {
    title() {
      return this.isEdit ? 'Edit' : 'Add';
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1); // 使用路由返回上一页
    },
    handleSubmit() {
      if (!this.lockerForm.lockerType || !this.lockerForm.lockerName || !this.lockerForm.sn) {
        alert('Please fill in all required fields');
        return;
      }

      if (this.isEdit) {
        this.updateLocker();
      } else {
        this.createLocker();
      }
    },
    createLocker() {
      this.$http.post('/api/lockers', this.lockerForm)
        .then(response => {
          console.log('Locker created successfully:', response.data);
          this.resetForm();
          alert('Locker added successfully!');
        })
        .catch(error => {
          console.error('Error creating locker:', error);
          alert('Failed to add locker');
        });
    },
    updateLocker() {
      this.$http.put(`/api/lockers/${this.lockerForm.id}`, this.lockerForm)
        .then(response => {
          console.log('Locker updated successfully:', response.data);
          alert('Locker edited successfully!');
        })
        .catch(error => {
          console.error('Error updating locker:', error);
          alert('Failed to edit locker');
        });
    },
    resetForm() {
      this.lockerForm = {
        lockerType: '',
        lockerName: '',
        sn: '',
        id: ''
      };
    },
    loadEditData(lockerId) {
      this.$http.get(`/api/lockers/${lockerId}`)
        .then(response => {
          this.lockerForm = response.data;
          this.isEdit = true;
        })
        .catch(error => {
          console.error('Error loading locker data:', error);
          alert('Failed to load locker data');
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.id) {
        vm.loadEditData(to.params.id);
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id) {
      this.loadEditData(to.params.id);
    } else {
      this.isEdit = false;
      this.resetForm();
    }
    next();
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}
.well {
  margin-top: 20px;
  padding: 20px;
  background-color: #eaeaea2e;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}
/* 确保标题区域垂直对齐 */
.text-center {
  padding: 15px 0;
}
.btn-primary {
    font-weight: 600;
    color: #fff;
    background-color: #0C306C;
    border-color: #0C306C;
}
</style>