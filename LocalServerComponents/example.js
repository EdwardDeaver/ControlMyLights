const puppeteer = require('puppeteer');
/**
 * To have Puppeteer fetch a Firefox binary for you, first run:
 *
 *  PUPPETEER_PRODUCT=firefox npm install
 *
 * To get additional logging about which browser binary is executed,
 * run this example as:
 *
 *   DEBUG=puppeteer:launcher NODE_PATH=../ node examples/cross-browser.js
 *
 * You can set a custom binary with the `executablePath` launcher option.
 *
 *
 */

const firefoxOptions = {
  product: 'firefox',
  headless: false
};

(async () => {
  const browser = await puppeteer.launch(firefoxOptions);

  const page = await browser.newPage();
  console.log(await browser.version());

  await page.goto('https://news.ycombinator.com/');


  await browser.close();
})();
