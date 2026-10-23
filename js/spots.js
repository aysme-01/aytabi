
document.addEventListener("DOMContentLoaded", () => {

    const spotModals = {
        hannyaji: "spotHannyaji",
        prison: "spotPrison",
        park: "spotPark",
        kasuga: "spotKasuga",
        dinner: "spotDinner",
        izasa: "spotIzasa"
    };

    function openSpotFromHash() {

        const spotId = window.location.hash.replace("#", "");

        if (!spotId || !spotModals[spotId]) {
            return;
        }

        const tile = document.getElementById(spotId);
        const modalElement = document.getElementById(spotModals[spotId]);

        if (!tile || !modalElement) {
            return;
        }

        // グルメの場合はタブを切り替える
        const tabPanel = tile.closest(".tab-pane");

        if (tabPanel) {
            const tabButton = document.querySelector(
                `[data-bs-target="#${tabPanel.id}"]`
            );

            if (tabButton) {
                bootstrap.Tab.getOrCreateInstance(tabButton).show();
            }
        }

        // モーダル表示
        bootstrap.Modal.getOrCreateInstance(modalElement).show();
    }

    // URLにスポットIDが付いている場合
    openSpotFromHash();

    // 同じページ内でハッシュが変わった場合
    window.addEventListener("hashchange", openSpotFromHash);

});
