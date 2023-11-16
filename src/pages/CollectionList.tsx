import React,{useState,useEffect} from 'react';
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
    useToast,
    Text
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { axiosConfig } from "../utils/axios";
import { getUsername } from "../utils/auth";
import { Router, Link as RouterLink } from "react-router-dom";
import config from "../config/config";
import axios from "axios";

const CollectionList = () => {
    type BookCollection = {
        idx: number;
        book_id: number;
        title: string;
        author: string;
    }
    const initialCollections: BookCollection[] = [];
    const [books, setBooks] = useState(initialCollections);
    const newAxiosInstance = axios.create(axiosConfig());
    const username = getUsername();
    const toast = useToast();
    useEffect(() => {
        newAxiosInstance.get(`${config.REST_API_URL}/collection`).then((res) => {
            const booksData: BookCollection[] = res.data.books.map((book: any) => {
                return {
                    idx:res.data.books.indexOf(book)+1,
                    book_id: book.book_id,
                    title: book.title,
                    author: book.author
                };
            })
            setBooks(booksData);
        })
    }, [])
    const handleDeleteBookFromCollection = async (bookId: number) => {
        try {
            const response = await newAxiosInstance.delete(`${config.REST_API_URL}/collection/${bookId}`);
            setBooks(books.filter((book) => book.book_id !== bookId));
            if(response.status === 200) {
                toast({
                    title: "Book deleted from collection",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Failed to delete book from collection",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Failed to delete book from collection",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
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
                                    <Td >{book.idx}</Td>
                                    <Td>{book.title}</Td>
                                    <Td>{book.author}</Td>
                                    <Td>
                                        <Center bg={"transparent"} gap={4}>
                                        <RouterLink to={{ pathname: `/book-details` }} state={{ book_id: book.book_id }}>
                                            <Button bg="#C4A536" color={"white"}>
                                                Details
                                                </Button>
                                                </RouterLink>
                                            <Button bg="red" color={"white"}  onClick={()=>handleDeleteBookFromCollection(book.book_id)}>
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
