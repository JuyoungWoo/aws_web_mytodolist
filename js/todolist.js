
//할일을 입력하고 '추가' 버튼 눌렀을때
const addTodoButtonOnclickHandle = () => {
	generateTodoObj();
}

//할일을 입력하고 엔터 키를 쳤을 때도 할일 추가
const addTodoOnKeyUpHandle = (event) => {
	if (event.keyCode === 13) { //=엔터 키
		generateTodoObj();
	}
}

const checkedOnChangeHandle = (target) => {
	TodoListService.getInstance().setCompleteStatus(target.value, target.checked);
}

const modifyTodoOnClickHandle = (target) => {
	openEditModal();
	modifyModal(TodoListService.getInstance().getTodoById(target.value));
}

const deleteTodoOnClickHandle = (target) => {
	openRemoveModal();
	TodoListService.getInstance().removeTodo(target.value);
}

//todo 객체 생성하고 addTodo() 호출
const generateTodoObj = () => {
	const todoContent = document.querySelector(".todo-text-input").value;
	const todoObj = {
		id: 0,
		todoContent: todoContent,
		createDate: DateUtils.toStringByFormatting(new Date()), //오늘의 날짜를 '2023-08-13' 처럼 포맷팅하여 가져옴
		createDateObj: new Date(),
		completeStatus: false //처음엔 체크 안되어있음
	};
	TodoListService.getInstance().addTodo(todoObj);
}

//싱글톤
class TodoListService {
	todoList = new Array();
	todoIndex = 1;

	static #instance = null;

	static getInstance() {
		if (this.#instance === null) {
			this.#instance = new TodoListService();
		}
		return this.#instance;
	}
	//화면에 구분되어 보여질 리스트를 따로 생
	overdueList = new Array();
	todayList = new Array();
	completedList = new Array();

	constructor() { //객체가 생성될 때 기존 로컬스토리지에 있는 데이터를 불러옴
		this.loadTodoList();
	}
	//local Storage에 있는 기존 데이터 불러와서 todoList에 추가
	loadTodoList() {
		//JSON.parse(제이슨 문자열); : json -> 객체
		//JSON.stringify(객체); : 객체 -> json

		//기존 로컬스토리지에 todolist가 있으면 그 배열을 반환, false 면 새 배열 생성
		this.todoList = !!localStorage.getItem("todoList") ?
			JSON.parse(localStorage.getItem("todoList")) : new Array();

		//기존의 마지막 인덱스를 가져옴 / 비어있으면 인덱스도 초기화
		this.todoIndex = !!this.todoList[this.todoList.length - 1]?.id ?      //
			this.todoList[this.todoList.length - 1].id + 1 : 1;
		/* this.todoList[this.todoList.length - 1]?.id
		* ?: 객체 주소를 참조하여 id를 가져오되, 값이 없으면 .으로 참조하지 않음
		*/
	}

	saveLocalStorage() { //로컬 스토리지에 저장하는 문장을 따로 함수로 뺌
		localStorage.setItem("todoList", JSON.stringify(this.todoList));
		//배열 -> json으로 만들어 로컬 스토리지에 저장
	}

	//수정할 때 수정할 할일의 id만 가져옴
	getTodoById(id) {
		//filter(): 조건에 맞는 요소만 새 배열에 담아줌
		// console.log(this.todoList);
		// console.log(this.todoList.filter(todo => todo.id === parseInt(id)) );
		// console.log(this.todoList.filter(todo => todo.id === parseInt(id))[0]);

		//매개변수로 받은 id와 일치하는 투두만 가져옴
		return this.todoList.filter(todo => todo.id === parseInt(id))[0];
	}

	addTodo(todoObj) {
		const todo = {
			...todoObj,
			id: this.todoIndex //id만 새로 바꿈
		};

		this.todoList.push(todo);
		this.saveLocalStorage();
		//배열 -> json으로 만들어 로컬 스토리지에 저장
		this.updateTodoList();
		this.todoIndex++;
	}

	setCompleteStatus(id, status) {
		//매개변수로 받아온 id는 html요소의 value임(문자열)-> parseInt()로 숫자로 변환
		this.todoList.forEach((todo, index) => {
			//(todo를 하나씩 꺼내면서 index도 지정)
			if (todo.id === parseInt(id)) {
				this.todoList[index].completeStatus = status;
			}
		});
		this.saveLocalStorage();
		this.updateTodoList();
	}

