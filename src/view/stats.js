import Abstract from './abstract';

const createStatsTemplate = () => {
  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">Movie buff</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
  </form>

  <ul class="statistic__text-list">

  </ul>

  <div class="statistic__chart-wrap">

  </div>
  </section>`;
};

export default class Stats extends Abstract {
  getTemplate() {
    return createStatsTemplate();
  }
}
