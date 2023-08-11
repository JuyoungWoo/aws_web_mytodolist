
//할일을 입력하고 엔터 키를 쳤을 때도 할일 추가
const addTodoOnKeyUpHandle = (event) => {
	if (event.keyCode === 13) { //=엔터 키
		generateTodoObj();
	}
}

class TodoListService {
	static #instance = null;

	static getInstance() {
		if (this.#instance === null) {
			this.#instance = new TodoListService();
		}
		return this.#instance;
	}
	todoList = new Array();
	todoIndex = 1;

	constructor() { //객체가 생성될 때 기존 로컬스토리지에 있는 데이터를 불러옴
		this.loadTodoList();
	}

	updateTodoList() {
		//ul 태그요소
		const todolistMainContainer = document.querySelector(".todolist-main-container");
		todolistMainContainer.innerHTML = this.todoList.map(todo => {
			return `
				<li class="todolist-items">
					<div class="item-left">
						<input type="checkbox" id="complete-chkbox${todo.id}" class="complete-chkboxes" ${todo.completeStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
						<label for="complete-chkbox${todo.id}"></label>
					</div>
					<div class="item-center">
						<pre class="todolist-content">${todo.todoContent}</pre>
					</div>
					<div class="item-right">
						<p class="todolist-date">${todo.createDate}</p>
						<div class="todolist-item-buttons">
							<button class="btn btn-edit" value="${todo.id}" onclick="modifyTodoOnClickHandle(this);">수정</button>
							<button class="btn btn-remove" value="${todo.id}" onclick="deleteTodoOnClickHandle(this);">삭제</button>
						</div>
					</div>
				</li>
			`;

		}).join("");

	}
}