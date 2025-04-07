import puppeteer, { Browser } from 'puppeteer';
import chromium from 'chrome-aws-lambda';

let browser: Browser;

(async () => {
  console.log('MOUNT N RUN');
  const isLambda = false; //false

  browser = await puppeteer.launch({
    // args: ['background-color=red'],
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: isLambda ? chromium.defaultViewport : null,
    // executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
    executablePath: isLambda ? await chromium.executablePath : puppeteer.executablePath(),
    headless: true,
  });
})();

// setInterval(async () => {
//   const memoryUsage = process.memoryUsage().heapUsed;
//   const memoryLimit = 500 * 1024 * 1024; // 500MB
//   if (memoryUsage > memoryLimit) {
//     await browser.close();
//     browser = await puppeteer.launch({
//       /* your launch options */
//     });
//     console.log('Browser restarted due to high memory usage');
//   }
// }, 60000); // 1 minute

export const printPage = async (htmlString: string) => {
  const page = await browser.newPage();
  await page.setContent(htmlString, { waitUntil: 'load' });
  const buffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });
  await page.close();

  return buffer;
};

// const pLimit = require('p-limit');
// const limit = pLimit(5); // Limit to 5 concurrent PDF generations

// export const printPage = async (htmlString: string) => {
//   return limit(async () => {
//     const page = await browser.newPage();
//     await page.setContent(htmlString, { waitUntil: 'load' });
//     const buffer = await page.pdf({ format: 'A4', printBackground: true });
//     await page.close();
//     return buffer;
//   });
// };
