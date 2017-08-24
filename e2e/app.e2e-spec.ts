import { RecipeDealsPage } from './app.po';

describe('recipe-deals App', () => {
  let page: RecipeDealsPage;

  beforeEach(() => {
    page = new RecipeDealsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
