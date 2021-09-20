import { memo, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Legend, ReferenceLine, YAxis, Tooltip, Brush } from 'recharts';

type Props = {
  data: any;
  dataKeyXaxis: string;
  dataKeyYaxis: string;
  width: string;
  height: string;
};

export const CustomLineChart: VFC<Props> = memo((props) => {
  const { data, dataKeyXaxis, dataKeyYaxis, width, height } = props;

  return (
    <Box width={width} height={height}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 0, right: 20, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey={dataKeyXaxis} tick={{ fontSize: '.6rem' }} />
          <YAxis domain={['auto', 'auto']} interval={0} tick={{ fontSize: '.6rem' }} />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '10px' }} />
          <ReferenceLine y={0} stroke="#000" />
          <Line type="monotone" dataKey={dataKeyYaxis} stroke="#8884d8" dot={false} />
          <Tooltip />
          <Brush height={20} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
});
