import { memo, VFC, useEffect } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';

import { useAssetUnit } from '../../hooks/useAssetUnit';
import { useAssetTransition } from '../../hooks/useAssetTransition';
import { CustomLineChart } from '../molecules/CustomLineChart';
import { AssetTotalCard } from '../organisms/assetData/AssetTotalCard';
import { AssetProfitCard } from '../organisms/assetData/AssetProfitCard';
import { AssetPieChart } from '../organisms/assetData/AssetPieChart';

export const Dashboard: VFC = memo(() => {
  const { getAssetUnit, assetUnit, loadingUnit } = useAssetUnit();
  const { getAssetTransition, assetTransition, loadingTransition } = useAssetTransition();

  useEffect(() => getAssetUnit(''), [getAssetUnit]);
  useEffect(() => getAssetTransition(), [getAssetTransition]);

  return (
    <>
      <Box w="100%" fontSize="lg" fontWeight="semibold" p={4}>
        サマリー
      </Box>
      <Box w="100%" p={4}>
        {loadingUnit || assetUnit === undefined || loadingTransition || assetTransition === undefined ? (
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

            <AssetPieChart width={'600'} height={500} assetUnitDetail={assetUnit?.Detail} />
          </>
        )}
      </Box>
    </>
  );
});
