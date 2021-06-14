import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Heading,
    IconButton,
    Link,
    useDisclosure
  } from "@chakra-ui/react";
  import { memo, VFC } from "react";
  import { HamburgerIcon } from "@chakra-ui/icons";
  
  export const Header: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Flex
          as="nav"
          bg="teal.500"
          color="gray.50"
          align="center"
          justify="space-between"
          padding={{ base: 3, md: 5 }}
        >
          <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
            <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
              資産管理アプリ
            </Heading>
          </Flex>
          <Flex
            align="center"
            fontSize="sm"
            flexGrow={2}
            display={{ base: "none", md: "flex" }}
          >
            <Box pr={4}>
              <Link>資産登録</Link>
            </Box>
            <Link>アカウント設定</Link>
          </Flex>
          <IconButton
            aria-label="メニューボタン"
            icon={<HamburgerIcon />}
            siza="sm"
            variant="unstyled"
            display={{ base: "block", md: "none" }}
            onClick={onOpen}
          />
        </Flex>
        <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerBody p={0} bg="gray.100">
                <Button w="100%">資産一覧</Button>
                <Button w="100%">資産登録</Button>
                <Button w="100%">アカウント設定</Button>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    );
  });
  