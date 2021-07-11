import { memo, VFC, useCallback, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from 'recharts';

const data = [
  { name: 'Group A', value: 6700 },
  { name: 'Group B', value: 4020 },
  { name: 'Group C', value: 3200 },
  { name: 'Group D', value: 1780 },
  { name: 'Group E', value: 910 },
  { name: 'Group F', value: 6700 },
  { name: 'Group G', value: 4020 },
  { name: 'Group H', value: 3200 },
];

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#4dc4ff', '#ff8082', '#c9ace6', '#804000'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = (obj: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
}) => {
  const radius = obj.innerRadius + (obj.outerRadius - obj.innerRadius) * 0.54;
  const x = obj.cx + radius * Math.cos(-obj.midAngle * RADIAN);
  const y = obj.cy + radius * Math.sin(-obj.midAngle * RADIAN);

  return (
    <text x={x} y={y} fontSize={12} fill="white" textAnchor={'middle'} dominantBaseline="central">
      {obj.name}
    </text>
  );
};

const renderActiveShape = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 10;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'#333'}>
        {'¥1,201,980'}
      </text>
      <text x={cx} y={cy + 20} textAnchor="middle" fontSize={11} fill={'#999'}>
        {'(+100)'}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`¥${value.toLocaleString()}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} fontSize={12} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

export const Dashboard: VFC = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <>
      <Box w="100%" p={4}>
        資産一覧ページ
      </Box>
      <ResponsiveContainer width="90%" height={400}>
        <PieChart width={600} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={270}
            cy={180}
            innerRadius={55}
            outerRadius={140}
            dataKey="value"
            onMouseEnter={onPieEnter}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
});
