import React, { useState, useEffect, useRef } from "react";
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
  useToast,
  Text
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { axiosConfig } from "../utils/axios";
import { getUsername } from "../utils/auth";
import { Router, Link as RouterLink } from "react-router-dom";
import config from "../config/config";
import axios from "axios";


const MyBookList = () => {
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
  useEffect(() => { 
    newAxiosInstance.get(`${config.REST_API_URL}/premium-book`)
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
  },[])
  const toast = useToast();

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
            <Heading mb={4}>{username}'s Book Premium</Heading>
          </Center>

          {/* Todo: semua link */}
          <Link href="/add" color="blue.500" mb={4}>
            + Add Book
          </Link>
          {premiumBooks ?
            <Table variant="striped" colorScheme="blue" size="md" borderWidth="1px" borderColor="gray.200">
              <Thead>
                <Tr>
                  <Th borderBottom="1px" borderColor="gray.200">ID</Th>
                  <Th>Title</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {premiumBooks.map((book) => (
                  <Tr borderBottom="1px" borderColor="gray.200" key={book.book_id}>
                    <Td >{book.idx}</Td>
                    <Td>{book.title}</Td>
                    <Td>
                      <Center bg={"transparent"} gap={4}>
                        <RouterLink to={{ pathname: `/edit-book` }} state={{ book_id: book.book_id }}>
                          <Button bg="teal" color={"white"}>
                            Edit
                          </Button>
                        </RouterLink>
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
            :              <Text>
                You don't have any premium book yet.
              </Text>
          }
        </Flex>
      </Center>
    </>
  );
};

export default MyBookList;
