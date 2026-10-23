
async function loadComponent(id, path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`${path} の読み込みに失敗しました`);
    }

    document.getElementById(id).innerHTML = await response.text();
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await Promise.all([
            loadComponent("header", "components/header.html"),
            loadComponent("footer", "components/footer.html")
        ]);

        const currentPage =
            location.pathname.split("/").pop() || "index.html";

        document.querySelectorAll("#footer .nav-link").forEach(link => {
            const isActive = link.getAttribute("href") === currentPage;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            }
        });

    } catch (error) {
        console.error(error);
    }
});
