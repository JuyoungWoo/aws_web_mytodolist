window.onload = () => {
    TodoListService.getInstance().updateTodoList();
    Routes.getInstance().show();
}