import { ResponsiveHeatMap } from '@nivo/heatmap';
import React from 'react';
const data = [
  {
    id: 'Utility #1',
    data: [
      {
        x: 'HP',
        y: 70,
      },
      {
        x: 'MP',
        y: 73,
      },
      {
        x: 'Attack',
        y: -66,
      },
      {
        x: 'Defence',
        y: -62,
      },
      {
        x: 'Level',
        y: 49,
      },
      {
        x: 'Hit Rate',
        y: -60,
      },
      {
        x: 'Games',
        y: -17,
      },
      {
        x: 'Win Rate',
        y: 77,
      },
      {
        x: 'Others',
        y: -38,
      },
    ],
  },
  {
    id: 'Utility #2',
    data: [
      {
        x: 'HP',
        y: -21,
      },
      {
        x: 'MP',
        y: 59,
      },
      {
        x: 'Attack',
        y: -47,
      },
      {
        x: 'Defence',
        y: 89,
      },
      {
        x: 'Level',
        y: -66,
      },
      {
        x: 'Hit Rate',
        y: 83,
      },
      {
        x: 'Games',
        y: 41,
      },
      {
        x: 'Win Rate',
        y: 54,
      },
      {
        x: 'Others',
        y: 16,
      },
    ],
  },
  {
    id: 'Utility #3',
    data: [
      {
        x: 'HP',
        y: 16,
      },
      {
        x: 'MP',
        y: 90,
      },
      {
        x: 'Attack',
        y: 73,
      },
      {
        x: 'Defence',
        y: -6,
      },
      {
        x: 'Level',
        y: -86,
      },
      {
        x: 'Hit Rate',
        y: 66,
      },
      {
        x: 'Games',
        y: 19,
      },
      {
        x: 'Win Rate',
        y: -20,
      },
      {
        x: 'Others',
        y: -82,
      },
    ],
  },
  {
    id: 'Utility #4',
    data: [
      {
        x: 'HP',
        y: -21,
      },
      {
        x: 'MP',
        y: 20,
      },
      {
        x: 'Attack',
        y: 26,
      },
      {
        x: 'Defence',
        y: -96,
      },
      {
        x: 'Level',
        y: 48,
      },
      {
        x: 'Hit Rate',
        y: 92,
      },
      {
        x: 'Games',
        y: -39,
      },
      {
        x: 'Win Rate',
        y: 31,
      },
      {
        x: 'Others',
        y: -15,
      },
    ],
  },
  {
    id: 'Utility #5',
    data: [
      {
        x: 'HP',
        y: 13,
      },
      {
        x: 'MP',
        y: -63,
      },
      {
        x: 'Attack',
        y: -82,
      },
      {
        x: 'Defence',
        y: 69,
      },
      {
        x: 'Level',
        y: 87,
      },
      {
        x: 'Hit Rate',
        y: -70,
      },
      {
        x: 'Games',
        y: 26,
      },
      {
        x: 'Win Rate',
        y: 92,
      },
      {
        x: 'Others',
        y: -66,
      },
    ],
  },
  {
    id: 'Utility #6',
    data: [
      {
        x: 'HP',
        y: 4,
      },
      {
        x: 'MP',
        y: -11,
      },
      {
        x: 'Attack',
        y: -42,
      },
      {
        x: 'Defence',
        y: 19,
      },
      {
        x: 'Level',
        y: -82,
      },
      {
        x: 'Hit Rate',
        y: 97,
      },
      {
        x: 'Games',
        y: -18,
      },
      {
        x: 'Win Rate',
        y: 70,
      },
      {
        x: 'Others',
        y: 23,
      },
    ],
  },
  {
    id: 'Utility #7',
    data: [
      {
        x: 'HP',
        y: -17,
      },
      {
        x: 'MP',
        y: 13,
      },
      {
        x: 'Attack',
        y: -58,
      },
      {
        x: 'Defence',
        y: -90,
      },
      {
        x: 'Level',
        y: -45,
      },
      {
        x: 'Hit Rate',
        y: 49,
      },
      {
        x: 'Games',
        y: 35,
      },
      {
        x: 'Win Rate',
        y: 38,
      },
      {
        x: 'Others',
        y: -24,
      },
    ],
  },
  {
    id: 'Utility #8',
    data: [
      {
        x: 'HP',
        y: -75,
      },
      {
        x: 'MP',
        y: -4,
      },
      {
        x: 'Attack',
        y: -93,
      },
      {
        x: 'Defence',
        y: 15,
      },
      {
        x: 'Level',
        y: -53,
      },
      {
        x: 'Hit Rate',
        y: -81,
      },
      {
        x: 'Games',
        y: 45,
      },
      {
        x: 'Win Rate',
        y: -76,
      },
      {
        x: 'Others',
        y: -79,
      },
    ],
  },
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const GameAssetTokenUpdateHeatMap = () => (
  <ResponsiveHeatMap
    data={ data }
    theme={
      {
        tooltip: {
          basic: {
            color: '#000',
          },
        },
        axis: {
          domain: {
          },
          ticks: {
            line: {
              stroke: '#777777',
              strokeWidth: 1,
            },
            text: {
              fill: '#777777',
            },
          },
          legend: {
            text: {
              display: 'none',
            },
          },
        },
        text: {
          fontSize: 15,
          fontWeight: 600,
        },
      }
    }
    enableLabels={ false }
    margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
    valueFormat=">-.2s"
    xInnerPadding={ 0.04 }
    yInnerPadding={ 0.04 }
    borderRadius={ 4 }
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '',
      legendOffset: 46,
      truncateTickAt: 0,
    }}
    axisRight={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'country',
      legendPosition: 'middle',
      legendOffset: 70,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'country',
      legendPosition: 'middle',
      legendOffset: -72,
      truncateTickAt: 0,
    }}
    colors={{
      type: 'diverging',
      scheme: 'red_blue',
      minValue: -100,
      maxValue: 100,
      divergeAt: 0.5,
    }}
    emptyColor="#555555"
    labelTextColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          2,
        ],
      ],
    }}
    legends={ [] }
    // hoverTarget="cell"
  />
);

export default GameAssetTokenUpdateHeatMap;
