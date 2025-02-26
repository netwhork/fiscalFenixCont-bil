const { time } = require("console");
const { chromium } = require("playwright");

async function pref() {
  try {
    // Inicia o navegador Chromium
    const browser = await chromium.launch({
      headless: false, // Mostra o navegador
      slowMo: 50, // Adiciona um pequeno delay para visualizar as ações
    });

    const page = await browser.newPage();
    await page.goto("https://www.gp.srv.br/tributario/sinop/portal_login?1");
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");
    await page.fill("#vUSUARIO_LOGIN", "03.300.663/0001-10");
    await page.fill("#vUSUARIO_SENHA", "923m5koq5");
    await page.click("#BTN_ENTER3");
    await page.waitForSelector("#TB_TITULO", { state: "visible" });
    await page.click("#vBTN_FILTRO");
    await page.fill("#vFILTRO_CONTRIBUINTE_PESSOA_CPF_CNPJ", "000000");
    await page.click("#BTN_CONSULTAR");
    await page.waitForSelector(".Form.gx-masked", { state: "visible" }); //agudar o elecmento ficar visivel
    await page.waitForSelector(".Form.gx-masked", { state: "hidden" });
try {
    const elemento = await Promise.race([
        page.waitForSelector("#vSELECIONE_0001", { state: "visible" }),
        page.waitForSelector("#gxp0_b", { state: "visible" }) //fazer uma correação para buscar apenas o id "vSELECIONE_0001" se não achar dar o erro direto já que o outro id não importa já que é erro mesmo!
    ]);//talvez seja interessante essa dinamisa de 2 id diferentes na hora da consulta de NFSE se houve ou se não houve!
    if (await elemento.getAttribute('id') === 'vSELECIONE_0001') {
        await page.click("#vSELECIONE_0001");
    } else {
        console.log("Empresa não existe");
        await page.reload(); // Recarrega a página (F5)
    }
} catch (error) {
    console.error("Erro ao aguardar elementos:", error);
}
    await page.waitForSelector("#IMG_NFSE", { state: "visible" }); //agudar o elecmento ficar visivel
    await page.goto("https://www.gp.srv.br/tributario/sinop/portal_login?1");
  } catch (error) {
    console.error("Ocorreu um erro:", error);
  }
}

// Executa a função
pref();