import React from 'react';
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
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';

interface Book {
    book_id: number;
    name: string;
    author: string;
}

interface PremiumBookListProps {
    books: Book[];
}

const PremiumBookList = ({ books }: PremiumBookListProps) => {
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
                        <Heading mb={4}>Premium Book List</Heading>
                    </Center>

                    {/* ToDo: link ke page add book collection */}
                    <Link href="/collection" color="blue.500" mb={4}>
                        Check Collection
                    </Link>
                    <Table variant="striped" colorScheme="blue" size="md" borderWidth="1px" borderColor="gray.200">
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Book Title</Th>
                                <Th>Author</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {books.map((book) => (
                                <Tr key={book.book_id}>
                                    <Td >{book.book_id}</Td>
                                    <Td>{book.name}</Td>
                                    <Td>{book.author}</Td>
                                    <Td>
                                        <Center bg={"transparent"} gap={4}>
                                            <Button bg="teal" color={"white"}>
                                                Add to Collection
                                            </Button>
                                            <Button bg="#C4A536" color={"white"}>
                                                Details
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

export default PremiumBookList;
