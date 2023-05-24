import {
  Chart,
  BubbleController,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  BubbleController,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
);

export default class ChartBubble {
  constructor(elem, APP) {
    this.elem = elem;
    this.years = [];
    this.sectors = [];
    this.datasets = [];
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

  setChart() {
    const ctx = document.querySelector(".js-chart-bubble");

    new Chart(ctx, {
      type: "bubble",
      data: {
        datasets: [
          {
            label: 'Dataset 1',
            data: [{
              x: 50,
              y: 50,
              r: 5
            }, {
              x: 50,
              y: 50,
              r: 100
            }],
            borderColor: '#ff0000',
            backgroundColor: '#ffff00',
          },
          // {
          //   label: 'Dataset 2',
          //   data: Utils.bubbles(NUMBER_CFG),
          //   borderColor: Utils.CHART_COLORS.orange,
          //   backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
          // }
        ]
      },
    });
  }

  init() {
    const json_url = `/assets/json/chart_bubble.json`;

    this.getJson(json_url)
      .then((data) => {
        this.setChart();
      })
      .catch((error) => {
        console.log(error);
      });

  }
}
