import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  IconButton,
  Avatar,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { BiLogOut, BiCalendarCheck, BiMenu } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
// import {Link as RouterLink} from 'react-router-dom';
import Link from "next/link";

export function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton
        aria-label="Menu"
        border="0px"
        color="black"
        fontSize="30px"
        icon={<BiMenu />}
        onClick={onOpen}
        ref={btnRef}
        variant="outline"
      />

      <Drawer
        finalFocusRef={btnRef}
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader alignItems="center" display="flex" />
            <DrawerBody>
              <Stack alignItems="center" mt={6} spacing={3}>
                <Button
                  leftIcon={<BsFillPeopleFill />}
                  onClick={onClose}
                  variant="outline"
                  w="90%"
                >
                  <Link href="/quizzes">Lista de quizzes</Link>
                </Button>
                <hr />
                <Button
                  leftIcon={<BsFillPeopleFill />}
                  onClick={onClose}
                  variant="outline"
                  w="90%"
                >
                  <Link href="/users">Lista de usuarios</Link>
                </Button>
                <hr />
                <Button leftIcon={<BiLogOut />} variant="outline" w="90%">
                  <Link href="/">Logout</Link>
                </Button>
              </Stack>
            </DrawerBody>

            <DrawerFooter />
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
