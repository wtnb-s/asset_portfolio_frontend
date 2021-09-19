import { Box, Stack } from '@chakra-ui/react';
import { memo, VFC } from 'react';

import { AssetTransition } from '../../../types/api/assetTransition';

type Props = {
  width: string;
  height: number;
  assetTransition: AssetTransition[];
};

export const AssetTotalCard: VFC<Props> = memo((props) => {
  const { width, height, assetTransition } = props;

  let todayValue = assetTransition[assetTransition.length - 1].Value;
  let previousDayValue = assetTransition[assetTransition.length - 2].Value;
  let dayBeforeValue = todayValue - previousDayValue;
  let dayBeforeValueRate = (dayBeforeValue / todayValue) * 100;

  // 前日比の文字色(＋であればblue、-であればred)
  const comparedLastDayColor = dayBeforeValue >= 0 ? 'blue' : 'red';

  return (
    <Box w={width} h={height} bg="white" borderRadius="10px" shadow="md" p={4}>
      <Stack>
        <Box fontSize="sm" fontWeight="semibold">
          資産総額
        </Box>
        <Box fontSize="3xl" fontWeight="bold">
          {`¥${todayValue.toLocaleString()}`}
        </Box>
        <Box fontSize="sm" d="flex" alignItems="baseline">
          <Box>前日比：</Box>
          <Box fontWeight="semibold" color={comparedLastDayColor}>
            ¥{dayBeforeValue >= 0 ? '+' : ''}
            {`${dayBeforeValue.toLocaleString()}`}
          </Box>
          <Box fontSize="xs" color={comparedLastDayColor}>
            ({dayBeforeValueRate >= 0 ? '+' : ''}
            {`${dayBeforeValueRate.toFixed(2)}%`})
          </Box>
        </Box>
      </Stack>
    </Box>
  );
});
