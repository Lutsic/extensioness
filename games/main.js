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
