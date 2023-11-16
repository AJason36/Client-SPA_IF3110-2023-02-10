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
    useToast
} from '@chakra-ui/react';
import logo from "../assets/logo_colored.png";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { Axios, AxiosError } from "axios";
import { useNavigate, Link as RouterLink, ErrorResponse } from "react-router-dom";
import { setAuthToken, getAuthData, Payload } from "../utils/auth";

const LoginPage: React.FC = () => {
    const toast = useToast();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();

    const handleChangeUsername: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
        setUsername(e.target.value);
    }

    const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
        setPassword(e.target.value);
    }

    const disableWhenEmpty = () => {
        if (username === "" || password === "") {
            setIsDisabled(true);
        }
        setIsDisabled(false);
    }
    useEffect(() => { 
        disableWhenEmpty();
    }, [username, password]);
    
    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post("/login", {
                username: username.toLowerCase(),
                password: password,
            });
            if (response.status == 200) {
                toast({
                    title: "Login successful",
                    description: response.data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
                setAuthToken(response.data.accessToken);
                const payload: Payload = getAuthData();
                if (payload.role.toString() === "author") {
                    navigate("/my-book");
                } else {
                    navigate("/collection");
                }
            } else {
                toast({
                    title: "Login failed.",
                    description: response.data.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            const err = error as AxiosError;
            const errorMessage = (err.response?.data as any)?.error;
            if (err.response?.status === 401) {
                toast({
                    title: "Invalid Credentials",
                    description: "Please check your username and password.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "An error occurred.",
                    description: errorMessage,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    }

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
                                    onChange={handleChangeUsername}
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
                                onChange={handleChangePassword}
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
                                onClick={handleLogin}
                                isDisabled={isDisabled}
                            >
                                Log In
                            </Button>
                            <Center>
                                <Text>
                                    Don't have an account?{' '}
                                    <Link href={'/../register'}><b>Sign Up Here</b></Link>.
                                </Text>
                            </Center>
                        </FormControl>
                    </Flex>
                </Flex>
            </Center>
        </>
    );
};

export default LoginPage;
