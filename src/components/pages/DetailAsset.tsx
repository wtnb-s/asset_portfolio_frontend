import { memo, useEffect, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { LineChart, Line, XAxis, CartesianGrid, Legend, ReferenceLine, Brush, YAxis } from 'recharts';

import { useAssetPrice } from '../../hooks/useAssetPrice';

export const DetailAsset: VFC = memo(() => {
  const { code } = useParams<{ code?: string }>();
  const { getAssetPrice, loading, assetPrice } = useAssetPrice();
  useEffect(() => getAssetPrice(code), [getAssetPrice, code]);

  return (
    <>
      <Box w="100%" p={4}>
        資産詳細ページ
      </Box>
      <Box w="100%" p={4}>
        AssetCode:{code}
      </Box>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
          <LineChart width={700} height={500} data={assetPrice}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" tick={{ fontSize: '.7rem' }} />
            <YAxis domain={['auto', 'auto']} interval="preserveStartEnd" />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            <ReferenceLine y={0} stroke="#000" />
            <Brush className="TimeLineChart-brush" dataKey="timestamp" stroke="#8884d8" startIndex={10} />
            <Line type="monotone" dataKey="Price" stroke="#8884d8" dot={false} />
          </LineChart>
        </>
      )}
    </>
  );
});
