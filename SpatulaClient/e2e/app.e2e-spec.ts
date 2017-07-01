import { SpatulaClientPage } from './app.po';

describe('spatula-client App', () => {
  let page: SpatulaClientPage;

  beforeEach(() => {
    page = new SpatulaClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
