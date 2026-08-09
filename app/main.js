const container = document.getElementById("extensions");
const searchbox = document.getElementById("searchbox");
const start_screen = document.getElementById("start_screen");
const filters_btn = document.getElementById("filters-btn");
const filters_menu = document.getElementById("filters_menu");

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
    document.getElementById("gradient_text").style.background = "linear-gradient(45deg, #26bdd8, #40ffdd)";
    document.getElementById("gradient_text").style.backgroundClip = "text";
    document.getElementById("gradient_text").style.webkitBackgroundClip = "text";
    document.getElementById("gradient_text").style.color = "transparent";

    document.getElementById("header").style.borderBottom = "1.5px solid #04dfd9";

    document.querySelector("body").style.backgroundColor = "#202428";
    document.getElementById("header").style.backgroundColor = "#2b3035";
    document.getElementById("searchbox").style.backgroundColor = "#343a40";

    return;
}
if (settings.theme == "Sunset"){
    document.getElementById("gradient_text").style.background = "linear-gradient(45deg, #ff6f4b, #e13661)";
    document.getElementById("gradient_text").style.backgroundClip = "text";
    document.getElementById("gradient_text").style.webkitBackgroundClip = "text";
    document.getElementById("gradient_text").style.color = "transparent";

    document.getElementById("header").style.borderBottom = "1.5px solid #fd4c55";

    document.querySelector("body").style.backgroundColor = "#0F1118";
    document.getElementById("header").style.backgroundColor = "#161A24";
    document.getElementById("searchbox").style.backgroundColor = "#202636";

    return;
}
if (settings.theme == "Cosmos"){
    return;
}

}

updateTheme()

async function getAverageColor(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            const data = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            ).data;

            let r = 0, g = 0, b = 0;
            const pixels = data.length / 4;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }

            r = Math.round(r / pixels);
            g = Math.round(g / pixels);
            b = Math.round(b / pixels);

            resolve(`rgba(${r + 60}, ${g + 60}, ${b + 60}, 0.7)`);
        };

        img.onerror = reject;
        img.src = url;
    });
}

function search_extensions(q) {
    container.innerHTML = "";
    const stmt = db.prepare(`
        SELECT *
        FROM extensions
        WHERE name LIKE ?
        AND type LIKE ?
        ORDER BY users_count DESC
        LIMIT 100;
    `);

    if (chromium_active) {
    stmt.bind([`%${q}%`, `%Chromium%`]);
    } else {
    stmt.bind([`%${q}%`, `%Firefox%`]);  
    }

    let extension_count = 0
    while (stmt.step()) {
        extension_count += 1
        const tileId = `ext_num_${extension_count}`;
        const extension = stmt.getAsObject();

        const id = extension.id;
        const slug = extension.slug;
        const name = extension.name;
        const desc = extension.short_description;
        const icon = extension.icon_url;
        const dev = extension.developer === "None" ? "" : extension.developer;
        const rating = extension.rating === "None" ? "0" : extension.rating;
        const rating_count = extension.rating_count === "None" ? "0" : extension.rating_count;
        const users_count = extension.users_count === "None" ? "0" : extension.users_count;
        const categories = extension.categories;
        const featured = extension.is_featured;
        const template_featured = `
        <a href="https://clients2.google.com/service/update2/crx?response=redirect&prodversion=122.0&acceptformat=crx2,crx3&x=id%3D${id}%26installsource%3Dondemand%26uc" class="tile-link" class="tile-link">
        <div class="tile" id="${tileId}">
            <img src="${icon}">
            <div class="text">
                <div class="title"><svg class="featured_badge" height="14" viewBox="0 0 24 24" width="14" focusable="false" class="NXD8lf mTuktf NMm5M"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 15-4 1.02v-3.1c1.18.68 2.54 1.08 4 1.08s2.82-.4 4-1.08v3.1L12 19zm-3-9c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path></svg>${name}</div>
                <div class="info">${users_count} users, ${rating}/5★(${rating_count}), ${dev}.</div>
                <div class="desc">${desc}</div>
                <div class="info">${categories}</div>
            </div>
        </div>
        </a>
        `;
        const template_basic = `
            <a href="https://clients2.google.com/service/update2/crx?response=redirect&prodversion=122.0&acceptformat=crx2,crx3&x=id%3D${id}%26installsource%3Dondemand%26uc" class="tile-link">
            <div class="tile" id="${tileId}">
                <img src="${icon}">
                <div class="text">
                    <div class="title">${name}</div>
                    <div class="info">${users_count} users, ${rating}/5★(${rating_count}), ${dev}.</div>
                    <div class="desc">${desc}</div>
                    <div class="info">${categories}</div>
                </div>
            </div>
            </a>
        `;

        if(featured == 1){
        container.insertAdjacentHTML("beforeend", template_featured); 
        }else{
            container.insertAdjacentHTML("beforeend", template_basic); 
        }
        

        if (settings.coloredTiles == "On") {
            getAverageColor(icon).then(color => {
                const tile = document.getElementById(tileId);
                if (tile) {
                    tile.style.backgroundColor = color;
                }
            });
        }


    }

    stmt.free();
}


