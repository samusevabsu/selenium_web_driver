const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const MainPage = require('../pageObject/mainPage');
const BaseElements = require('../helpers/baseElements');
const SearchComponent = require('../pageObject/pageComponents/searchComponent');
const BasePage = require('../pageObject/basePage');

const mainPage = new MainPage();
const baseElements = new BaseElements();
const searchComponent = new SearchComponent();

describe('chromedriver tests', () => {

    after(async() => {
        await BasePage.close();
    });

    it(`Check 'Home' page Title`, async () => {
        await BasePage.navigate('https://chromedriver.chromium.org/home');
        await driver.wait(until.elementIsVisible(mainPage.homeTitle), 5000);
        const mainTtile = await mainPage.homeTitle;
        expect(await mainTtile.getText()).to.contain('ChromeDriver');
    })


    it(`Check 'Chrome Extensions' page title`, async () => {
        await BasePage.navigate('https://chromedriver.chromium.org/extensions');
        await driver.wait(until.elementIsVisible(mainPage.homeTitle), 5000);
        let extensionTitle = await mainPage.homeTitle;
        expect(await extensionTitle.getText()).to.contain('Chrome Extensions');
    })

    it('Check Search Results', async () => {
        await BasePage.navigate('https://chromedriver.chromium.org/');
        await baseElements.click(searchComponent.searchButton);
        await baseElements.sendKeys(searchComponent.searchField, 'driver');
        await baseElements.click(searchComponent.startSearch);
        await driver.sleep(2000);
        await driver.wait(until.elementIsVisible(searchComponent.resultsOnThisSite), 5000);
        const descriptions = await searchComponent.searchResultDescription;
        expect(await descriptions.getText()).to.contain('driver');
    })
});