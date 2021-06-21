/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Heading, Link, useDisclosure } from '@chakra-ui/react';
import { memo, useCallback, VFC } from 'react';
import { useHistory } from 'react-router-dom';

import { MenuIconButton } from '../../atoms/button/MenuIconButton';
import { MenuDrawer } from '../../molecules/MenuDrawer';

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const onClickDashboard = useCallback(() => history.push('/dashboard'), []);
  const onClickRegistAsset = useCallback(() => history.push('/regist_asset'), []);
  const onClickAccount = useCallback(() => history.push('/account'), []);

  return (
    <>
      <Flex as="nav" bg="teal.500" color="gray.50" align="center" justify="space-between" padding={{ base: 3, md: 5 }}>
        <Flex align="center" as="a" mr={8} _hover={{ cursor: 'pointer' }} onClick={onClickDashboard}>
          <Heading as="h1" fontSize={{ base: 'md', md: 'lg' }}>
            資産管理アプリ
          </Heading>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: 'none', md: 'flex' }}>
          <Box pr={4}>
            <Link onClick={onClickRegistAsset}>資産登録</Link>
          </Box>
          <Link onClick={onClickAccount}>アカウント設定</Link>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickDashboard={onClickDashboard}
        onClickRegistAsset={onClickRegistAsset}
        onClickAccount={onClickAccount}
      />
    </>
  );
});
