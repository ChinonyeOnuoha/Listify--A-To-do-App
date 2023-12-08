<template>

    <notification-alert ref="notificationRef"></notification-alert>
    <div class="todo-app">

    <!-- Conditional rendering for the title + lists -->
    <header class="todo-header">
            <h1 class="title" v-if="todos.length === 0 && savedLists.length === 0">TO-DO APP</h1>
            <transition name="fade"> 
                <div v-if="todos.length === 0 && savedLists.length === 0" class="empty-state">
                <img src="@/assets/MESSAGE_IF_EMPTY_TO_DO_LIST.svg" alt="Start creating lists" class="illustration">
                </div>
            </transition>
            <router-link to="/saved" class="saved-lists-link" v-if="savedLists.length > 0">Saved lists</router-link>
            <img src="@/assets/Vector.svg" alt="Highlight" class="highlight-icon" v-if="savedLists.length > 0">
        </header>

    <header class="header">
      <!-- keyup.enter listens for the Enter key -->
      <section v-if="todos.length || savedLists.length"></section>
      <input 
        type="text" 
        v-model="newTodo" 
        @keyup.enter="addTodo" 
        :placeholder="dynamicPlaceholder" 
        class="new-todo-input">
      <button @click="addTodo" class="add-item">Add item</button>
    </header>

    <transition-group name="fade" tag="ul" class="todo-list">

        <li v-for="todo in todos" :key="todo.id" class="todo-item">
            <div class="todo-content">
              <input type="checkbox" v-model="todo.done" :id="'todo-' + todo.id" class="todo-checkbox">
              <span v-if="!todo.editing" :class="{ 'todo-text': true, done: todo.done }">{{ todo.text }}</span>
              <textarea 
                  v-else 
                  ref="editInput" 
                  v-model="todo.text" 
                  @keyup.enter="finishEditing(todo)" 
                  @input="adjustTextAreaHeight($event.target)" 
                  class="todo-edit-textarea">             
              </textarea>
            </div>
            <div class="actions">
                <button v-show="!todo.editing" @click="editTodo(todo)" class="action-btn edit-btn"><font-awesome-icon :icon="['fas', 'pen-to-square']" />
                </button>
                <button v-show="!todo.editing" @click="deleteTodo(todo.id)" class="action-btn delete-btn"><font-awesome-icon :icon="['fas', 'trash']" /></button>
                <button v-show="todo.editing" @click="saveEdit(todo)" class="action-btn save-btn2"><font-awesome-icon :icon="['fas', 'check']" /></button>
                <button v-show="todo.editing" @click="cancelEdit(todo)" class="action-btn cancel-btn"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
            </div>

        </li>
    </transition-group>

    <a v-if="todos.length" href="#" @click="saveList" class="save-btn">Save list</a>
  </div>
</template>

<script>
import NotificationAlert from './NotificationAlert.vue';
export default {
  name: 'ToDoApp',
  components: {
    NotificationAlert
  },
  data() {
    return {
      newTodo: '',
      todos: [],
      nextTodoId: 0,
      savedLists: [],
      placeholders: [
        "Boss 🙌🏾, wetin you wan drop 4 list as e dey hot?",
        "Next move for your master plan nkor?",
        "Add another one 🎵 - Like DJ Khaled talk",
        "You still get? No shaking, space dey!",
        "Carry go, just dey drop am,dey drop am..",
        "De fire down aje! nothing do you 🚀",   
      ]
    };
  },

   created() {
        let savedLists = localStorage.getItem('savedLists');
        if (savedLists) {this.savedLists = JSON.parse(savedLists);
        }
    },
    
  computed: {
    dynamicPlaceholder() {
      let count = this.todos.length;
      if (count >= this.placeholders.length) return this.placeholders[this.placeholders.length - 1];
      return this.placeholders[count];
    }
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({
          id: this.nextTodoId++,
          text: this.newTodo,
          done: false,
          editing: false 
        });
        this.newTodo = '';
        }
        },
        deleteTodo(id) {
          this.todos = this.todos.filter(todo => todo.id !== id);
        },

        saveList() {
        const timestamp = new Date().toISOString();
        this.savedLists.push({ timestamp, todos: [...this.todos] });
        localStorage.setItem('savedLists', JSON.stringify(this.savedLists));
        this.todos = []; 
        this.$refs.notificationRef.showNotification('List saved successfully!');    
        },

        sortSavedLists(method) {
        if (method === 'date') {
        this.savedLists.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        }
        },

        saveEdit(todo) {
        todo.editing = false;
        },

        cancelEdit(todo) {
          todo.text = this.originalTodoText; 
          todo.editing = false;
        },

        editTodo(todo) {
          this.originalTodoText = todo.text; 
          todo.editing = true;
        },

        finishEditing(todo) {
        todo.editing = false;
        },

        adjustTextAreaHeight(textareaElement) {
        textareaElement.style.height = 'auto';
        textareaElement.style.height = textareaElement.scrollHeight + 'px';
        }       
    }
}
</script>


