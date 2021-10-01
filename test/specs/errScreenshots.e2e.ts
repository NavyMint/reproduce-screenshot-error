describe('Something', () => {

    it("test-2", async () => {
      await browser.url('https://random.org/');
      await (await browser.$('#fakeid')).waitForExist({ timeout: 3000 });
    });
  });


