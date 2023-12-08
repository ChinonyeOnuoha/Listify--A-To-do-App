<template>
    <transition name="fade">
      <div v-if="isVisible" class="notification">
        <p>{{ message }}</p>
      </div>
    </transition>
</template>
  
<script>
  export default {
    data() {
      return {
        isVisible: false,
        message: '',
      };
    },
    methods: {
      showNotification(msg) {
        this.message = msg;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000); 
      }
    }
  };
</script>
  
<style scoped>
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #E3FCEF;
    color: #000;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid green;
    width: 100%;
    max-width: 20em;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }


  @media (max-width: 650px) {
  .notification {
    right: 10px;
    top: 10px;
    width: 80%; 
  }
}

</style>
  