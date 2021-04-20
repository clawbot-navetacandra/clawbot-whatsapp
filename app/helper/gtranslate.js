const fetch = require('node-fetch');
const puppeteer = require('puppeteer')

async function helper(from, to, text) {
    let lang_from = from.toLowerCase();
    let lang_target = to.toLowerCase();
    const URI = `https://translate.google.co.id/?hl=id&sl=${lang_from}&tl=${lang_target}&text=${encodeURIComponent(text)}&op=translate`
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disk-cache-size=0'
        ],
        headless: true,
        product: 'chrome'
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(1000 * 3600);
    await page.goto(URI, { waitUntil: ['domcontentloaded', 'load', 'networkidle2'] });
    let translated = await page.evaluate(() => {
        return document.querySelector('span[jsname="W297wb"]').innerHTML
    });
    await browser.close();
    return translated
    
}


module.exports = helper