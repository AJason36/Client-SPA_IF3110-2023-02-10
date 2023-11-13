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
}

interface BookListProps {
  books: Book[];
}

const MyBookList = ({ books }: BookListProps) => {
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
            <Heading mb={4}>My Book Premium List</Heading>
          </Center>

          {/* Todo: semua link */}
          <Link href="/book/add" color="blue.500" mb={4}>
            + Add Book
          </Link>
          <Table variant="striped" colorScheme="blue" size="md" borderWidth="1px" borderColor="gray.200">
            <Thead>
              <Tr>
                <Th borderBottom="1px" borderColor="gray.200">ID</Th>
                <Th>Title</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {books.map((book) => (
                <Tr borderBottom="1px" borderColor="gray.200" key={book.book_id}>
                  <Td >{book.book_id}</Td>
                  <Td>{book.name}</Td>
                  <Td>
                    <Center bg={"transparent"} gap={4}>
                      <Button bg="teal" color={"white"}>
                        Edit
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

export default MyBookList;
