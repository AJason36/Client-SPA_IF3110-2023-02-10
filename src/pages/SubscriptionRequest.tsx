import React from 'react';
import {
    Box,
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
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { colors } from '../global';

interface User {
    user_id: number;
    username: string;
}

interface UserListProps {
    users: User[];
}

const SubscriptionRequestPage = ({ users }: UserListProps) => {
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
                        {/* Todo: 'MY' diganti nama */}
                        <Heading mb={4}>Subscription Request</Heading>
                    </Center>

                    {/* Todo: semua link */}
                    <Link href="/book/add" color="blue.500" mb={4}>
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
                                <Tr key={user.user_id}>
                                    <Td >{user.user_id}</Td>
                                    <Td>{user.username}</Td>
                                    <Td>
                                        <Center bg={"transparent"} gap={4}>
                                            <Button bg="teal" color={"white"}>
                                                Accept
                                            </Button>
                                            <Button bg="red" color={"white"}>
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
