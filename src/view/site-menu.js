import Abstract from './abstract.js';

const createSiteMenuTemplate = () => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">

  </div>
</nav>`;
};

export default class SiteMenu extends Abstract {
  getTemplate() {
    return createSiteMenuTemplate();
  }
}
