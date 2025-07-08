const { By } = require('selenium-webdriver');
const { isManifestV3 } = require('../../../../shared/modules/mv3.utils');
const FixtureBuilder = require('../../fixture-builder');
const {
  withFixtures,
  openDapp,
  unlockWallet,
  DAPP_URL,
  DAPP_ONE_URL,
  WINDOW_TITLES,
  largeDelayMs,
} = require('../../helpers');

describe('Request Queuing for Multiple Dapps and Txs on different networks', function () {
  it('should put confirmation txs for different dapps on different networks in single queue', async function () {
    const port = 8546;
    const chainId = 1338;
    await withFixtures(
      {
        dapp: true,
        fixtures: new FixtureBuilder().withNetworkControllerDoubleNode().build(),
        dappOptions: { numberOfDapps: 2 },
        localNodeOptions: [
          { type: 'anvil' },
          { type: 'anvil', options: { port, chainId } },
        ],
        title: this.test.fullTitle(),
      },

      async ({ driver }) => {
        await unlockWallet(driver);

        // Connect first dapp
        await openDapp(driver, undefined, DAPP_URL);
        await driver.clickElement({ text: 'Connect', tag: 'button' });
        await driver.switchToWindowWithTitle(WINDOW_TITLES.Dialog);
        await driver.clickElementAndWaitForWindowToClose({ text: 'Connect', tag: 'button' });
        
        await driver.switchToWindowWithTitle(WINDOW_TITLES.ExtensionInFullScreenView);
        
        // Switch network to second one
        await driver.clickElement('[data-testid="network-display"]');
        await driver.clickElement({ text:'Localhost 8546', css:'p' });
        
      	await driver.waitUntilXWindowHandles(2);

      	// Connect second dapp
      	await openDapp(driver, undefined, DAPP_ONE_URL);
      	await driver.clickElement({ text:'Connect', tag:'button' });
      	await driver.switchToWindowWithTitle(WINDOW_TITLES.Dialog);
      	await driver.clickElementAndWaitForWindowToClose({ text:'Connect', tag:'button' });

      	// Send transactions from both dapps
      	for (const url of [DAPP_URL, DAPP_ONE_URL]) {
        	await driver.switchToWindowWithUrl(url);
        	await driver.delay(largeDelayMs);
        	await Promise.all([driver.clickElement('#sendButton'),driver.clickElement('#sendButton')]);
	    }

	    // Confirm transactions queue dialog
	    await driver.switchToWindowWithTitle(WINDOW_TITLES.Dialog);

	    await driver.waitForSelector(By.xpath("//p[normalize-space(.)='1 of 4']"));
	    await Promise.all([
	     	driver.findElement({ css:'p', text:'Localhost 8545'}),
	     	driver.findElement({ css:'p', text:'Localhost 8546'})
	    ]);

    	// Confirm first two transactions on Localhost 8545
    	for(let i=0; i<2; i++) 
          await driver.clickElement('[data-testid="confirm-nav__next-confirmation"]');

    	if (isManifestV3) 
          await driver.clickElement({text:"Reject all",tag:"button"});
    	else 
          await driver.clickElementAndWaitForWindowToClose({text:"Reject all",tag:"button"});

    	await driver.waitUntilXWindowHandles(3);
	  }
    );
	});
});
