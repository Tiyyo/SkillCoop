import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type RadarChartProps = {
  skills: Record<string, number>;
  min: number;
  max: number;
  displayTicks?: boolean;
};

function RadarChart({ skills, min, max, displayTicks }: RadarChartProps) {
  const labels = Object.keys(skills);
  const dataSkills = Object.values(skills);
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataSkills,
        backgroundColor: 'hsla(120, 98.7%, 31.5%, 0.126)',
        borderColor: 'hsla(120, 98.7%, 31.5%, 0.350)',
        borderWidth: 2,
        clip: 10,
        label: 'Distribution of skills',
      },
    ],
  };

  return (
    <Radar
      data={data}
      options={{
        scales: {
          r: {
            min,
            max,
            ticks: {
              display: displayTicks ?? true,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}

export default RadarChart;
