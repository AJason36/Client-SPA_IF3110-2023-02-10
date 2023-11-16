import { Box, Center, Image, Text, Link } from '@chakra-ui/react';
import logo from "../assets/logo_colored.png";
import { getRole } from '../utils/auth';

const NotFoundPage: React.FC = () => {
  return (
    <Box className="wrapper-small">
      <Center className="pad-40">
        <Box className="centered">
          <Image src={logo} alt="Audibook Logo" mb="1.5rem" mx="auto" />
          <Text className="main-text" fontWeight="bold" mb="1rem">
            Hi, we couldn't find the page that you were looking for!
          </Text>
          <Text>
            Go back to the{' '}
            {getRole() === "author" ?
            <Link href="/../my-book" color="blue.500" mb={4}>
              Home page
            </Link> :
            <Link href="/../collection" color="blue.500" mb={4}>
            Home page
          </Link>
            }
          </Text>
        </Box>
      </Center>
    </Box>
  );
};

export default NotFoundPage;