async function initDB() {
    const SQL = await initSqlJs({
        locateFile: file =>
            `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
    });

    const res = await fetch("extensions.db");
    const buf = await res.arrayBuffer();

    db = new SQL.Database(
        new Uint8Array(buf)
    );
}

//filters and search

let filters_opened = false;
let extensions_active = false;

initDB().then(() => {
    searchbox.oninput = () => {
        filters_opened = false
        extensions_active = true
        container.style.display = "grid";
        start_screen.style.display = 'none';
        filters_menu.style.display = "none";
        search_extensions(searchbox.value);
    };
});


filters_btn.addEventListener('click', () => {
    if (!filters_opened) {
        start_screen.style.display = "none";
        container.style.display = "none";
        filters_menu.style.display = "grid";
        filters_menu.style.paddingTop = "10.5vh";
        filters_opened = true
    } else {
        if (extensions_active) {
            filters_menu.style.display = "none";
            container.style.display = "grid";
        } else {
            filters_menu.style.display = "none";
            start_screen.style.display = "block";
            start_screen.style.paddingTop = "10.5vh";
        }
        filters_opened = false     
    }
});


//category filters 
function by_category(cat){
    container.innerHTML = "";
    const stmt = db.prepare(`
        SELECT *
        FROM extensions
        WHERE categories LIKE ?
        AND type LIKE ?
        ORDER BY users_count DESC
        LIMIT 100;
    `);

    if (chromium_active) {
    stmt.bind([`%${cat}%`, `%Chromium%`]);
    } else {
    stmt.bind([`%${cat}%`, `%Firefox%`]);  
    }

    let extension_count = 0
    while (stmt.step()) {
        extension_count += 1
        const tileId = `ext_num_${extension_count}`;
        const extension = stmt.getAsObject();

        const id = extension.id;
        const slug = extension.slug;
        const name = extension.name;
        const desc = extension.short_description;
        const icon = extension.icon_url;
        const dev = extension.developer === "None" ? "" : extension.developer;
        const rating = extension.rating === "None" ? "0" : extension.rating;
        const rating_count = extension.rating_count === "None" ? "0" : extension.rating_count;
        const users_count = extension.users_count === "None" ? "0" : extension.users_count;
        const categories = extension.categories;
        const featured = extension.is_featured;
        const template_featured = `
        <a href="https://clients2.google.com/service/update2/crx?response=redirect&prodversion=122.0&acceptformat=crx2,crx3&x=id%3D${id}%26installsource%3Dondemand%26uc" class="tile-link" class="tile-link">
        <div class="tile" id="${tileId}">
            <img src="${icon}">
            <div class="text">
                <div class="title"><svg class="featured_badge" height="14" viewBox="0 0 24 24" width="14" focusable="false" class="NXD8lf mTuktf NMm5M"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 15-4 1.02v-3.1c1.18.68 2.54 1.08 4 1.08s2.82-.4 4-1.08v3.1L12 19zm-3-9c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path></svg>${name}</div>
                <div class="info">${users_count} users, ${rating}/5★(${rating_count}), ${dev}.</div>
                <div class="desc">${desc}</div>
                <div class="info">${categories}</div>
            </div>
        </div>
        </a>
        `;
        const template_basic = `
            <a href="https://clients2.google.com/service/update2/crx?response=redirect&prodversion=122.0&acceptformat=crx2,crx3&x=id%3D${id}%26installsource%3Dondemand%26uc" class="tile-link">
            <div class="tile" id="${tileId}">
                <img src="${icon}">
                <div class="text">
                    <div class="title">${name}</div>
                    <div class="info">${users_count} users, ${rating}/5★(${rating_count}), ${dev}.</div>
                    <div class="desc">${desc}</div>
                    <div class="info">${categories}</div>
                </div>
            </div>
            </a>
        `;

        if(featured == 1){
        container.insertAdjacentHTML("beforeend", template_featured); 
        }else{
            container.insertAdjacentHTML("beforeend", template_basic); 
        }
        
        if (settings.coloredTiles == "On") {
            getAverageColor(icon).then(color => {
                const tile = document.getElementById(tileId);
                if (tile) {
                    tile.style.backgroundColor = color;
                }
            });
        }

    }

    stmt.free();
}

function show_recommended(){
    container.innerHTML = "";
    const stmt = db.prepare(`
        SELECT *
        FROM extensions
        WHERE (
        id = 'iginnfkhmmfhlkagcmpgofnjhanpmklb' 
        OR id = 'ddkjiahejlhfcafbddmgiahcphecmpfh' 
        OR id = 'immngomjofcbflgcckkfddnbpmjokbjh' 
        OR id = 'pkehgijcmpdhfbdbbnkijodmdjhbjlgp'
        ) 
        AND type LIKE ?
        ORDER BY users_count DESC
        LIMIT 100;
    `);

    if (chromium_active) {
    stmt.bind([`%Chromium%`]);
    } else {
    stmt.bind([`%Firefox%`]);  
    }

    let extension_count = 0
    while (stmt.step()) {
        extension_count += 1
        const tileId = `ext_num_${extension_count}`;
        const extension = stmt.getAsObject();

        const id = extension.id;
        const slug = extension.slug;
        const name = extension.name;
        const desc = extension.short_description;
        const icon = extension.icon_url;
        const dev = extension.developer === "None" ? "" : extension.developer;
        const rating = extension.rating === "None" ? "0" : extension.rating;
        const rating_count = extension.rating_count === "None" ? "0" : extension.rating_count;
        const users_count = extension.users_count === "None" ? "0" : extension.users_count;
        const categories = extension.categories;
        const featured = extension.is_featured;
        const template_featured = `
        <a href="https://clients2.google.com/service/update2/crx?response=redirect&prodversion=122.0&acceptformat=crx2,crx3&x=id%3D${id}%26installsource%3Dondemand%26uc" class="tile-link" class="tile-link">
        <div class="tile" id="${tileId}">
            <img src="${icon}">
            <div class="text">
                <div class="title"><svg class="featured_badge" height="14" viewBox="0 0 24 24" width="14" focusable="false" class="NXD8lf mTuktf NMm5M"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2 6 2v-7.72c1.24-1.41 2-3.25 2-5.28zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 15-4 1.02v-3.1c1.18.68 2.54 1.08 4 1.08s2.82-.4 4-1.08v3.1L12 19zm-3-9c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path></svg>${name}</div>
                <div class="info">${users_count} users, ${rating}/5★(${rating_count}), ${dev}.</div>
                <div class="desc">${desc}</div>
                <div class="info">${categories}</div>
            </div>
        </div>
        </a>
        `;
        const template_basic = `
            <a href="https://clients2.google.com/service/update2/crx?response=redirect&prodversion=122.0&acceptformat=crx2,crx3&x=id%3D${id}%26installsource%3Dondemand%26uc" class="tile-link">
            <div class="tile" id="${tileId}">
                <img src="${icon}">
                <div class="text">
                    <div class="title">${name}</div>
                    <div class="info">${users_count} users, ${rating}/5★(${rating_count}), ${dev}.</div>
                    <div class="desc">${desc}</div>
                    <div class="info">${categories}</div>
                </div>
            </div>
            </a>
        `;

        if(featured == 1){
        container.insertAdjacentHTML("beforeend", template_featured); 
        }else{
            container.insertAdjacentHTML("beforeend", template_basic); 
        }
        
        if (settings.coloredTiles == "On") {
            getAverageColor(icon).then(color => {
                const tile = document.getElementById(tileId);
                if (tile) {
                    tile.style.backgroundColor = color;
                }
            });
        }

    }

    stmt.free();
}

function filter_button(btn, cat){
    btn.addEventListener('click', () => {
        filters_opened = false
        filters_menu.style.display = "none";
        container.style.display = "grid";
        by_category(cat)

    });
}

function recommended_filter_button(btn){
    btn.addEventListener('click', () => {
        filters_opened = false
        filters_menu.style.display = "none";
        container.style.display = "grid";
        show_recommended()
    });
}

recommended_filter_button(document.getElementById("recommended_btn"));
filter_button(document.getElementById("social_networking_btn"), "Social Networking");
filter_button(document.getElementById("privacy_security_btn"), "Privacy & Security");
filter_button(document.getElementById("games_btn"), "Games");
filter_button(document.getElementById("themes_btn"), "Theme");
filter_button(document.getElementById("dev_tools_btn"), "Developer Tools");
filter_button(document.getElementById("functionality_ui_btn"), "Functionality & UI");
filter_button(document.getElementById("communication_btn"), "Communication");
filter_button(document.getElementById("just_for_fun_btn"), "Just for Fun");
filter_button(document.getElementById("news_weather_btn"), "News & Weather");
filter_button(document.getElementById("shopping_btn"), "Shopping");
filter_button(document.getElementById("travel_btn"), "Travel");



let chromium_active = false
let firefox_active = false

document.getElementById("chromium-btn").addEventListener('click', () => {
    if(chromium_active){
        chromium_active = false
        firefox_active = true
        document.getElementById("chromium_disabled").style.display = "block";
        document.getElementById("chromium_enabled").style.display = "none";
        document.getElementById("firefox_disabled").style.display = "none";
        document.getElementById("firefox_enabled").style.display = "block";
    } else {
        chromium_active = true
        firefox_active = false
        document.getElementById("chromium_disabled").style.display = "none";
        document.getElementById("chromium_enabled").style.display = "block";
        document.getElementById("firefox_disabled").style.display = "block";
        document.getElementById("firefox_enabled").style.display = "none";
    }
});

document.getElementById("firefox-btn").addEventListener('click', () => {
    if(firefox_active){
        chromium_active = true
        firefox_active = false
        document.getElementById("chromium_disabled").style.display = "none";
        document.getElementById("chromium_enabled").style.display = "block";
        document.getElementById("firefox_disabled").style.display = "block";
        document.getElementById("firefox_enabled").style.display = "none";
    } else {
        chromium_active = false
        firefox_active = true
        document.getElementById("chromium_disabled").style.display = "block";
        document.getElementById("chromium_enabled").style.display = "none";
        document.getElementById("firefox_disabled").style.display = "none";
        document.getElementById("firefox_enabled").style.display = "block";
    }
});

if (typeof InstallTrigger !== "undefined" || navigator.userAgent.includes("Firefox")){
        chromium_active = false
        firefox_active = true
        document.getElementById("chromium_disabled").style.display = "block";
        document.getElementById("chromium_enabled").style.display = "none";
        document.getElementById("firefox_disabled").style.display = "none";
        document.getElementById("firefox_enabled").style.display = "block";
} else {
        chromium_active = true
        firefox_active = false
        document.getElementById("chromium_disabled").style.display = "none";
        document.getElementById("chromium_enabled").style.display = "block";
        document.getElementById("firefox_disabled").style.display = "block";
        document.getElementById("firefox_enabled").style.display = "none";
}