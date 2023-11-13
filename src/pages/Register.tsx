import {
    Image,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
    Button,
    Link,
} from '@chakra-ui/react';
import logo from "../assets/logo_colored.png";


const RegisterPage: React.FC = () => {
    return (
        <>
            <Center>
                <Flex
                    w={{ lg: "60vw" }}
                    padding={"2rem"}
                    flexDirection={"column"}
                >
                    <Center>
                        <Image src={logo} alt="logo" height="full" background={"transparent"} />
                    </Center>
                    <Flex border='2px' py={5} borderColor={"teal"} borderRadius={10} alignContent={"center"} justifyContent={"center"}>
                        <FormControl
                            className="form-content flex-column"
                            border={4}
                            borderColor={"teal"}
                            w={"80%"}
                        >
                            <FormControl id="username" isRequired>
                            <FormLabel htmlFor="username" className="form-label">
                                Username
                            </FormLabel>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="e.g. moonawar19"
                                required
                                className="form-field"
                                mb={2}
                                />
                            </FormControl>
                            <FormControl id="email" isRequired>
                            <FormLabel htmlFor="email" className="form-label">
                                E-Mail
                            </FormLabel>
                            <Input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="e.g. moonawar@gmail.com"
                                required
                                className="form-field"
                                mb={2}
                                />
                            </FormControl>

                            <FormControl id="password" isRequired>
                            <FormLabel htmlFor="password" className="form-label">
                                Password
                            </FormLabel>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="*****"
                                required
                                className="form-field"
                                mb={2}
                                />
                            </FormControl>
                            {/* Submit Button */}
                            <Button
                                type="button"
                                background={"teal"}
                                color={"white"}
                                w={"full"}
                                _hover={{
                                    color: "teal",
                                    bg: "white",
                                    borderColor: "teal",
                                    border: "2px",
                                }}
                            >
                                Register
                            </Button>
                            <Center>
                                <Text>
                                Already have an account?{' '}
                                    <Link href={'/../login'}><b>Sign In Here</b></Link>.
                                </Text>
                            </Center>
                        </FormControl>
                    </Flex>
                </Flex>
            </Center>
        </>
    );
};

export default RegisterPage;
