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
    useToast,
} from '@chakra-ui/react';
import logo from "../assets/logo_colored.png";
import { axiosInstance } from "../utils/axios";
import { AxiosError } from "axios";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from "react";


const RegisterPage: React.FC = () => {
    const toast = useToast();
    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState(true);

    const handleChangeUsername: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
        setUsername(e.target.value);
    }
    const handleChangeFullName: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
        setFullName(e.target.value);
    }
    const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
        setEmail(e.target.value);
    }
    const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
        setPassword(e.target.value);
    }

    
  const validateName = () => {
    if (fullName.length > 2) {
      return true;
    } else {
      return false;
    }
  };
  const validateUsername = () =>
    username.length > 0 &&
    username.match(/^[a-z0-9][a-z0-9\d]*(?:_[a-z0-9\d]+)*$/i);
  const validateEmail = () =>
    email.length > 0 &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    const validatePassword = () => password.length > 5;
    const validate = () => {
        if (
          validateName() &&
          validateUsername() &&
          validateEmail() &&
          validatePassword()
        ) {
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
      };
    
    useEffect(() => validate(), [fullName, username, email, password]);
    const handleRegister = async () => {
        try {
            const response = await axiosInstance.post("/register", {
                username: username.toLowerCase(),
                fullName: fullName,
                email: email,
                password: password,
            });
            if(response.status===200){
                toast({
                    title: "Account Created",
                    description: "Please login to continue.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/login");
            } else {
                const errorMessage = response.data.error;
                toast({
                    title: "Registration Error",
                    description: errorMessage,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                const errorMessage = (err.response.data as any)?.error;
                toast({
                    title: "Registration Error",
                    description: errorMessage || "An error occurred. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else if (err.request) {
                // The request was made but no response was received
                toast({
                    title: "Network Error",
                    description: "Please check your network connection and try again.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // Something happened in setting up the request that triggered an Error
                toast({
                    title: "An error occurred.",
                    description: "Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    }
    const navigate = useNavigate();
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

                            <FormControl id="fullName" isRequired>
                            <FormLabel htmlFor="fullName" className="form-label">
                                Full Name
                            </FormLabel>
                            <Input
                                type="text"
                                id="fullname"
                                name="fullname"
                                placeholder="e.g. Addin Munawwar"
                                required
                                className="form-field"
                                    mb={2}
                                    onChange={handleChangeFullName}
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
                                onChange={handleChangeEmail}
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
                                onClick={handleRegister}
                                isDisabled={isDisabled}
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
