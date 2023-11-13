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

interface BookPremium {
    book_id: number;
    name: string;
    author: string;
}

interface CollectionListProps {
    books: BookPremium[];
}

const CollectionList = ({ books }: CollectionListProps) => {
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
                        <Heading mb={4}>My Premium Collection</Heading>
                    </Center>

                    {/* ToDo: link ke page add book collection */}
                    <Link href="/premium-book" color="blue.500" mb={4}>
                        + Add Collection
                    </Link>
                    <Table variant="striped" colorScheme="blue" size="md" borderWidth="1px" borderColor="gray.200">
                        <Thead>
                            <Tr>
                                <Th borderBottom="1px" borderColor="gray.200">ID</Th>
                                <Th>Book Title</Th>
                                <Th>Author</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {books.map((book) => (
                                <Tr borderBottom="1px" borderColor="gray.200" key={book.book_id}>
                                    <Td >{book.book_id}</Td>
                                    <Td>{book.name}</Td>
                                    <Td>{book.author}</Td>
                                    <Td>
                                        <Center bg={"transparent"} gap={4}>
                                            <Button bg="#C4A536" color={"white"}>
                                                Details
                                            </Button>
                                            <Button bg="red" color={"white"}>
                                                Delete
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

export default CollectionList;
