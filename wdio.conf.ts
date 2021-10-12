import path from 'path';

export const config: WebdriverIO.Config = {
    baseUrl: 'https://random.org/',
    specs: ['./test/specs/'],
    capabilities: [{
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            'prefs': {
                'download.default_directory': `${process.cwd()}`
            }
        }
        }
    ],
    logLevel: 'debug',
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 30000
    },
    reporters: ['spec'],

    afterTest: async (test, context, { error, result, duration, passed }) => {
        if (!passed) {
            const nameBase = `${Date.now()}`;
            const screenshotName = `${nameBase}.png`;
            await browser.saveScreenshot(path.resolve('.', screenshotName));
        }
    }
};