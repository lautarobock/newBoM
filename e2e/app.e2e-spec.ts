import { NewBoMPage } from './app.po';

describe('new-bo-m App', () => {
  let page: NewBoMPage;

  beforeEach(() => {
    page = new NewBoMPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
