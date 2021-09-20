/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, VFC } from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { Detail } from '../../types/api/assetUnit';
import { useHistory } from 'react-router-dom';

type Props = {
  assetDataDetail: Detail[];
};

export const AssetList: VFC<Props> = memo((props) => {
  const { assetDataDetail } = props;

  const history = useHistory();
  const onClickAssetDetail = useCallback((assetCode: string) => history.push(`/asset/${assetCode}`), []);

  // 評価額の大きい順に並び替え
  assetDataDetail.sort(function (a, b) {
    if (a.PresentValue > b.PresentValue) return -1;
    if (a.PresentValue < b.PresentValue) return 1;
    return 0;
  });

  return (
    <Box w={'100%'} h={'auto'} overflow={'hidden'} bg="white" borderRadius="10px" shadow="md" p={4} marginTop={4}>
      <Table size={'sm'} variant="simple" colorScheme={'messenger'}>
        <Thead>
          <Tr>
            <Th>コード</Th>
            <Th>銘柄</Th>
            <Th>評価額</Th>
            <Th>保有数</Th>
            <Th>株価</Th>
            <Th>取得単価</Th>
          </Tr>
        </Thead>
        <Tbody>
          {assetDataDetail.map((assetData) => (
            <Tr key={assetData.AssetCode} onClick={() => onClickAssetDetail(assetData.AssetCode)} _hover={{ cursor: 'pointer', opacity: 0.8 }}>
              <Td>{assetData.AssetCode}</Td>
              <Td>{assetData.AssetName}</Td>
              <Td>
                <Box fontWeight="semibold">{`¥${assetData.PresentValue.toLocaleString()}`}</Box>
                <Box textAnchor="middle" fontSize={12} fill={'#999'}>
                  前日比：¥{assetData.PresentValueDayBeforeProfit >= 0 ? '+' : ''}
                  {`${assetData.PresentValueDayBeforeProfit.toLocaleString()}`}
                </Box>
              </Td>
              <Td>{assetData.TotalUnit}</Td>
              <Td>
                <Box fontWeight="semibold">{`¥${assetData.StockPrice.toLocaleString()}`}</Box>
                <Box textAnchor="middle" fontSize={12} fill={'#999'}>
                  ¥{assetData.StockPriceDayBeforeProfit >= 0 ? '+' : ''}
                  {`${assetData.StockPriceDayBeforeProfit.toLocaleString()}`} ({assetData.StockPriceDayBeforeProfitRate >= 0 ? '+' : ''}
                  {`${assetData.StockPriceDayBeforeProfitRate.toFixed(2)}%`})
                </Box>
              </Td>
              <Td>¥{`${assetData.AvaregeUnitPrice.toLocaleString()}`}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
});
