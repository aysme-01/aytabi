
document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.getElementById("dinnerMenuCarousel");

    if (!carousel) return;

    const pageButtons = document.querySelectorAll(
        ".dinner-page-button"
    );

    // 写真が切り替わったとき
    carousel.addEventListener("slid.bs.carousel", () => {

        const items = carousel.querySelectorAll(".carousel-item");

        const activeIndex = Array.from(items).findIndex(item =>
            item.classList.contains("active")
        );

        pageButtons.forEach((button, index) => {
            button.classList.toggle("active", index === activeIndex);
        });

    });

    // ページボタンを押したとき
    pageButtons.forEach((button, index) => {

        button.addEventListener("click", () => {

            const instance = bootstrap.Carousel.getOrCreateInstance(
                carousel,
                {
                    interval: false,
                    ride: false
                }
            );

            instance.to(index);

        });

    });

});
