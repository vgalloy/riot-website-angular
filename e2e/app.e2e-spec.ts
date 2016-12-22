import { CsminuteAppPage } from './app.po';

describe('csminute-app App', function() {
  let page: CsminuteAppPage;

  beforeEach(() => {
    page = new CsminuteAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
