import { memo, VFC } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

import { RenderCustomizedLabel } from '../atoms/chart/renderCustomizedLabel';
import { Category } from '../../types/api/assetUnit';

type Color = {
  colorCode: string;
  name: string;
};

type Props = {
  data: Category[];
  presentValue: number;
  netProfitLoss: number;
  dataKey: string;
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  colorList: Color[];
};

export const CustomPieChartCategory: VFC<Props> = memo((props) => {
  const { data, presentValue, netProfitLoss, dataKey, cx, cy, innerRadius, outerRadius, colorList } = props;

  return (
    <PieChart width={230} height={200}>
      <Pie data={data} cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} dataKey={dataKey} label={RenderCustomizedLabel} labelLine={false}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colorList[Number(entry.AssetCode) - 1].colorCode} />
        ))}
      </Pie>
      <text x={cx} y={cy} dx={5} dy={8} textAnchor="middle" fill={'#333'}>
        {`¥${presentValue.toLocaleString()}`}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize={11} fill={'#999'}>
        ({netProfitLoss >= 0 ? '+' : ''}
        {`¥${netProfitLoss.toLocaleString()}`})
      </text>
    </PieChart>
  );
});
