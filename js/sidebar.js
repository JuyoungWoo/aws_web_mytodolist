
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
	switch (target.innerText) {
		case "Today":
			Routes.getInstance().routeState = "today";
			break;
		case "Inbox":
			Routes.getInstance().routeState = "inbox"
			break;
	}
	Routes.getInstance().show(); //Routes.show(): routeState에 따라 페이지 전환
	toggleBtnOnclickHandle();//사이드바 메뉴 누르면 사이드바가 닫히게
}

