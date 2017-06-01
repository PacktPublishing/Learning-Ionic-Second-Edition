import { GiphyAppPage } from './app.po';

describe('giphy-app App', function() {
  let page: GiphyAppPage;

  beforeEach(() => {
    page = new GiphyAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
