import React, { useState, useEffect } from 'react';
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Link,
    Flex,
    Button,
    Center,
    useToast
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { axiosConfig } from "../utils/axios";
import { getUsername } from "../utils/auth";
import { Router, Link as RouterLink } from "react-router-dom";
import config from "../config/config";
import axios from "axios";
// interface User {
//     user_id: number;
//     username: string;
// }

// interface UserListProps {
//     users: User[];
// }

const SubscriptionRequestPage = () => {
    type User = {
        idx: number;
        username: string;
    }

    const initialUsers: User[] = [];
    const [users, setUsers] = useState(initialUsers);
    const username = getUsername();
    const newAxiosInstance = axios.create(axiosConfig());
    const toast = useToast();
    useEffect(() => {
        newAxiosInstance.get(`${config.REST_API_URL}/request/${username}`).then((res) => {
            const usersData: User[] = res.data.map((user: any) => {
                return {
                    idx: res.data.indexOf(user) + 1,
                    username: user.requester
                };
            })
            setUsers(usersData);
        })
    }, [])
    const handleApproveRequest = async (requester: string) => {
        try {
            const response = await newAxiosInstance.post(`${config.REST_API_URL}/request/approve`, {
                requestBy: requester,
                to: username,
            });
            setUsers(users.filter((user) => user.username !== requester));
            if (response.status === 200) {
                toast({
                    title: "Request approved",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch {
            toast({
                title: "Failed to approve request",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    }
    const handleRejectRequest = async (requester: string) => { 
        try {
            const response = await newAxiosInstance.post(`${config.REST_API_URL}/request/reject`, {
                requestBy: requester,
                to: username,
            });
            setUsers(users.filter((user) => user.username !== requester));
            if (response.status === 200) {
                toast({
                    title: "Request rejected",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch {
            toast({
                title: "Failed to reject request",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    }
    return (
        <>
            <Navbar children={undefined} />
            <Center>
                <Flex
                    w={{ lg: "80vw" }}
                    padding={"2rem"}
                    flexDirection={"column"}
                >
                    <Center>
                        <Heading mb={4}>Subscription Request</Heading>
                    </Center>

                    {/* Todo: semua link */}
                    <Link href="/collection" color="blue.500" mb={4}>
                        Check Collection
                    </Link>
                    <Table variant="striped" colorScheme="blue" size="md" borderWidth="1px" borderColor="gray.200">
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>User</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users.map((user) => (
                                <Tr key={user.idx}>
                                    <Td >{user.idx}</Td>
                                    <Td>{user.username}</Td>
                                    <Td>
                                        <Center bg={"transparent"} gap={4}>
                                            <Button bg="teal" color={"white"} onClick={()=>handleApproveRequest(user.username)}>
                                                Accept
                                            </Button>
                                            <Button bg="red" color={"white"} onClick={()=>handleRejectRequest(user.username)}>
                                                Reject
                                            </Button>
                                        </Center>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Flex>
            </Center>
        </>
    );
};

export default SubscriptionRequestPage;
