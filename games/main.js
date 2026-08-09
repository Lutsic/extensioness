const DEFAULTS = {
    theme: 'Modern',
    coloredTiles: 'On',
    hideOnUnfocus: 'Off'
};

function loadSettings() {
    const settings = {};
    settings.theme = localStorage.getItem('extensioness_theme') || DEFAULTS.theme;
    settings.coloredTiles = localStorage.getItem('extensioness_coloredTiles') || DEFAULTS.coloredTiles;
    settings.hideOnUnfocus = localStorage.getItem('extensioness_hideOnUnfocus') || DEFAULTS.hideOnUnfocus;
    return settings;
}

const settings = loadSettings()

if(settings.hideOnUnfocus == 'On'){
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            window.location.href = 'https://google.com';
        }
    });
}



function updateTheme() {

if (settings.theme == "Modern"){
    document.getElementById("games_btn_active").style.color = "#04dfd9";
    document.getElementById("hostings_btn_active").style.color = "#04dfd9";
    document.getElementById("header").style.borderBottom = "1.5px solid #04dfd9";

    document.querySelector("body").style.backgroundColor = "#202428";
    document.getElementById("header").style.backgroundColor = "#2b3035";
    document.querySelectorAll(".card").forEach(el => {el.style.backgroundColor = "#2b3035";})

    return;
}
if (settings.theme == "Sunset"){
    document.getElementById("games_btn_active").style.color = "#fd4c55";
    document.getElementById("hostings_btn_active").style.color = "#fd4c55";
    document.getElementById("header").style.borderBottom = "1.5px solid #fd4c55";

    document.querySelector("body").style.backgroundColor = "#0F1118";
    document.getElementById("header").style.backgroundColor = "#161A24";
    document.querySelectorAll(".card").forEach(el => {el.style.backgroundColor = "#202636";})

    return;
}
if (settings.theme == "Cosmos"){
    return;
}

}

updateTheme()

document.getElementById("games_btn").addEventListener('click', () => {

document.getElementById("games").style.display = "grid";
document.getElementById("hostings").style.display = "none";

document.getElementById("games_btn_active").style.display = "block";
document.getElementById("hostings_btn_active").style.display = "none";

document.getElementById("hostings_btn").style.color = "#83878a";
document.getElementById("games_btn").style.color = "#c8d4dd";
});

document.getElementById("hostings_btn").addEventListener('click', () => {

document.getElementById("games").style.display = "none";
document.getElementById("hostings").style.display = "grid";

document.getElementById("games_btn_active").style.display = "none";
document.getElementById("hostings_btn_active").style.display = "block";


document.getElementById("hostings_btn").style.color = "#c8d4dd";
document.getElementById("games_btn").style.color = "#83878a";
});
