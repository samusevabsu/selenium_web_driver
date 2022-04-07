const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

const driver = new Builder().forBrowser('chrome').build();
driver.manage().window().maximize();


describe(`ChromeDriver Page Titles`, function () {

    it(`Check 'Home' page Title`, async () => {
        await driver.get('https://chromedriver.chromium.org/home');
        let siteTitle = await driver.getTitle();
        await driver.sleep(2000);
        expect(siteTitle).to.include('ChromeDriver');
    })

    it(`Check 'Chrome Extensions' page title`, async () => {
        let menuItemChromeExtension = await driver.findElement(By.xpath('//*[@id="WDxLfe"]/ul/li[3]/div[1]/div/a'));
        await menuItemChromeExtension.click();
        let extensionPageTitle = await driver.getTitle();
        expect(extensionPageTitle).to.include('Chrome Extensions');
    })
})

describe(`Check Global Search`, function () {

    it(`Check driver keyword is in results list`, async () => {
        let searchButton = await driver.findElement(By.xpath('//div[@class="RBEWZc"]'));
        await searchButton.click();
        let searchField = await driver.findElement(By.xpath('//input[@class="whsOnd zHQkBf"]'));
        await driver.wait(until.elementIsVisible(searchField), 3000)
        await searchField.sendKeys('driver');
        let startSearchButton = await driver.findElement(By.css('.U26fgb.mUbCce.fKz7Od.i3PoXe.M9Bg4d')); 
        await startSearchButton.click();
        await driver.sleep(2000);
        let resultsList = await driver.findElement(By.css('.yDWqEe'));
        expect(await resultsList.getText()).to.contain('driver');
        await driver.close();
    })
})