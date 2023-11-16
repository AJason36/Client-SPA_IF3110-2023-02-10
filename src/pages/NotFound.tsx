import { Box, Center, Image, Text, Link } from '@chakra-ui/react';
import logo from "../assets/logo_colored.png";

const NotFoundPage: React.FC = () => {
  return (
    <Box className="wrapper-small">
      <Center className="pad-40">
        <Box className="centered">
          <Image src={logo} alt="Audibook Logo" mb="1.5rem" mx="auto" />
          <Text className="main-text" fontWeight="bold" mb="1rem">
            Hi, we couldn't find the page that you were looking for!
          </Text>
        </Box>
      </Center>
    </Box>
  );
};

export default NotFoundPage;
