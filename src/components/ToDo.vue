<template>

<notification-alert ref="notificationRef"></notification-alert>
    <div class="todo-app">

    <!-- Conditional rendering for the title + lists -->
    <header class="todo-header">
            <h1 class="title" v-if="todos.length === 0 && savedLists.length === 0">TO-DO APP</h1>
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

    <transition name="fade"> <!-- Transition wrapper -->
      <div v-if="todos.length === 0 && savedLists.length === 0" class="empty-state">
        <img src="@/assets/MESSAGE_IF_EMPTY_TO_DO_LIST.svg" alt="Start creating lists" class="illustration">
        <p class="start-text">Start creating lists</p>
      </div>
    </transition>

    <transition-group name="fade" tag="ul" class="todo-list">

        <li v-for="todo in todos" :key="todo.id" class="todo-item">
    
            <input type="checkbox" v-model="todo.done" :id="'todo-' + todo.id" class="todo-checkbox">
            <label :for="'todo-' + todo.id" class="todo-label"></label>
            
        <!-- Toggle between text and input for editing -->
        <span v-if="!todo.editing" :class="{ 'todo-text': true, done: todo.done }">{{ todo.text }}</span>
        <input v-else type="text" v-model="todo.text" @keyup.enter="todo.editing = false" class="todo-edit-input">
        
        <div class="actions">
          <button @click="todo.editing = !todo.editing" class="action-btn edit-btn">&#9998;</button>
          <button @click="deleteTodo(todo.id)" class="action-btn delete-btn">&#10060;</button>
        </div>
      </li>
    </transition-group>

    <button v-if="todos.length" @click="saveList" class="save-btn">Save list</button>
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
      // Returns the placeholder based on the number of todos or the last one if more than 5 todos are added
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
        this.todos = []; // Clear current list
        this.$refs.notificationRef.showNotification('List saved successfully!');    
        },

        sortSavedLists(method) {
        if (method === 'date') {
        this.savedLists.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        }
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
}

.todo-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
  }

  .saved-lists-link {
    display: flex;
    justify-content: center;
    text-decoration: none;
    color: #73204F; 
    font-family: Caladea;
    font-size: 1.3em;
    font-style: normal;
    font-weight: 700;
  }

  .highlight-icon {
    margin-right: 20px; 
    margin-bottom: 3rem;
    width: 100px; 
    color: #812F67;
    height: auto; 
  }

.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  padding: 0 1rem;
  box-sizing: border-box;
  margin: 0 auto;
}


.title {
  color: #73204F;
  font-family: Caladea;
  font-size: 2em;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom:3em;
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
  margin-top: 5em;
}

.start-text {
  margin-top: 20px;
}

.todo-list {
  list-style-type: none;
  padding: 0;
  margin: 4em auto;
  width: 100%;
  max-width: 45em;
  
}

.todo-item {
  background-color: #F9DCCF;
  color: #73204F;
  margin-bottom: 10px;
  padding: 10px 10px 10px 0;
  border-radius: 4px;
  display: flex;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: center;
  position: relative;
  
}

input[type="checkbox"] {
  margin-left: 16px; 
}

.todo-text {
  flex-grow: 1;
}


.todo-text.done {
  text-decoration: line-through;
}


.todo-text,
.todo-edit-input {
  margin-left: 16px; 
  flex-grow: 1; 
  text-align: left; 
}

.actions {
  display: flex;
  position: absolute; 
  right: 10px; 
  top: 50%; 
  transform: translateY(-50%); 
  gap: 10px; 
}

.action-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #73204F;
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
  color: #73204F;
  border: none;
  cursor: pointer;
}

.edit-btn{
  background-color: transparent;
  color: #73204F;
  font-size: 18px;
  border: none;
  cursor: pointer;
}


.todo-checkbox {
  display: none; 
}

.todo-label {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  background: #73204F;
  border: 2px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  background-image: linear-gradient(#73204F, #73204F), 
                    linear-gradient(to right, #632329, #F25551, #50F283CC);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin-left: 16px;
}


.todo-checkbox:checked + .todo-label::after {
  content: '';
  position: absolute;
  left: 8px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}


.transition-enter-active, .transition-leave-active {
  transition: opacity 0.5s;
}

.transition-enter, .transition-leave-to /* .transition-leave-active in <2.1.8 */ {
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
  padding: 10px 20px;
  border-radius: 20px;
  margin-left: 10px; 
  cursor: pointer;
  background: linear-gradient(95deg, #4B1F2D 1.29%, #6B284F 90.56%, #812F67 99.56%);
  color: white;
  font-family: Caladea;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.save-btn:hover {
  background-color: darken(#FF561E, 10%);
}


/* Mobile responsive styles */
@media (max-width: 650px) {

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
  margin-bottom:1.5em;
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


  .todo-list {
    width: 100%; 
  }

  .todo-label{
    width: 18px;
    height: 18px;
    margin-left: 8px;
  }

  .todo-text {
    color: #73204F;
    font-family: Caladea;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    margin-left:8px;
    max-width: 240px;
    word-wrap: break-word; 
    overflow-wrap: break-word;
    
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
  right: 3px; 
  top: 70%; 
  gap: 0px;
  font-size: 15px;
  }

  .todo-checkbox:checked + .todo-label::after {
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .illustration {
    width: 70%; 
    height: auto;
  }

  .empty-state img {
    margin-top: 40px;
  }

  .start-text {
    font-size: 1rem; 
  }

  .todo-item .edit-btn,
  .todo-item .delete-btn {
    opacity: 1;
  }

}

</style>