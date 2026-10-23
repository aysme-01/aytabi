
const schedules = [
    {
        time: "09:40",
        title: "大阪難波駅 集合",
        description: "近鉄奈良線で奈良へ出発",
        map: "https://www.google.com/maps/search/?api=1&query=大阪難波駅",
        photo: "images/namba.jpg"
    },
    {
        time: "10:31",
        title: "近鉄奈良駅 到着",
        description: "奈良観光スタート！",
        map: "https://www.google.com/maps/search/?api=1&query=近鉄奈良駅",
        photo: "images/namba.jpg"
    },
    {
        time: "11:00",
        title: "般若寺",
        description: "秋のコスモスを楽しむ",
        map: "https://www.google.com/maps/search/?api=1&query=般若寺",
        photo: "images/namba.jpg"
    },
    {
        time: "12:15",
        title: "奈良監獄",
        description: "旧奈良監獄を見学",
        map: "https://www.google.com/maps/search/?api=1&query=奈良監獄",
        photo: "images/namba.jpg"
    },
    {
        time: "15:00",
        title: "奈良公園",
        description: "奈良公園周辺を散策",
        map: "https://www.google.com/maps/search/?api=1&query=奈良公園",
        photo: "images/namba.jpg"
    },
    {
        time: "17:00",
        title: "夕食へ移動",
        description: "夕食のお店へ向かう",
        map: "https://www.google.com/maps/search/?api=1&query=近鉄奈良駅",
        photo: "images/namba.jpg"
    },
    {
        time: "18:00",
        title: "なら酒蔵なべ",
        description: "夕食",
        map: "https://www.google.com/maps/search/?api=1&query=なら酒蔵なべ",
        photo: "images/namba.jpg"
    }
];

let currentIndex = 0;

function renderSchedule() {
    const schedule = schedules[currentIndex];

    document.getElementById("nextCount").textContent =
        `${String(currentIndex + 1).padStart(2, "0")} / ${String(schedules.length).padStart(2, "0")}`;

    document.getElementById("nextTime").textContent = schedule.time;
    document.getElementById("nextTitle").textContent = schedule.title;
    document.getElementById("nextDescription").textContent = schedule.description;
    document.getElementById("nextMapLink").href = schedule.map;

    document.getElementById("prevSchedule").disabled = currentIndex === 0;
    document.getElementById("nextSchedule").disabled =
        currentIndex === schedules.length - 1;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("prevSchedule").addEventListener("click", () => {
        currentIndex--;
        renderSchedule();
    });

    document.getElementById("nextSchedule").addEventListener("click", () => {
        currentIndex++;
        renderSchedule();
    });

    renderSchedule();
});