<style scoped>
.todo-app {
  background: linear-gradient(95deg, #FFE3E3 0.17%, #FFF0F5 100%);
  color: #73204F;
  font-family: "Caladea", serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-x: hidden; 
}

.todo-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .saved-lists-link {
    display: flex;
    justify-content: center;
    text-decoration: none;
    color:#73204F; 
    font-family: Caladea;
    font-size: 1.3em;
    font-style: normal;
    font-weight: 700;
  }

  .highlight-icon {
    margin-right: 20px; 
    margin-bottom: 3rem;
    width: 100px; 
    color:#812F67;
    height: auto; 
  }

.header {
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  padding: 0 1rem;
  box-sizing: border-box;
  z-index: 10;
  margin: 0 auto;
  background: inherit;
  top: 3em;
}

.title {
  color: #73204F;
  font-family: Caladea;
  font-size: 2em;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.start-text{
  color: #73204F;
  text-align: center;
  font-family: Caladea;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.add-item {
  position: absolute;
  right: 0; 
  border: none;
  padding: 10px 30px;
  border-radius: 50px;
  height: 72px;
  cursor: pointer;
  background: #73204F;
  color: #FF561E;
  font-family: Caladea;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  margin-right: 26px;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.add-item:hover {
  background: #653F4A; 
}
.new-todo-input{
  border-radius: 50px;
  border:none;
  border: 2px solid rgba(242, 168, 153, 0.80);
  background: #FEEDE1CC;
  width: 100%;
  max-width: 50rem;
  height: 5rem;
  padding-left: 32px;
  color: #000;
  font-family: Caladea;
  font-size: 1.5rem;
  word-wrap: break-word; 
  overflow-wrap: break-word;
}


.illustration-box {
  position: relative;
}
.empty-state {
  text-align: center;
}
.illustration {
  max-width: 100%;
  height: auto;
  margin-bottom:2em;
}

.todo-list {
  list-style-type: none;
  padding: 0;
  margin-top: 4em;
  width: 100%;
  max-width: 45em;
  overflow-y: auto;
  max-height: calc(100vh - 4em);
  
}

.todo-item {
  background-color: #F9DCCF;
  color: #73204F;
  margin-bottom: 10px;
  padding: 8px 8px 30px 0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: flex-start;
  position: relative;
  
}

.todo-content {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start; 
  flex-grow: 1;
}


input[type="checkbox"] {
  margin-left: 16px; 
}

.todo-text {
  flex-grow: 1;
  text-align: left; 
  padding-right: 10px;
}

.todo-text.done {
  text-decoration: line-through;
}

.todo-text, .todo-edit-textarea {
  flex-grow: 1; 
  text-align: left; 
  width: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}


.actions {
  display: flex;
  position: absolute; 
  right: 8px; 
  bottom:4; 
  transform: translateY(-50%); 
}

.action-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #730505;
}

.save-btn2{
    background-color: transparent;
    color: green;
    font-size: 18px;
    border: none;
    cursor: pointer;
}
.cancel-btn{
    background-color: transparent;
    color: #730505;
    font-size: 18px;
    border: none;
    cursor: pointer;
}

.todo-item .edit-btn,
.todo-item .delete-btn {
  opacity: 0;
  transition: opacity 0.3s; 
}

.todo-item:hover .edit-btn,
.todo-item:hover .delete-btn {
  opacity: 1; 
}

.delete-btn {
  background-color: transparent;
  color: #730505;
  border: none;
  cursor: pointer;
}

.edit-btn{
  background-color: transparent;
  color: #730505;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.transition-enter-active, .transition-leave-active {
  transition: opacity 0.5s;
}

.transition-enter, .transition-leave-to {
  opacity: 0;
}

.todo-text[contenteditable] {
  padding: 3px;
  cursor: text;
}

.new-todo-input:focus {
  outline: none;
  border-color: #FF561E;
}

.save-btn {
  border: none;
  cursor: pointer;
  color: #FF561E;
  font-family: Caladea;
  font-size: 1.2rem;
  transition: 0.3s;
}





/* Mobile responsive styles */
@media (max-width: 600px) {

  .todo-app{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding:0 5%;
    
  } 

  .header {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position:relative;
    margin-bottom: 2rem;
  }

  .title {
  color: #73204F;
  font-family: Caladea;
  font-size: 1em;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

  .new-todo-input {
    width: 100%; 
    height: 4rem;
    margin-bottom: 2rem;
    padding-left: 12px;
  }
  .add-item {
    width: 40%;
    display: flex;
    height: 48px;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 30%;
    top: 80%;
    margin-bottom: 2rem;
    font-size: 18px;
  }

    ::placeholder{
    font-family: Caladea;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.save-btn {
  border: none;
  cursor: pointer;
  color: #FF561E;
  font-family: Caladea;
  font-size: 1rem;
  transition: 0.3s;
}
  .todo-list {
    width: 100%; 
  }

  .todo-label{
    width: 14px;
    height: 14px;
    margin-left: 8px;
  }

  .todo-text {
    color: #73204F;
    font-family: Caladea;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    margin-left:8px;
    max-width: calc(100% - 24px);
    word-wrap: break-word; 
    overflow-wrap: break-word;
  }

  .todo-item, .todo-content, .actions {
    min-width: 0; /* This helps with handling overflow on smaller screens */
  }
  .saved-lists-link{
    color: #73204F;
    font-family: Caladea;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    word-wrap: break-word; 
    overflow-wrap: break-word;
  }

  .highlight-icon {
  margin-right: 10px; 
  margin-bottom: 24px;
  width: 80px; 
  color: #812F67;
  height: auto; 
}

  .actions {
  display: flex;
  position: absolute; 
  right: 0; 
  bottom: 0; 
  gap: 0px;
  font-size: 14px;
  }

  .illustration {
    width: 70%; 
    height: auto;
  }

  .start-text {
    font-size: 1rem; 
  }

  .todo-checkbox {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  cursor: pointer;
}

  .todo-item .edit-btn,
  .todo-item .delete-btn {
    opacity: 1;
  }

}

</style>