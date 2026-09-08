// 명함 페이지의 탭. WAI-ARIA 탭 패턴(클릭 + 좌우 방향키)을 따른다.
const tabs = Array.from(document.querySelectorAll('.tabs a[role="tab"]'));

function selectTab(tab, { focus = false } = {}) {
  tabs.forEach((other) => {
    const isSelected = other === tab;
    const panel = document.getElementById(other.getAttribute("aria-controls"));

    other.classList.toggle("active", isSelected);
    other.setAttribute("aria-selected", String(isSelected));
    // 로빙 tabindex: 선택된 탭만 Tab 키로 진입할 수 있게 한다.
    other.setAttribute("tabindex", isSelected ? "0" : "-1");

    if (panel) {
      panel.classList.toggle("tab-content--active", isSelected);
    }
  });

  if (focus) {
    tab.focus();
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", (event) => {
    // 기본 동작을 막지 않으면 URL 해시가 바뀌면서 페이지가 아래로 튄다.
    event.preventDefault();
    selectTab(tab);
  });

  tab.addEventListener("keydown", (event) => {
    let nextIndex = null;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectTab(tabs[nextIndex], { focus: true });
  });
});

// 마크업의 초기 상태를 그대로 한 번 적용해 클래스와 ARIA 속성을 맞춘다.
const initiallySelected = tabs.find((tab) => tab.getAttribute("aria-selected") === "true");
if (initiallySelected) {
  selectTab(initiallySelected);
}
