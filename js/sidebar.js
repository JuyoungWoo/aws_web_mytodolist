
toggleBtnOnclickHandle = () => {
	const sidebarToggleButton = document.querySelector('.sidebar-toggle-button');
	const container = document.querySelector('.container');
	container.classList.toggle('sidebar-open');

	if (container.classList.contains("sidebar-open")) {
		sidebarToggleButton.innerHTML = `<i class="fa-solid fa-angles-left"></i>`;
	} else {
		sidebarToggleButton.innerHTML = '<i class="fa-solid fa-angles-right"></i>';
	}
}

const sidebarMenuOnClickHandle = (target) => {
	// console.log(target.innerHTML); 시작하기 / todolist
	switch (target.innerHTML) {
		case "Today":
			Routes.getInstance().routeState = "today";
			break;
		case "Inbox":
			Routes.getInstance().routeState = "inbox"
			break;
	}
	Routes.getInstance().show();
	sidebarToggleButtonOnClickHandle();//사이드바 메뉴 누르면 사이드바가 닫히게
}
