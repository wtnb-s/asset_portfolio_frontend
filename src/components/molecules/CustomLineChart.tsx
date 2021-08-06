import { memo, VFC } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Legend, ReferenceLine, Brush, YAxis } from 'recharts';

type Props = {
  data: any;
  dataKeyXaxis: string;
  dataKeyYaxis: string;
  width: string;
  height: number;
};

export const CustomLineChart: VFC<Props> = memo((props) => {
  const { data, dataKeyXaxis, dataKeyYaxis, width, height } = props;

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyXaxis} tick={{ fontSize: '.7rem' }} />
        <YAxis domain={['auto', 'auto']} interval="preserveStartEnd" />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
        <ReferenceLine y={0} stroke="#000" />
        <Brush className="TimeLineChart-brush" dataKey="timestamp" stroke="#8884d8" startIndex={10} />
        <Line type="monotone" dataKey={dataKeyYaxis} stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
});
