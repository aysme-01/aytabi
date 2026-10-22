
document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // AYtabi - 奈良旅スケジュール
    // ========================================

    const tripDate = "2026-10-24";

    const mapUrl = (place) =>
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(place);

    // ========================================
    // スケジュールデータ
    // ========================================

    const schedules = [
        {
            start: "09:40",
            end: "10:31",
            title: "大阪難波駅 集合",
            description: "9:54発の近鉄電車で奈良へ出発（時刻は要確認）",
            image: "images/namba.jpg",
            spots: [
                {
                    name: "大阪難波駅",
                    mapUrl: "https://maps.app.goo.gl/G6aQbC5gXgnDzLTx5",
                }
            ]
        },
        {
            start: "10:31",
            end: "11:00",
            title: "近鉄奈良駅 到着",
            description: "路線バスに乗り換えて般若寺へ",
            image: "images/kintetsu_nara.jpg",
            spots: [
                {
                    name: "近鉄奈良駅",
                    mapUrl: "https://maps.app.goo.gl/WSX323cZTmYQDNpg7",
                }
            ]
        },
        {
            start: "11:00",
            end: "12:15",
            title: "般若寺",
            description: "コスモス鑑賞。12:00頃に出発して奈良監獄へ",
            image: "images/hannyaji.jpg",
            spots: [
                {
                    name: "般若寺",
                    mapUrl: "https://maps.app.goo.gl/7nH99mktj1vAmfzs7",
                    detail: "spots.html#hannyaji"
                }
            ]
        },
        {
            start: "12:15",
            end: "15:00",
            title: "奈良監獄ミュージアム",
            description: "館内見学・軽めの昼食・ショップ",
            image: "images/nara-prison.jpg",
            spots: [
                {
                    name: "奈良監獄ミュージアム",
                    mapUrl: "https://maps.app.goo.gl/uRaJAG7GszqUsAcx7",
                    detail: "spots.html#prison"
                }
            ]
        },
        {
            start: "15:00",
            end: "17:00",
            title: "奈良公園周辺 フリータイム",
            description: "鹿と柿の葉寿司を楽しむ。余裕があれば春日大社へ",
            image: "images/nara-park.jpg",
            spots: [
                {
                    name: "奈良公園",
                    mapUrl: "https://maps.app.goo.gl/XdWDVhxpbH8eAWw1A",
                    detail: "spots.html#park"
                },
                {
                    name: "ゐざさ（柿の葉寿司）",
                    mapUrl: "https://maps.app.goo.gl/a44bec1SBKyHTkrGA",
                    detail: "spots.html#izasa"
                },
                {
                    name: "春日大社",
                    mapUrl: "https://maps.app.goo.gl/s8rGNWutpepSkAaj7",
                    detail: "spots.html#kasuga"
                }
            ]
        },
        {
            start: "17:00",
            end: "18:00",
            title: "夕食のお店へ移動",
            description: "18:00の夕食に向けて移動・時間調整",
            image: "",
            spots: []
        },
        {
            start: "18:00",
            end: "20:00",
            title: "なら酒蔵なべ",
            description: "夕食。帰りの予定は自由に。",
            image: "images/dinner.jpg",
            spots: [
                {
                    name: "なら酒蔵なべ",
                    mapUrl: "https://maps.app.goo.gl/ezX8QB2F3awtsWWR7",
                }
            ]
        }
    ];

    // ========================================
    // HTML要素
    // ========================================

    const nextCount = document.getElementById("nextCount");
    const nextTotal = document.getElementById("nextTotal");

    const nextTime = document.getElementById("nextTime");
    const nextTitle = document.getElementById("nextTitle");
    const nextDescription = document.getElementById("nextDescription");

    const nextPhoto = document.getElementById("nextPhoto");
    const nextPhotoWrap = document.getElementById("nextPhotoWrap");

    const nextSpotLink = document.getElementById("nextSpotLink");
    const nextMapLink = document.getElementById("nextMapLink");

    const prevButton = document.getElementById("prevSchedule");
    const nextButton = document.getElementById("nextSchedule");
    const nowButton = document.getElementById("nowSchedule");

    // NEXTカードのないページでは実行しない
    if (
        !nextCount ||
        !nextTotal ||
        !nextTime ||
        !nextTitle ||
        !nextDescription ||
        !nextPhoto ||
        !nextPhotoWrap ||
        !prevButton ||
        !nextButton ||
        !nowButton
    ) {
        return;
    }

    // ========================================
    // 状態管理
    // ========================================

    let currentIndex = 0;

    // false：現在時刻に自動追従
    // true ：手動で閲覧中
    let isManualMode = false;

    // HH:mm → 0時からの経過分
    function toMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    // ========================================
    // 現在の予定を判定
    // ========================================

    function getCurrentScheduleIndex() {

        const now = new Date();

        const today =
            `${now.getFullYear()}-` +
            `${String(now.getMonth() + 1).padStart(2, "0")}-` +
            `${String(now.getDate()).padStart(2, "0")}`;

        // 旅行日前：最初の予定
        if (today < tripDate) {
            return 0;
        }

        // 旅行日後：最後の予定
        if (today > tripDate) {
            return schedules.length - 1;
        }

        const currentMinutes =
            now.getHours() * 60 + now.getMinutes();

        // 現在進行中の予定
        const activeIndex = schedules.findIndex(item =>
            currentMinutes >= toMinutes(item.start) &&
            currentMinutes < toMinutes(item.end)
        );

        if (activeIndex !== -1) {
            return activeIndex;
        }

        // 進行中がなければ次の予定
        const nextIndex = schedules.findIndex(item =>
            toMinutes(item.start) > currentMinutes
        );

        if (nextIndex !== -1) {
            return nextIndex;
        }

        // 全予定終了：最後の予定
        return schedules.length - 1;
    }

    // ========================================
    // NEXTカード表示
    // ========================================

    function renderNext() {

        const item = schedules[currentIndex];
        const firstSpot = item.spots[0];

        // CH. 01 / 07
        nextCount.textContent =
            String(currentIndex + 1).padStart(2, "0");

        nextTotal.textContent =
            String(schedules.length).padStart(2, "0");

        // 予定内容
        nextTime.textContent = item.start;
        nextTitle.textContent = item.title;
        nextDescription.textContent = item.description;

        // スポット詳細
        if (nextSpotLink) {
            if (firstSpot?.detail) {
                nextSpotLink.href = firstSpot.detail;
                nextSpotLink.hidden = false;
            } else {
                nextSpotLink.hidden = true;
            }
        }

        // Googleマップ
        if (nextMapLink) {
            if (firstSpot?.mapUrl) {
                nextMapLink.href = firstSpot.mapUrl;
                nextMapLink.hidden = false;
            } else {
                nextMapLink.hidden = true;
            }
        }

        // 写真切り替え
        if (item.image) {
            nextPhoto.src = item.image;
            nextPhotoWrap.hidden = false;
        } else {
            nextPhoto.removeAttribute("src");
            nextPhotoWrap.hidden = true;
        }

        // 左右ボタン
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === schedules.length - 1;

        // NOWは手動操作中だけ表示
        nowButton.hidden = !isManualMode;
    }

    // ========================================
    // 自動追従
    // ========================================

    function updateAutomatically() {

        if (isManualMode) {
            return;
        }

        currentIndex = getCurrentScheduleIndex();
        renderNext();
    }

    // ========================================
    // 手動切り替え
    // ========================================

    prevButton.addEventListener("click", () => {

        if (currentIndex <= 0) return;

        isManualMode = true;
        currentIndex--;

        renderNext();
    });

    nextButton.addEventListener("click", () => {

        if (currentIndex >= schedules.length - 1) return;

        isManualMode = true;
        currentIndex++;

        renderNext();
    });

    // ========================================
    // NOW：自動追従に戻す
    // ========================================

    nowButton.addEventListener("click", () => {
        isManualMode = false;
        updateAutomatically();
    });

    // ========================================
    // 自動更新
    // ========================================

    // 1分ごとに現在時刻を確認
    setInterval(updateAutomatically, 60 * 1000);

    // 別タブから戻ったときにも確認
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            updateAutomatically();
        }
    });

    // 初期表示
    updateAutomatically();

});


document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("dinnerMenuCarousel");

    if (!carousel) return;

    const pageButtons = document.querySelectorAll(
        ".dinner-page-button"
    );

    carousel.addEventListener("slid.bs.carousel", (event) => {
        pageButtons.forEach((button, index) => {
            button.classList.toggle(
                "active",
                index === event.to
            );
        });
    });
});

