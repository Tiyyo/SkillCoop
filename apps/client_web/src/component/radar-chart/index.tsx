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
};

function RadarChart({ skills }: RadarChartProps) {
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
            min: 0,
            max: 100,
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
