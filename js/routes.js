class Routes {
    static #instance = null;

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new Routes();
        }
        return this.#instance;
    }
    routeState = "today";

    show() {
        // this.clear(); 사용 x
        const title = document.querySelector(".title");
        switch (this.routeState) {
            case "today":
                title.innerHTML = '<h1>Today</h1>';
                TodoListService.getInstance().updateTodoList();
                break;

            case "inbox":
                title.innerHTML = '<h1>Inbox</h1>';
                TodoListService.getInstance().updateTodoList();
                break;
        }
    }
    //사용 x
    // clear() {
    //     //요소의 자식들 중에 div
    //     const pages = document.querySelectorAll(".main-container > div"); 
    //     //== welcome page, todo page
    //     pages.forEach(page => {
    //         page.classList.add("invisible"); //모든 페이지 display none
    //     });
    // }
}