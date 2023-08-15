const openModal = (modalSelect) => {
    switch(modalSelect){
        case 'modify':
            document.querySelector('.edit-modal').classList.remove("invisible");
            break;
        case 'delete':
            document.querySelector('.delete-modal').classList.remove("invisible");
    }
}

const closeModal = (modalSelect) => {
    switch(modalSelect){
        case 'modify':
            document.querySelector('.edit-modal').classList.add("invisible");
            // modal.innerHTML = "";
            break;
        case 'delete':
            document.querySelector('.delete-modal').classList.add("invisible");
    }

}

const modifySubmitButtonOnClick = (id) => {
    const newTodoContent = document.querySelector(".modal-main .edit-text-input").value;
    const todo = TodoListService.getInstance().getTodoById(id);

    //변경사항이 없거나 수정할 내용을 공백으로 뒀을 경우
    if (todo.todoContent === newTodoContent || !newTodoContent) {
        return;
    }
    const todoObj = {
        ...todo,
        todoContent: newTodoContent
    }
    TodoListService.getInstance().setTodo(todoObj);
}

const modifyModal = (todo) => {
    const editModal = document.querySelector(".edit-modal");
    editModal.innerHTML = `
        <div class="modal-container">
            <header class="modal-header">
                <h1 class="modal-title">Edit Todo</h1>
                <p class="modal-message">please edit todo</p>
            </header>
            <main class="modal-main">
                <input type="text" class="edit-text-input w-f" value="${todo.todoContent}">
            </main>
            <footer class="modal-footer">
                <button class="btn" onclick="closeModal(\`modify\`)">Cancel</button>
                <button class="btn" style="color: #26d452;" onclick="modifySubmitButtonOnClick(${todo.id}); closeModal(\`modify\`);">OK</button>
            </footer>
        </div>
    `;
}