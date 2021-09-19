import { Box, Stack } from '@chakra-ui/react';
import { memo, VFC } from 'react';

import { AssetTransition } from '../../../types/api/assetTransition';

type Props = {
  width: string;
  height: number;
  assetTransition: AssetTransition[];
};

export const AssetProfitCard: VFC<Props> = memo((props) => {
  const { width, height, assetTransition } = props;

  let todayProfit = assetTransition[assetTransition.length - 1].Profit;
  let previousDayProfit = assetTransition[assetTransition.length - 2].Profit;
  let dayBeforeProfit = todayProfit - previousDayProfit;
  let dayBeforeProfitRate = (dayBeforeProfit / todayProfit) * 100;

  // 前日比の文字色(＋であればblue、-であればred)
  const comparedLastDayColor = dayBeforeProfit >= 0 ? 'blue' : 'red';

  return (
    <Box w={width} h={height} bg="white" borderRadius="10px" shadow="md" p={4}>
      <Stack>
        <Box fontSize="sm" fontWeight="semibold">
          含み損益
        </Box>
        <Box fontSize="3xl" fontWeight="bold">
          {`¥${todayProfit.toLocaleString()}`}
        </Box>
        <Box fontSize="sm" d="flex" alignItems="baseline">
          <Box>前日比：</Box>
          <Box fontWeight="semibold" color={comparedLastDayColor}>
            ¥{dayBeforeProfit >= 0 ? '+' : ''}
            {`${dayBeforeProfit.toLocaleString()}`}
          </Box>
          <Box fontSize="xs" color={comparedLastDayColor}>
            ({dayBeforeProfitRate >= 0 ? '+' : ''}
            {`${dayBeforeProfitRate.toFixed(2)}%`})
          </Box>
        </Box>
      </Stack>
    </Box>
  );
});
