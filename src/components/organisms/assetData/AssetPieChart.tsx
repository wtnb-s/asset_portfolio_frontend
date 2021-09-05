import { Box } from '@chakra-ui/react';
import { memo, VFC } from 'react';
import { ResponsiveContainer } from 'recharts';

import { CustomPieChart } from '../../molecules/CustomPieChart';
import { Detail } from '../../../types/api/assetUnit';

type Props = {
  width: string;
  height: number;
  assetUnitDetail: Detail[] | undefined;
};

export const AssetPieChart: VFC<Props> = memo((props) => {
  const { width, height, assetUnitDetail } = props;

  return (
    <>
      {assetUnitDetail !== undefined ? (
        <Box w={width} h={height} bg="white" borderRadius="10px" shadow="md" p={4} alignItems="center">
          <ResponsiveContainer width={400} height={300}>
            <CustomPieChart data={assetUnitDetail} dataKey={'PresentValue'} cx={240} cy={180} innerRadius={40} outerRadius={110} />
          </ResponsiveContainer>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
});
