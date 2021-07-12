type Props = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
};
const RADIAN = Math.PI / 180;

export const RenderCustomizedLabel = (props: Props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, name } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fontSize={12} fill="white" textAnchor={'middle'} dominantBaseline="central">
      {name}
    </text>
  );
};
