import { HeisenbergPage } from './app.po';

describe('heisenberg App', function() {
  let page: HeisenbergPage;

  beforeEach(() => {
    page = new HeisenbergPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
