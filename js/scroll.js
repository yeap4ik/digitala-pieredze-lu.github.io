    document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("dynamic-content");

    const pages = ["klades", "kopienas", "komunikacija", "detoksikacija", "nakotne"];
    let currentIndex = 0;

    function setupNextButtons() {
    const nextButtons = content.querySelectorAll(".next-fragment");
    nextButtons.forEach(button => {
    button.addEventListener("click", () => {
    const nextPage = button.getAttribute("data-next");
    const nextIndex = pages.indexOf(nextPage);
    if (nextIndex !== -1) {
    loadFragment(nextIndex);
}
});
});
}

    async function loadFragment(index) {
    if (index >= pages.length) return;

    try {
    const page = pages[index];
    const res = await fetch(`fragments/${page}.html`);
    const html = await res.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    content.appendChild(tempDiv);

    tempDiv.scrollIntoView({ behavior: "smooth" });
    setupNextButtons(); // подключаем обработчики вновь загруженных кнопок
    currentIndex = index + 1;

    // Обновляем URL
    history.pushState({ page }, "", `?page=${page}`);
} catch (err) {
    content.innerHTML += "<p>Kļūda ielādējot lapu.</p>";
} finally {
}
}

    // Загружаем страницу из URL (если задана)
    function initFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const targetPage = urlParams.get("page");

    if (targetPage && pages.includes(targetPage)) {
    const targetIndex = pages.indexOf(targetPage);
    const loadAll = async () => {
    for (let i = 0; i <= targetIndex; i++) {
    await loadFragment(i);
}
};
    loadAll();
}
}

    // Обработка "назад/вперёд" кнопок браузера
    window.addEventListener("popstate", (e) => {
    const page = new URLSearchParams(location.search).get("page");
    content.innerHTML = ""; // очищаем
    currentIndex = 0;
    if (page && pages.includes(page)) {
    const targetIndex = pages.indexOf(page);
    const loadAll = async () => {
    for (let i = 0; i <= targetIndex; i++) {
    await loadFragment(i);
}
};
    loadAll();
}
});

    // Кнопка Tālāk на index.html (если используешь)
    const startButton = document.getElementById("load-next");
    if (startButton) {
    startButton.addEventListener("click", () => {
    loadFragment(0);
});
}

    initFromURL(); // загрузка из URL, если нужно
});