import { memo, useEffect, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Box, Center, Spinner } from '@chakra-ui/react';
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Legend, ReferenceLine, Brush, YAxis } from 'recharts';

import { useAssetMaster } from '../../hooks/useAssetMaster';
import { useAssetPrice } from '../../hooks/useAssetPrice';

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
          <ResponsiveContainer width="90%" height={400}>
            <LineChart data={assetPrice}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" tick={{ fontSize: '.7rem' }} />
              <YAxis domain={['auto', 'auto']} interval="preserveStartEnd" />
              <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
              <ReferenceLine y={0} stroke="#000" />
              <Brush className="TimeLineChart-brush" dataKey="timestamp" stroke="#8884d8" startIndex={10} />
              <Line type="monotone" dataKey="Price" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </>
  );
});
