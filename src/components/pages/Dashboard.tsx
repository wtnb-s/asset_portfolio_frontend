import { memo, VFC, useEffect } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { ResponsiveContainer } from 'recharts';

import { useAssetUnit } from '../../hooks/useAssetUnit';
import { useAssetTransition } from '../../hooks/useAssetTransition';
import { CustomPieChart } from '../molecules/CustomPieChart';
import { CustomLineChart } from '../molecules/CustomLineChart';

export const Dashboard: VFC = memo(() => {
  const { getAssetUnit, assetUnit, loadingUnit } = useAssetUnit();
  const { getAssetTransition, assetTransition } = useAssetTransition();

  useEffect(() => getAssetUnit(''), [getAssetUnit]);
  useEffect(() => getAssetTransition(), [getAssetTransition]);

  let convertAssetUnit = Object.keys(assetUnit).map((key: any) => {
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
        <>
          <ResponsiveContainer width="90%" height={300}>
            <CustomPieChart data={convertAssetUnit} dataKey={'presentValue'} cx={240} cy={180} innerRadius={40} outerRadius={110} />
          </ResponsiveContainer>

          <CustomLineChart data={assetTransition} dataKeyXaxis="Date" dataKeyYaxis="Value" width="80%" height={300} />
        </>
      )}
    </>
  );
});
