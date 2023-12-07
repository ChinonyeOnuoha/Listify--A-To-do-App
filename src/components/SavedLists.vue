<template>
    <div class="savedList-container">
        <header>
          <h1><router-link to="/">TO-DO APP</router-link></h1>
        </header>
        <div class="saved-lists">
        <ol>
        <li v-for="(list, listIndex) in savedLists" :key="listIndex">
          {{ formatDate(list.timestamp) }}
          <button @click="deleteList(listIndex)" class="action-btn delete-btn">&#128465;</button>
          <ul>
            <li v-for="(todo, todoIndex) in list.todos" :key="todo.id">
              <div v-if="currentlyEditingIndex && currentlyEditingIndex.listIndex === listIndex && currentlyEditingIndex.todoIndex === todoIndex">
                <input v-model="editCache" />
                <button @click="saveEdit(listIndex, todoIndex)" class="save-btn">&#10003;</button>
                <button @click="cancelEdit" class="cancel-btn">&#10060;</button>
              </div>
              <div v-else>
                {{ todo.text }}
                <button @click="startEdit(listIndex, todoIndex)" class="edit-btn">&#9998;</button>
              </div>
            </li>
          </ul>
        </li>
      </ol>
    </div>
    </div>
  </template>
  
<script>

export default {
  name: 'SavedLists',
  data() {
    return {
      savedLists: [], // Data property for saved lists
      currentlyEditingIndex: null,
      editCache: ''
    };
  },
  created() {
    this.loadSavedLists();
  },
  methods: {
    loadSavedLists() {
      let lists = localStorage.getItem('savedLists');
      if (lists) {
        this.savedLists = JSON.parse(lists);
      }
    },
    startEdit(listIndex, todoIndex) {
    this.currentlyEditingIndex = { listIndex, todoIndex };
    this.editCache = this.savedLists[listIndex].todos[todoIndex].text;
    },
    cancelEdit() {
      this.currentlyEditingIndex = null;
      this.editCache = '';
    },

    saveEdit(listIndex, todoIndex) {
  if (this.editCache.trim()) {
    this.savedLists[listIndex].todos[todoIndex].text = this.editCache.trim();
    this.savedLists = [...this.savedLists]; // Trigger reactivity
    localStorage.setItem('savedLists', JSON.stringify(this.savedLists));
    }
    this.cancelEdit();
    },

    deleteList(index) {
      this.savedLists.splice(index, 1);
      localStorage.setItem('savedLists', JSON.stringify(this.savedLists));
     
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true
      }).format(date);
    }
  }
}
</script>

  
<style scoped>

  .savedList-container{
    background: linear-gradient(95deg, #FFE3E3 0.17%, #FFF0F5 100%);
    color: #73204F;
    font-family: "Caladea", serif;  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: left;
    min-height: 100vh;
  }

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(95deg, #FFE3E3 0.17%, #FFF0F5 100%);
    height: 4em;
    width: 100%;
    position: fixed;
    z-index: 1000;
    top: 0; 
  }

    h1{
    font-family: Caladea;
    font-size: 2em;
    font-style: normal;
    font-weight: 700;
    line-height: normal; 
  }

  a{
    text-decoration: none;
    color: #73204F;
  }

  .saved-lists{
    font-size: 2rem;
    background-color: #FEEDE1CC;
    width: 80%; 
    max-width: 600px; 
    padding: 1em; 
  }

  .saved-lists ol {
    padding: 0; 
  }

  ol {
    list-style: none; 
    padding: 0; 
    }

  .saved-lists li ul {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    justify-content: center;
    padding: 0;
    margin: 0;
    max-width: 90%;
    word-wrap: break-word; 
    overflow-wrap: break-word;
  }

  .saved-lists ol li{
    font-weight: bold;
  }

  .saved-lists li ul li {
    font-weight: normal; 
    margin-bottom: 6px; 
  }



  li{
    font-size: 1rem;
    background-color: #F9DCCF;
    border-radius: 8px; 
    margin-bottom: 1em; 
    padding: 1rem; 
    position: relative; 
    display: flex; 
    flex-direction: column;
    align-items: flex-start; 
    justify-content: space-between; 
  }
    .action-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    }  
    
    .edit-btn, .delete-btn, .save-btn, .cancel-btn {
    margin: 0 0.5em; 
}
    .edit-btn{
    background-color: transparent;
    color: #73204F;
    font-size: 18px;
    border: none;
    cursor: pointer;
    }

    .delete-btn {
    position: absolute;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-self: flex-end;
    font-size: 20px;
    text-shadow: 1px 1px 2px black;
    }

    .save-btn{
        background-color: transparent;
        color: green;
        font-size: 20px;
        border: none;
        cursor: pointer;
    }

    .cancel-btn{
        background-color: transparent;
        color: black;
        border: none;
        cursor: pointer;

    }
    
    input {
    margin-right: 1em; 
    line-height: 1.5; 
    border: 1px solid #ccc; 
    border-radius: 4px; 
    padding: 0.25em 0.5em; 
    }

    @media (max-width: 768px) {
    .saved-lists {
      width: 95%; 
      padding: 1em; 
    }

    header {
      flex-direction: column; 
      align-items: center; 
    }

    h1 {
      margin-bottom: 0.5em; 
      font-size: 24px;
    }
    }

</style>
  