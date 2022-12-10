import {
  displayTooltipTitle,
  displayTooltipLabel,
  displayTooltipLabelWithUnit,
  displayTicksWithUnit,
  showChartTooltip,
} from '../utils/charty.js';

import {
  Chart,
  ArcElement,
  BarElement,
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

Chart.register(
  ArcElement,
  BarElement,
  BarController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  Legend,
  Title,
  Tooltip
);

export default class Charty {
  constructor(elem, APP) {
    this.elem = elem;
    this.canvas_arr = this.elem.querySelectorAll('.js-canvas');
    this.chart_arr = [];
    this.tableActionEnalbed = false;
    this.tableRows;
    this.balloonEnabled = false;
    this.balloonElem;
    this.balloonTextElem;
    this.balloonData;
  }

  getJson(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  getConfig(data) {
    // const thisElem = this.elem;
    const config = {
      type: data.type,
      data: data.data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: displayTooltipTitle,
            },
            enabled: false,
            external: showChartTooltip,
          },
        },
      },
    };

    if (data.options.scales) {
      config.options.scales = data.options.scales;
    }

    if (data.options.aspectRatio) {
      config.options.aspectRatio = data.options.aspectRatio;
    }

    if (data.options.cutout) {
      config.options.cutout = data.options.cutout;
    }

    if (data.options.layout) {
      config.options.layout = data.options.layout;
    }

    if (data.options.plugins) {
      if (data.options.plugins.title) {
        config.options.plugins.title = data.options.plugins.title;
      }
    }

    if (data.unit) {
      config.options.plugins.tooltip.callbacks.label =
        displayTooltipLabelWithUnit;
    } else {
      config.options.plugins.tooltip.callbacks.label = displayTooltipLabel;
    }

    if (data.unit && data.type == 'bar') {
      config.options.scales.y.ticks.callback = displayTicksWithUnit;
    }

    if (data.balloons || data.hasMatchedTable) {
      config.options.onHover = this.mouseHandler;
    }

    // console.log(config);
    return config;
  }

  createDonutTitle(dtitle, index) {
    const title = dtitle.text || '';
    const parent = this.canvas_arr[index].parentElement;
    const titleElem = document.createElement('div');
    titleElem.classList.add('charts-donut-title-container');
    titleElem.innerHTML = `<div class="charts-donut-title">${title}</div>`;
    parent.insertBefore(titleElem, this.canvas_arr[index]);
  }

  enableBalloon(balloon_data) {
    this.balloonData = balloon_data;
    this.balloonElem = this.elem.querySelector('.js-charts-balloon');
    this.balloonTextElem = this.elem.querySelector('.charts-balloon-text');

    const closeBtn = this.elem.querySelector('.charts-balloon-close');

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        this.balloonElem.classList.remove('active');
        this.balloonTextElem.innerHTML = '';
      });
    }

    this.balloonEnabled = true;
  }

  enableTableAction() {
    this.tableRows = this.elem.querySelectorAll('.charts-table tbody tr');

    if (this.canvas_arr[0]) {
      this.canvas_arr[0].addEventListener('mouseleave', () => {
        this.updateTableRow(-1);
      });
    }

    this.tableActionEnalbed = true;
  }

  updateBalloon(index) {
    this.balloonElem.classList.add('active');

    if (index !== -1) {
      this.balloonTextElem.innerHTML = this.balloonData[index].text;
    }
  }

  updateTableRow(index) {
    this.tableRows.forEach((r, i) => {
      r.classList[index == i ? 'add' : 'remove']('active');
    });
  }

  mouseHandler = (evt) => {
    let chartIndex = -1;

    const points = this.chart_arr[0].getElementsAtEventForMode(
      evt,
      'nearest',
      { intersect: true },
      true
    );

    if (points.length) {
      chartIndex = points[0].index;
    }

    if (this.balloonEnabled) this.updateBalloon(chartIndex);
    if (this.tableActionEnalbed) this.updateTableRow(chartIndex);
  };

  createChart() {
    const json_url = `/assets/json/charty/${this.elem.dataset.json}.json`;

    this.getJson(json_url)
      .then((data) => {
        data.charts.forEach((chart, i) => {
          const config = this.getConfig(chart);
          const chart_obj = new Chart(this.canvas_arr[i], config);
          this.chart_arr.push(chart_obj);

          if (chart.type == 'doughnut') {
            if (chart.options.plugins) {
              if (chart.options.plugins.title) {
                this.createDonutTitle(chart.options.plugins.title, i);
              }
            }
          }

          if (chart.balloons) {
            this.enableBalloon(chart.balloons);
          }

          if (chart.hasMatchedTable) {
            this.enableTableAction();
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  init() {
    this.createChart();
    console.log('charty');
  }
}
