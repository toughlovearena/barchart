// interface data {
//   title: string;
//   yaxis: string;
//   barLabel: string;
//   finishedColor: string;
//   unfinishedColor: string;
//   finished: number;
//   unfinished: number;
// }

function makeChart(data) {
  const container = document.getElementById("charts");
  const nextId = 'chart-' + Array.from(container.children).length;

  const nextDiv = document.createElement('div');
  nextDiv.classList.add('container');
  const nextBar = document.createElement('div');
  nextBar.id = nextId;
  nextBar.classList.add('bar');
  nextDiv.appendChild(nextBar);
  container.appendChild(nextDiv);

  AmCharts.makeChart(nextId,
    {
      "type": "serial",
      "categoryField": "category",
      "columnSpacing": 0,
      "rotate": true,
      "startDuration": 0.7,
      "startEffect": "bounce",
      "backgroundAlpha": 1,
      "backgroundColor": "#EEEEEE",
      "fontFamily": "Comic Sans MS",
      "fontSize": 20,
      "handDrawn": true,
      "handDrawScatter": 7,
      "handDrawThickness": 15,
      "theme": "default",
      "categoryAxis": {
        "gridPosition": "start"
      },
      "trendLines": [],
      "graphs": [
        {
          "animationPlayed": true,
          "balloonColor": "undefined",
          "balloonText": "[[title]] of [[category]]:[[value]]",
          "customMarker": "",
          "fillAlphas": 1,
          "fillColors": data.finishedColor,
          "fontSize": -3,
          "gapPeriod": 0,
          "id": "AmGraph-1",
          "labelAnchor": "middle",
          "labelPosition": "middle",
          "labelRotation": 90,
          "labelText": data.barLabel,
          "lineAlpha": 0,
          "minDistance": 0,
          "showBalloon": false,
          "showBalloonAt": "open",
          "showBulletsAt": "open",
          "title": "finished",
          "type": "column",
          "valueField": "finished"
        },
        {
          "balloonText": "[[title]] of [[category]]:[[value]]",
          "fillAlphas": 1,
          "fillColors": data.unfinishedColor,
          "id": "AmGraph-2",
          "lineAlpha": 0,
          "showBalloon": false,
          "title": "unfinished",
          "type": "column",
          "valueField": "unfinished"
        }
      ],
      "guides": [],
      "valueAxes": [
        {
          "id": "ValueAxis-1",
          "stackType": "100%",
          "title": ""
        }
      ],
      "allLabels": [],
      "balloon": {
        "borderAlpha": 0
      },
      "legend": {
        "enabled": true,
        "align": "center",
        "bottom": 0,
        "horizontalGap": 20,
        "useGraphSettings": true
      },
      "titles": [
        {
          "bold": false,
          "id": "Title-1",
          "size": 25,
          "text": data.title,
        }
      ],
      "dataProvider": [
        {
          category: data.yaxis,
          unfinished: data.unfinished,
          finished: data.finished,
        },
      ]
    }
  );
}

window.addEventListener('load', async () => {
  const cachebust = new Date().getTime();
  const yamlResp = await fetch(`data.yaml?cachebust=${cachebust}`);
  const yamlText = await yamlResp.text();
  const data = jsyaml.load(yamlText);
  console.log(data);
  data.charts.forEach(data => {
    makeChart(data);
  });
});
