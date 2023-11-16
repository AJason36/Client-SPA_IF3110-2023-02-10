import React,{useState, useEffect} from 'react';
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

const PremiumBookList = () => {
    type PremiumBooks = {
        idx: number;
        book_id: number;
        createdBy?: string | null;
        title: string;
        genre: string;
        year: number;
        content: string;
        duration: number;
        audioPath: string;
      };
    
      const initialBooks: PremiumBooks[] = [];
      const [premiumBooks, setPremiumBooks] = useState(initialBooks);
      // TODO: PAGINATION
      const [page, setPage] = useState(1);
      const [limit, setLimit] = useState(10);
      const newAxiosInstance = axios.create(axiosConfig());
    const username = getUsername();
    const toast = useToast();
      useEffect(() => { 
        newAxiosInstance.get(`${config.REST_API_URL}/collection/premium`)
          .then((res) => { 
            const booksData: PremiumBooks[] = res.data.books.map((book: any) => {
              return {
                idx: res.data.books.indexOf(book)+1,
                book_id: book.book_id,
                createdBy: book.createdBy,
                title: book.title,
                genre: book.genre,
                year: book.year,
                content: book.content,
                duration: book.duration,
                audioPath: book.audioPath,
              };
            })
            setPremiumBooks(booksData);
          })
      }, [])
    
    const handleAddBookToCollection = async (bookId:number) => { 
        try {
            const response = await newAxiosInstance.post(`/collection/${bookId}`)
            console.log(response);
            if(response.status === 200) { 
                toast({
                    title: "Book added to collection",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: "Book add to collection failed",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
        catch (error) {
            toast({
                title: "Book add to collection failed",
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
                        <Heading mb={4}>Authors' Premium Book List</Heading>
                    </Center>

                    {/* ToDo: link ke page add book collection */}
                    <Link href="/collection" color="blue.500" mb={4}>
                        Check My Collection
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
                            {premiumBooks.map((book) => (
                                <Tr key={book.idx}>
                                    <Td >{book.idx}</Td>
                                    <Td>{book.title}</Td>
                                    <Td>{book.createdBy}</Td>
                                    <Td>
                                        <Center bg={"transparent"} gap={4}>
                                            <Button bg="teal" color={"white"} onClick={() => handleAddBookToCollection(book.book_id)}>
                                                Add to Collection
                                            </Button>
                                            <RouterLink to={{ pathname: `/book-details` }} state={{ book_id: book.book_id }}>
                                            <Button bg="#C4A536" color={"white"}>
                                                Details
                                                </Button>
                                                </RouterLink>
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
