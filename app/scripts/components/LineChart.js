import {
  Chart,
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
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
);

export default class LineChart {
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
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: this.years,
        datasets: this.datasets,
      },
    });

    // {
    //   label: "Ai / ML",
    //   data: [
    //     -0.011858, 0.268, 0.690852, 0.833955, 0.366226, 0.521221,
    //     -0.106216, 0.363089, -0.094415,
    //   ],
    //   borderWidth: 1,
    //   borderColor: "rgb(75, 0, 192)",
    // }
  }

  init() {
    const json_url = `/assets/json/chart_line.json`;

    this.getJson(json_url)
      .then((data) => {

        data.forEach((d) => {
          const year_found = this.years.find((element) => element === d.YEAR);
          const sector_found = this.sectors.find(
            (element) => element === d.SECTOR
          );

          if (year_found === undefined) {
            this.years.push(d.YEAR);
          }

          if (sector_found === undefined) {
            this.sectors.push(d.SECTOR);
          }
        });

        this.sectors.forEach((sector) => {
          const obj = {};
          obj.label = sector;
          obj.data = [];
          obj.borderWidth = 1;
          obj.borderColor = "rgb(75, 192, 192)";

          data.forEach((element) => {
            if (element.SECTOR === sector) {
              obj.data.push(element.YOY_GROWTH);
            }
          });

          this.datasets.push(obj);
        });

        this.setChart();
      })
      .catch((error) => {
        console.log(error);
      });

  }
}
