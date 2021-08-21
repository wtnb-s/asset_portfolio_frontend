import { memo, VFC, useEffect } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { ResponsiveContainer } from 'recharts';

import { useAssetUnit } from '../../hooks/useAssetUnit';
import { useAssetTransition } from '../../hooks/useAssetTransition';
import { CustomPieChart } from '../molecules/CustomPieChart';
import { CustomLineChart } from '../molecules/CustomLineChart';
import { AssetTotalCard } from '../organisms/assetData/AssetTotalCard';
import { AssetProfitCard } from '../organisms/assetData/AssetProfitCard';

export const Dashboard: VFC = memo(() => {
  const { getAssetUnit, assetUnit, loadingUnit } = useAssetUnit();
  const { getAssetTransition, assetTransition, loadingTransition } = useAssetTransition();

  useEffect(() => getAssetUnit(''), [getAssetUnit]);
  useEffect(() => getAssetTransition(), [getAssetTransition]);

  let convertAssetUnit = Object.keys(assetUnit).map((key: any) => {
    return assetUnit[key];
  });

  return (
    <>
      <Box w="100%" fontSize="lg" fontWeight="semibold" p={4}>
        サマリー
      </Box>
      <Box w="100%" p={4}>
        {loadingUnit || loadingTransition ? (
          <Center h="100%">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Center>
        ) : (
          <>
            <Box d="flex">
              <AssetTotalCard width={'240px'} height={160} assetTransition={assetTransition} />
              <CustomLineChart data={assetTransition} dataKeyXaxis="Date" dataKeyYaxis="Value" width="90%" height={180} />
            </Box>

            <Box d="flex">
              <AssetProfitCard width={'240px'} height={160} assetTransition={assetTransition} />
              <CustomLineChart data={assetTransition} dataKeyXaxis="Date" dataKeyYaxis="Profit" width="90%" height={180} />
            </Box>
            <ResponsiveContainer width="90%" height={300}>
              <CustomPieChart data={convertAssetUnit} dataKey={'presentValue'} cx={240} cy={180} innerRadius={40} outerRadius={110} />
            </ResponsiveContainer>
          </>
        )}
      </Box>
    </>
  );
});
