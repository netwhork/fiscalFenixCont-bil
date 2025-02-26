const pp = require("puppeteer")
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


function getChromiumExecPath() {
    return pp.executablePath().replace('app.asar', 'app.asar.unpacked');
}

var formidable = require('formidable');
var http = require('http');
var fs = require('fs');

async function a() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: getChromiumExecPath()
    });

    page = await browser.newPage() //loguin
    await page.goto("https://www.sefaz.mt.gov.br/arrecadacao/darlivre/menudarnovo?tipoTributo=35&tipoContribuinte=3&pagn=contribuinte")
    await page.waitForSelector("#CONTAINERTESTE").then(async () => {
        console.log("ACESSANDO SISTEMA")
        await page.evaluate(() => {
            document.getElementById("vUSUARIO_LOGIN").value = "03.300.663/0001-10"; //Login
            document.getElementById("vUSUARIO_SENHA").value = "923m5koq5"; //Senha
            document.getElementById("BTN_ENTER3").click() //logando
        })
    })

    await page.waitForSelector("#TB_TITULO").then(async () => {
        await page.evaluate(() => {
            document.getElementById("vFILTRO_CONTRIBUINTE_PESSOA_CPF_CNPJ").value = "32.944.092/0001-54" //	VALDEVINO DIAS DOS SANTOS - ME
        })
    })

    await page.waitForSelector("#span_vGRID_CONTRIBUINTE_PESSOA_NOME_0002").then(async () => {
        console.log("buscando CNPJ")
        await page.evaluate(() => {
            document.getElementById("BTN_CONSULTAR").click()
        })
    })

    await page.waitForSelector("#vBTN_MENSAGEM_0001").then(async () => {
        console.log("EMPRESA LOCALIZADA")
        await page.evaluate(() => {
            document.getElementById("vSELECIONE_0001").click() //pesquisa
        })
    })

    await page.waitForSelector("#IMG_NFSE").then(async () => {
        console.log("achei empresa")
    })

    await page.goto("https://www.gp.srv.br/tributario/sinop/mnfse_livro_tomador") //Prestado
    await page.waitForSelector("#TITULO").then(async () => {
        console.log("SERV TOMADOS")
        await page.evaluate(() => {
            var campo = document.getElementById('vEXERCICIO_MES_C').value;
            var mes = "1";
            const soma = campo - mes;
            document.getElementById('vEXERCICIO_MES_C').value = soma;
            document.getElementById("BTN_CONSULTAR2").click();
        })
    })

    await page.waitForSelector("#vBTN_IMPRIMIR_0001").then(async () => {
        console.log("Notas carregadas")
        await page.evaluate(() => {
            document.getElementById("vBTN_FILTRO").click();
            document.getElementById("vNFSE_PRESTADOR_CPF_CNPJ_MASC").value = "04.471.218/0001-85";//cnpj sindicato
            document.getElementById("BTN_CONSULTAR").click();
        })
    })

    await page.waitForSelector("#vCHECK_0001").then(async () => {
        console.log("Nota BAixada")
        await page.evaluate(() => {
            document.getElementById("vBTN_IMPRIMIR_0001").click();
            /*  fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
                  if (err) throw err;
                  console.log('File Renamed!');
              })    
              https://www.w3schools.com/nodejs/default.asp

                   */
            
        })
    })

    //await browser.close();

}
a()

//SHIFT + ALT + F = ORGANIZAR COD//

/*
await page.waitForSelector("#span_vGRID_CONTRIBUINTE_PESSOA_INSC_MUN_0001").then(async () => {
    console.log("achei EMPRESA")
    await page.evaluate(() => {
        console.log("BAIXANDO XML")
        await page.evaluate(() => {
            document.getElementById("IMAGE2").click() //VALDEVINO DIAS DOS SANTOS - ME
            fs.rename('RELATORIO FISCAL.pdf', 'XML SERVIÇOS TOMADOS.pdf', function (err) {
                if (err) throw err;
                console.log('File Renamed!');
            })

        })
    })

    await page.waitForSelector("#span_vGRID_CONTRIBUINTE_PESSOA_INSC_MUN_0001").then(async () => {
        console.log("achei EMPRESA")
        await page.evaluate(() => {
            document.getElementById("vSELECIONE_0001").click() //PRINCESA REPRESENTACOES LTDA ME
            await page.goto("https://www.gp.srv.br/tributario/sinop/mnfse_livro_prestador")
            await page.waitForSelector("#TITULO").then(async () => {
                console.log("SERV. PRESTADOS XML")
                await page.evaluate(() => {
                    document.getElementById("IMAGE1").click() //livro fiscal
                    document.getElementById("BTN_NFSE_LOTE").click() //NFSE lote

                })
            })


*/
