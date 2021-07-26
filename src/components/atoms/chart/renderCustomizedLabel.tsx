type Props = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  assetName: string;
};
const RADIAN = Math.PI / 180;

export const RenderCustomizedLabel = (props: Props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, assetName } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fontSize={12} fill="black" textAnchor={'middle'} dominantBaseline="central">
      {assetName}
    </text>
  );
};
