const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

function getChromiumExecPath() {
    return require('puppeteer').executablePath().replace('app.asar', 'app.asar.unpacked');
}

var formidable = require('formidable');
var http = require('http');
var fs = require('fs');

async function a() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: getChromiumExecPath()
    });

    const page = await browser.newPage() // Abertura da página
    await page.goto("https://www.sefaz.mt.gov.br/arrecadacao/darlivre/menudarnovo?tipoTributo=22&tipoContribuinte=3&pagn=contribuinte")
    
    // Espera pelo campo de inscrição estadual e preenche
    await page.waitForSelector("#inscricaoEstadual");
    await page.type("#inscricaoEstadual", "13.310.064-2"); // Aqui você pode mudar para o valor desejado

    // Aguarda o botão para logar e clica
    await page.waitForSelector("#btnIncluir");
    await page.click("#btnIncluir");
    
    // Espera a página carregar para os campos seguintes
    await page.waitForSelector("#tributo");

    // Agora que os campos estão visíveis, preenche e coleta os valores inseridos
    await page.evaluate(() => {
        document.getElementById("periodoReferencia").value = "11/2024";  // Substitua com o valor desejado
        document.getElementById("tributo").value = "2810";  // Substitua com o valor desejado
        document.getElementById("tributo").dispatchEvent(new Event("change"));  
        document.getElementById("dataVencimento").value = "31/12/2024";  // Substitua com o valor desejado
        document.getElementById("valorCampo").value = "500";  // Substitua com o valor desejado
    });

    // Captura os valores inseridos nos campos
    const periodoReferencia = await page.$eval("#periodoReferencia", el => el.value);
    const tributo = await page.$eval("#tributo", el => el.value);
    const dataVencimento = await page.$eval("#dataVencimento", el => el.value);
    const valorCampo = await page.$eval("#valorCampo", el => el.value);

    // Exibe os valores no console
    console.log(`Periodo Referencia: ${periodoReferencia}`);
    console.log(`Tributo: ${tributo}`);
    console.log(`Data Vencimento: ${dataVencimento}`);
    console.log(`Valor do Campo: ${valorCampo}`);
}

a();
