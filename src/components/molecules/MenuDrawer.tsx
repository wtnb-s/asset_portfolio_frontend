import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay
  } from "@chakra-ui/react";
  import { memo, VFC } from "react";
  
  type Props = {
    onClose: () => void;
    isOpen: boolean;
    onClickDashboard: () => void;
    onClickRegistAsset: () => void;
    onClickAccount: () => void;
  };
  
  export const MenuDrawer: VFC<Props> = memo((props) => {
    const {
      onClose,
      isOpen,
      onClickDashboard,
      onClickRegistAsset,
      onClickAccount
    } = props;
    return (
      <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0} bg="gray.100">
              <Button w="100%" onClick={onClickDashboard}>
                資産一覧
              </Button>
              <Button w="100%" onClick={onClickRegistAsset}>
                資産登録
              </Button>
              <Button w="100%" onClick={onClickAccount}>
                アカウント設定
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  });
  