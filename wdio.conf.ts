

import path from 'path';
const isHeadless = process.env.isHeadless === 'true' ? true : false;
let additionalArgs: Array<string> = [];
if (isHeadless) {
    additionalArgs = ['--headless', '--disable-gpu', '--log-level=3'];
}

export const config: WebdriverIO.Config = {
    baseUrl: 'https://random.org/',
    waitforTimeout: 20000,
    specs: ['./test/specs/'],
    capabilities: [{
        'browserName': 'chrome',
        'maxInstances': 1,
        'goog:chromeOptions': {
            args: ['--disable-extensions', '--auth-server-whitelist="_"', '-window-position=0,0', '--window-size=1920,1080'].concat(additionalArgs),
            prefs: { 'download.default_directory': `${process.cwd()}\\downloads` }
        }
    }],
    logLevel: 'debug',
    framework: 'jasmine',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'
        },
    },
    jasmineOpts: {
        defaultTimeoutInterval: 30000
    },
    reporters: ['spec', 'teamcity'],

    onPrepare: () => {
        console.log('on prepare hook');
    },

    before: async () => {
        console.log('Before hook')
    },

    afterTest: async (test, context, { error, result, duration, passed }) => {
        if (!passed) {
            const nameBase = `${Date.now()}`;
            const screenshotName = `${nameBase}.png`;
            await browser.saveScreenshot(path.resolve('.', screenshotName));
        }
    },

    onComplete: async () => {
        console.log('On complete hook');
    }
};