	setTodo(todoObj) {
		for (let i = 0; i < this.todoList.length; i++) {
			if (this.todoList[i].id === todoObj.id) { //수정할 todo를 찾음
				this.todoList[i] = todoObj;
				break;
			}
		}

		this.saveLocalStorage();
		this.updateTodoList();
	}

	removeTodo(id) {
		this.todoList = this.todoList.filter(todo => {
			return todo.id !== parseInt(id); // id가 동일한 것만 담기
		});
		//filter: 조건이 참이면 새로운 배열

		this.saveLocalStorage();
		this.updateTodoList();

	}

	updateTodoList() {
		
		//1. Today이면 <li> 요소는 Overdue, Today, 오늘 체크한 completed만
		//2. Inbox이면 incompleted(이건 list-name 없음), completed만
		this.overdueList = new Array();
		this.todayList = new Array();
		this.completedList = new Array();

		this.todoList.forEach(todo => {
			let listItem = `
				<li class="list-items">
					<div class="item-left">
						<input type="checkbox" id="complete-chkbox${todo.id}" class="complete-chkboxes" ${todo.completeStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
						<label for="complete-chkbox${todo.id}"></label>
					</div>
					<div class="item-center">
						<pre class="todo-content">${todo.todoContent}</pre>
					</div>
					<div class="item-right">
						<p class="todolist-date">${todo.createDate}</p>
						<button class="todo-edit-button" value="${todo.id}" onclick="modifyTodoOnClickHandle(this);"> 
							<i class="fa-solid fa-pen"></i>
						</button>
						<button class="todo-delete-button" value="${todo.id}" onclick="deleteTodoOnClickHandle(this);">
							<i class="fa-solid fa-trash"></i>
						</button>
					</div>
				</li>`;	
			// console.log(DateUtils.transSpecificDate(todo.createDateObj));
			if (todo.createDate === DateUtils.toStringByFormatting(new Date()) && !todo.completeStatus) {
				//생성날짜가 오늘이고 미완료
				console.log('Today(오늘이고 미완료)');
				this.todayList.push(listItem);
			} else if (!todo.completeStatus) {
				//지난 것들 중 미완료
				console.log('Overdue(지난 것들 중 미완료)');
				this.overdueList.push(listItem);
			} else {
				//완료된 할일
				console.log('Completed(완료된 할일)');
				this.completedList.push(listItem);
			}
			
		});

		//ul 태그요소
		const todolistMainContainer = document.querySelector(".list-contents");
		todolistMainContainer.innerHTML = "";
		
		//1. Today인 경우
		switch(Routes.getInstance().routeState){
			case "today":
				if (this.overdueList.length !== 0) {
					todolistMainContainer.innerHTML += `<h1 class="list-name">Overdue</h1>`;
					todolistMainContainer.innerHTML += this.overdueList.join("");
				}
				if (this.todayList.length !== 0) {
					todolistMainContainer.innerHTML += `<h1 class="list-name">Today</h1>`;
					todolistMainContainer.innerHTML += this.todayList.join("");
				}
				// console.log(this.completedList.length);
				if (this.completedList.length !== 0) {
					todolistMainContainer.innerHTML += `<h1 class="list-name">Completed</h1>`;
					todolistMainContainer.innerHTML += this.completedList.join("");
				}
				break;
				
			case "inbox":
				todolistMainContainer.innerHTML = this.todoList.map(todo => {
					if(!todo.completeStatus) {
						return `
						<li class="list-items">
							<div class="item-left">
								<input type="checkbox" id="complete-chkbox${todo.id}" class="complete-chkboxes" ${todo.completeStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
								<label for="complete-chkbox${todo.id}"></label>
							</div>
							<div class="item-center">
								<pre class="todo-content">${todo.todoContent}</pre>
							</div>
							<div class="item-right">
								<p class="todolist-date">${todo.createDate}</p>
								<button class="todo-edit-button" value="${todo.id}" onclick="modifyTodoOnClickHandle(this);"> 
									<i class="fa-solid fa-pen"></i>
								</button>
								<button class="todo-delete-button" value="${todo.id}" onclick="deleteTodoOnClickHandle(this);">
									<i class="fa-solid fa-trash"></i>
								</button>
							</div>
						</li>`;
					}
				}).join("");
				todolistMainContainer.innerHTML += `<h1 class="list-name">Completed</h1>`;
				todolistMainContainer.innerHTML += this.completedList.join("");
		}
		
		//2. Inbox인 경우
	}

}