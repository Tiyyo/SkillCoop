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
import { useTranslation } from 'react-i18next';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type RadarChartProps = {
  skills: Record<string, number> | null;
  min: number;
  max: number;
  displayTicks?: boolean;
};

function RadarChart({ skills, min, max, displayTicks }: RadarChartProps) {
  const { t } = useTranslation('skill');
  if (!skills) return;
  const labels = Object.keys(skills);
  const translatedLabels = labels.map((label) => {
    return t(label);
  });
  const dataSkills = Object.values(skills);
  const data = {
    labels: translatedLabels,
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
              backdropColor: 'transparent',
            },
            grid: {
              color: '#3433338a',
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
