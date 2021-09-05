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
  dataKey: string;
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  colorList: Color[];
};

export const CustomPieChartCategory: VFC<Props> = memo((props) => {
  const { data, dataKey, cx, cy, innerRadius, outerRadius, colorList } = props;

  const presentValue = data.reduce((sum: number, item: Category) => sum + item.PresentValue, 0);
  const acquisitionPrice = data.reduce((sum: number, item: Category) => sum + item.TotalBuyPrice, 0);
  const netProfitLoss = presentValue - acquisitionPrice;

  return (
    <PieChart width={240} height={240}>
      <Pie data={data} cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} dataKey={dataKey} label={RenderCustomizedLabel} labelLine={false}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colorList[index % colorList.length].colorCode} />
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
