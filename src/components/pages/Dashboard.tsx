import { memo, VFC, useEffect } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';

import { useAssetUnit } from '../../hooks/useAssetUnit';
import { useAssetTransition } from '../../hooks/useAssetTransition';
import { CustomLineChart } from '../molecules/CustomLineChart';
import { AssetList } from '../molecules/AssetList';
import { AssetTotalCard } from '../organisms/assetData/AssetTotalCard';
import { AssetProfitCard } from '../organisms/assetData/AssetProfitCard';
//import { AssetPieChart } from '../organisms/assetData/AssetPieChart';
import { AssetCategoryPieChart } from '../organisms/assetData/AssetCategoryPieChart';

export const Dashboard: VFC = memo(() => {
  const { getAssetUnit, assetUnit } = useAssetUnit();
  const { getAssetTransition, assetTransition } = useAssetTransition();

  useEffect(() => getAssetUnit(''), [getAssetUnit]);
  useEffect(() => getAssetTransition(), [getAssetTransition]);

  return (
    <>
      <Box w="100%" fontSize="lg" fontWeight="semibold" p={4}>
        サマリー
      </Box>
      <Box w="100%" p={4}>
        {!assetUnit?.Detail.length || !assetTransition.length ? (
          <Center h="100%">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Center>
        ) : (
          <>
            <Box d="flex">
              <AssetTotalCard width={'240px'} height={160} assetTransition={assetTransition} />
              <CustomLineChart data={assetTransition} dataKeyXaxis="Date" dataKeyYaxis="Value" width="80%" height={'180px'} />
            </Box>

            <Box d="flex">
              <AssetProfitCard width={'240px'} height={160} assetTransition={assetTransition} />
              <CustomLineChart data={assetTransition} dataKeyXaxis="Date" dataKeyYaxis="Profit" width="80%" height={'180px'} />
            </Box>

            <AssetCategoryPieChart width={340} assetUnitCategoryData={assetUnit.Category} />

            {/* <Box float="left">
              <AssetPieChart width={'600'} height={500} assetUnitDetail={assetUnit.Detail} />
            </Box> */}
            <AssetList assetDataDetail={assetUnit.Detail} />
          </>
        )}
      </Box>
    </>
  );
});
