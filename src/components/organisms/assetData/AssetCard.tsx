import { Box, Stack } from '@chakra-ui/react';
import { memo, VFC } from 'react';

type Props = {
  width: string;
  height: number;
  title: string;
  value: number;
  comparedLastDay: number;
  comparedLastDayRate: number;
};

export const AssetCard: VFC<Props> = memo((props) => {
  const { width, height, title, value, comparedLastDay, comparedLastDayRate } = props;
  // 前日比の文字色(＋であればblue、-であればred)
  const comparedLastDayColor = comparedLastDay >= 0 ? 'blue' : 'red';

  return (
    <Box w={width} h={height} bg="white" borderRadius="10px" shadow="md" p={4} _hover={{ cursor: 'pointer', opacity: 0.8 }}>
      <Stack>
        <Box fontSize="sm" fontWeight="semibold">
          {title}
        </Box>
        <Box fontSize="3xl" fontWeight="bold">
          {`¥${value.toLocaleString()}`}
        </Box>
        <Box fontSize="sm" d="flex" alignItems="baseline">
          <Box>前日比：</Box>
          <Box fontWeight="semibold" color={comparedLastDayColor}>
            {`¥${comparedLastDay.toLocaleString()}`}
          </Box>
          <Box fontSize="xs" color={comparedLastDayColor}>
            {`(${comparedLastDayRate.toFixed(1)}%)`}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
});
