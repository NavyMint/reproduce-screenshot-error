import path from "path";

describe('download', () => {
    it('test', async() => {
        console.log(path.resolve(process.cwd()));
        await browser.url('https://the-internet.herokuapp.com/download');
        const link = await browser.$('a[href*=\'some-file.txt\']');
        await link.click();
        await browser.pause(5000);
    });
});
