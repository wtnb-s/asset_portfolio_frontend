import { memo, useEffect, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Box, Center, Spinner } from '@chakra-ui/react';

import { useAssetMaster } from '../../hooks/useAssetMaster';
import { useAssetPrice } from '../../hooks/useAssetPrice';
import { CustomLineChart } from '../molecules/CustomLineChart';

export const DetailAsset: VFC = memo(() => {
  const { code } = useParams<{ code?: string }>();
  const { getAssetPrice, assetPrice, loadingPrice } = useAssetPrice();
  const { getAssetMaster, assetMaster, loadingMaster } = useAssetMaster();

  useEffect(() => getAssetPrice(code), [getAssetPrice, code]);
  useEffect(() => getAssetMaster(code), [getAssetMaster, code]);

  return (
    <>
      <Box w="100%" p={4}>
        <Heading as="h2" size="lg" fontSize="20px">
          資産詳細ページ
        </Heading>
      </Box>

      {loadingMaster || loadingPrice ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
          <Box w="100%" fontSize="18px" p={4}>
            {assetMaster.length ? assetMaster[0]['Name'] : ''}
          </Box>
          <CustomLineChart data={assetPrice} dataKeyXaxis="Date" dataKeyYaxis="Price" width="90%" height={'400px'} />
        </>
      )}
    </>
  );
});
