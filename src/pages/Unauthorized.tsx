import { Box, Center, Image, Text, Link } from '@chakra-ui/react';
import logo from "../assets/logo_colored.png";

const UnauthorizedPage: React.FC = () => {
  return (
    <Box className="wrapper-small">
      <Center className="pad-40">
        <Box className="centered">
          <Image src={logo} alt="Audibook Logo" mb="1.5rem" mx="auto" />
          <Text className="main-text" fontWeight="bold" mb="1rem">
            Hi, you're not authorized to access this page!
          </Text>
        </Box>
      </Center>
    </Box>
  );
};

export default UnauthorizedPage;
