const puppeteer = require('puppeteer');

async function getGoogleDocContent(docId) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // URL Google Документа
  const url = `https://docs.google.com/document/d/${docId}/edit`;

  await page.goto(url, { waitUntil: 'networkidle2' });

  // Выполните скрипт для извлечения содержимого документа
  const content = await page.evaluate(() => {
    // Элементы содержимого документа
    const elements = document.querySelectorAll('body > div:nth-child(3) > div.kix-appview-editor > div.kix-appview-editor-content-container > div > div > div.kix-page > div > div > div.kix-page-content-wrapper > div.kix-page-content > div > div > div.kix-page-content-block > div.kix-page-content-block-content > div > div');
    let textContent = '';
    elements.forEach(el => {
      textContent += el.innerText + '\n';
    });
    return textContent;
  });

  await browser.close();
  return content;
}

// ID вашего Google Документа
const docId = '1Mx7S3CttoFEIULEPtBBAvXcWcJDgweQiAdqQfPC1x-E';

getGoogleDocContent(docId).then(content => {
  console.log(content);
  // Здесь можно сохранить или использовать полученное содержимое
});
