import {
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  useDisclosure,
  FlexProps,
  Menu,
  MenuButton,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";

import logo from "../assets/logo_white.png";
import {
  FiHome,
  FiCompass,
  FiStar,
} from "react-icons/fi";

import { ReactNode } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import {getRole, getUsername, logout} from "../utils/auth";

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome },
  { name: "Song Management", icon: FiCompass },
  { name: "Subscription Requests", icon: FiStar },
];

export default function Navbar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={useColorModeValue("#212121", "gray.900")}>
      <MobileNav onOpen={onOpen} />
      <Box p="0">{children}</Box>
    </Box>
  );
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const userName = getUsername();
  const role = getRole().toString();
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  }
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      w={"full"}
      alignItems="center"
      bg={useColorModeValue("teal", "teal.800")}
      textColor={useColorModeValue("white", "gray.200")}
      justifyContent={{ base: "space-between" }}
      {...rest}
    >
      <Image src={logo} alt="logo" height="full" background={"transparent"}/>

      <HStack spacing={{ base: "0", md: "6" }} background={"transparent"}>
        <Flex alignItems={"center"} background={"transparent"}>
          <Menu>
            <Flex py={2} transition="all 0.3s" background={"transparent"}>
              <HStack background={"transparent"}>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="2px"
                  ml="2"
                  background={"transparent"}
                >
                  <Text color="white" fontSize="sm" background={"transparent"}>Hello, {userName}</Text>
                  <Text color="white" fontSize="xs" background={"#353940"} px={2} borderRadius="8px">
                    {role}
                  </Text>
                </VStack>
              </HStack>
            </Flex>
          </Menu>
        </Flex>
        <Button
          color={"white"}
          variant="outline"
          _hover={{
            color: "#D71414",
            bg: "white",
          }}
          bg={"#D71414"}
          borderColor={"transparent"}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </HStack>
    </Flex>
  );
};