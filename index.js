const express = require('express');
const pupprteer = require('puppeteer');
const app = express();
const port = 3000;

const release_version_link = "https://www.greydoom.com/2022/10/forza-horizon-5-steam-updates-list-with.html";
const update_url = "https://teamkong.tk/forza-horizon-5/";

async function check_online_version(new_version, res) {
    try {
        const browser = await pupprteer.launch();
        const page = await browser.newPage();
        await page.goto(update_url);

        const [el] = await page.$x('/html/body/div[2]/div[2]/div/div[1]/main/article/div[1]/div[1]/header/div/div/h1');
        const get_title = await el.getProperty('textContent');
        const title = await get_title.jsonValue();

        if (title.includes(new_version)) {
            var count = 1;

            while (1) {
                try {
                    const [el] = await page.$x('/html/body/div[2]/div[2]/div/div[1]/main/article/div[1]/div[2]/div/div[' + count + ']');
                    const [el2] = await page.$x('/html/body/div[2]/div[2]/div/div[1]/main/article/div[1]/div[2]/div/div[' + count + ']/a');
                    const get_title = await el.getProperty('textContent');
                    const linkTitle = await get_title.jsonValue();

                    if (linkTitle.includes('Magnet')) {
                        const get_link = await el2.getProperty('href');
                        const upd_link = await get_link.jsonValue();
                        res.status(200).json({ upd_link });
                        console.log(upd_link);
                    }

                    count++;
                } catch (error) {
                    break;
                }
            }
        }

        await browser.close(); // Chiudi il browser Puppeteer

    } catch (error) {
        console.error('Errore generale:', error.message);
    }
}

function check(installed_version, new_version, res) {
    if (installed_version != new_version) {
        console.log("");
        check_online_version(new_version, res);
    } else {
        console.log("Hai già la versione più recente del gioco");
        res.status(200).json({ message: "Hai già la versione più recente del gioco" });
    }
}

async function scrapeUpdate(last_div, url) {
    try {
        const browser = await pupprteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const [el] = await page.$x('//*[@id="Blog1"]/div/div[1]/div[2]/div[' + last_div + ']/span');
        const get_last_version = await el.getProperty('textContent');
        const version = await get_last_version.jsonValue();
        await browser.close(); // Chiudi il browser Puppeteer
        return version;
    } catch (err) {
        console.log(err.message);
    }
}

app.get('/checkupdate', async (req, res) => {
    try {
        const { last_div, current_game_version } = req.query;

        var current_released_version = await scrapeUpdate(last_div, release_version_link);

        if (current_released_version == "") {
            console.log("NON CI SONO AGGIORNAMENTI");
            res.status(200).json({ message: "Non ci sono aggiornamenti" });
        } else {
            console.log("Update Version: " + current_released_version);
            check(current_game_version, current_released_version, res);
        }
    } catch (error) {
        console.error('Errore generale nella route /checkupdate:', error.message);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
