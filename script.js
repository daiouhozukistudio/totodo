document.addEventListener('DOMContentLoaded', function () {
    
    Vue.component("todo-item", {
      props: ["name", "isDone"],
      template: `<li v-bind:class="{done:isDone}"><input type="checkbox"
              v-model="isDone"><span>{{name}}</span><i class="fa fa-trash icon-trash js-trash"
              aria-hidden="true" @click="deletetask()"></i></li>`,
      methods: {
        deletetask: function() {
              this.$emit('delete-event');
        }
      }
    });

    const vm = new Vue({
        el: "#todoList",
        data: {
            tasks: [
                {name: "沖縄旅行行きたい", isDone: true },
                {name: "京都旅行行きたい", isDone: false }
            ],
            newTodo: "",
            errMsg: "",
            keyword:""
        },
        methods: {
            addTodo: function (todo) {
                if (!todo) {
                    this.errMsg = 'タスクを入力してください';
                } else {
                    this.tasks.push({
                        name: todo,
                        isDone: false
                    });
                    this.newTodo = "";//input内を空白にする
                    this.errMsg = "";
                }
            },
            taskdelete: function (index) {
                this.tasks.splice(index, 1);//indexで指定されたタスクを１つだけ消す
            }
        },
        computed: {
            filterTasks: function () {
                var tasks = [];
                for (var i in this.tasks) {
                    var task = this.tasks[i];
                    if (task.name.indexOf(this.keyword) !== -1) {
                        tasks.push(task);
                    }
                }
                return tasks;
            }
        }
    })
 }, false);
