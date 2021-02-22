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
        ref={btnRef}
        variant="outline"
        aria-label="Menu"
        fontSize="30px"
        icon={<BiMenu />}
        color="black"
        border="0px"
        onClick={onOpen}
      />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader display="flex" alignItems="center"></DrawerHeader>
            <DrawerBody>
              <Stack mt={6} spacing={3} alignItems="center">
                <Button
                  w="90%"
                  variant="outline"
                  onClick={onClose}
                  leftIcon={<BsFillPeopleFill />}
                >
                  <Link href="/quizlist">Lista de quizzes</Link>
                </Button>
                <hr />
                <Button variant="outline" w="90%" leftIcon={<BiLogOut />}>
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
