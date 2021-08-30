import { memo, VFC, useCallback, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

import { RenderCustomizedLabel } from '../atoms/chart/renderCustomizedLabel';
import { RenderActiveShape } from '../atoms/chart/renderActiveShape';
import { Detail } from '../../types/api/assetUnit';

type Props = {
  data: Detail[];
  dataKey: string;
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
};

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#4dc4ff', '#ff8082', '#c9ace6', '#804000'];

export const CustomPieChart: VFC<Props> = memo((props) => {
  const { data, dataKey, cx, cy, innerRadius, outerRadius } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const presentValue = data.reduce((sum: number, item: Detail) => sum + item.PresentValue, 0);
  const acquisitionPrice = data.reduce((sum: number, item: Detail) => sum + item.TotalBuyPrice, 0);
  const netProfitLoss = presentValue - acquisitionPrice;

  return (
    <PieChart width={500} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={RenderActiveShape}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        dataKey={dataKey}
        onMouseEnter={onPieEnter}
        label={RenderCustomizedLabel}
        labelLine={false}
      >
        {data.map((entry: object, index: number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <text x={cx} y={cy} dx={4} dy={8} textAnchor="middle" fill={'#333'}>
        {`¥${presentValue.toLocaleString()}`}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize={11} fill={'#999'}>
        ({netProfitLoss >= 0 ? '+' : ''}
        {`¥${netProfitLoss.toLocaleString()}`})
      </text>
    </PieChart>
  );
});
