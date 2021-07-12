import { memo, VFC } from 'react';
import { Box } from '@chakra-ui/react';
import { ResponsiveContainer } from 'recharts';

import { CustomPieChart } from '../molecules/CustomPieChart';

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

export const Dashboard: VFC = memo(() => {
  return (
    <>
      <Box w="100%" p={4}>
        資産一覧ページ
      </Box>
      <ResponsiveContainer width="90%" height={400}>
        <CustomPieChart data={data} cx={270} cy={180} innerRadius={55} outerRadius={140} />
      </ResponsiveContainer>
    </>
  );
});
