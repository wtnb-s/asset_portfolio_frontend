import { memo, VFC, useEffect } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { ResponsiveContainer } from 'recharts';

import { useAssetUnit } from '../../hooks/useAssetUnit';
import { CustomPieChart } from '../molecules/CustomPieChart';

export const Dashboard: VFC = memo(() => {
  const { getAssetUnit, assetUnit, loadingUnit } = useAssetUnit();
  useEffect(() => getAssetUnit(''), [getAssetUnit]);
  let convertAssetUnit = Object.keys(assetUnit).map(function (key: any) {
    return assetUnit[key];
  });

  return (
    <>
      <Box w="100%" p={4}>
        資産一覧ページ
      </Box>

      {loadingUnit ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <ResponsiveContainer width="90%" height={400}>
          <CustomPieChart data={convertAssetUnit} dataKey={'presentValue'} cx={240} cy={180} innerRadius={50} outerRadius={130} />
        </ResponsiveContainer>
      )}
    </>
  );
});
