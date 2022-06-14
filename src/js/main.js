$(document).ready(function() {
    new App();
})

class App {

    todoList = []

    constructor(){
        this.fetchData()
        this.init()
    }

    init(){
        //Thêm todolist
        const _this = this
        $(".control").on("click",".buttonAddTodo",()=>{
            
            const value = $(".inputAddTodo").val()

            //trường hợp value trống

            if(value == ''){
                return alert("Vui lòng bạn nhập Todo!")
            }

            //trường hợp có value
            const date = new Date()
            const id = _this.generousID()

            const newTodo = {
                name : value,
                date : date,
                id : id,
                isCompleted : false
            }

            _this.insertData(newTodo)
        }
        

        )
        $(".todoList").on("dblclick",".todoItem" ,function(){
            const ID = $(this).data('id')
             _this.updateTodo(ID)
        })

        $(".todoList").on("click",".todoItemTrash",function(){
            const id = $(this).parents('.todoItem').data('id')
            
            _this.deleteTodo(id)
        })

        $(".footer").on("click",".footerFunction",function(){
            _this.deleteData()
        })

        
    }

    fetchData = () => {
        this.todoList = JSON.parse(localStorage.getItem('todoList'))

        
        //trường hợp todo chưa được set
        if(this.todoList == null)
        this.todoList = []
        $(".todoList").empty()
        //trường todo trống
        if(this.todoList.length == 0){

           return $(".todoList").append(`<div class="messageEmpty">Trống!</div>`)
        }
        else
        {
            $(".footerText").empty().text(`You have ${this.todoList.length} pending tasks`)
        }
        //trường hợp todo có dữ liệu
        this.todoList.forEach(function(todo,index){
            
            const dateFormat = Common.formatDate(todo.date)
            
            const todoHTML = $(`<div class="todoItem ${todo.isCompleted ? 'completed' : ''}" >
                    <div class="todoItemText ">
                            <div class="todoItemName">${todo.name}</div>
                            <div class="todoItemDate">${dateFormat}
                    </div>
                                    </div>
                    <div class="todoItemTrash">
                            <i class="fa-solid fa-trash"></i>
                    </div>
            </div>
            </div>`)
            todoHTML.data("id",todo.id)
            $(".todoList").append(todoHTML)
        }
        )

        
    }

    //Thêm
    insertData = (newTodo) => {
        //thêm todo vào todoList
        this.todoList.unshift(newTodo)
        //Lưu lại todoList trên localStorage
        localStorage.setItem("todoList",JSON.stringify(this.todoList))
        //Load lại dữ liệu
        this.fetchData()
    }
    
    //Xóa todolist
    deleteTodo = (id) => {
        //xóa todo khỏi todoList
        
        this.todoList= this.todoList.filter(function (todo){
            return todo.id != id
        })

        localStorage.setItem("todoList",JSON.stringify(this.todoList))

        this.fetchData()

        
    }

    //xóa cả
    deleteData = () => {
        localStorage.removeItem('todoList')

        this.fetchData()
    }

    updateTodo = (id) =>{
        // hadle data
        this.todoList = this.todoList.map(function(todo){
            if(todo.id === id){
                todo.isCompleted = !todo.isCompleted
            }

            return todo

        })
        // set data
        localStorage.setItem("todoList",JSON.stringify(this.todoList))
        //load lại data
        this.fetchData()
    }

    

    generousID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      
    
}