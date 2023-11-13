import { FunctionComponent, useState } from "react";
import {
  Flex,
  Input,
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  Textarea,
  Center,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const AddBookPage: FunctionComponent = () => {
  const [input, setInput] = useState('')
  const isError = input === ''
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
            <Heading
              as="h2"
              mb={4}
            >
              Add Book Page</Heading>
          </Center>
          <Flex border='2px' py={5} borderColor={"teal"} borderRadius={10} alignContent={"center"} justifyContent={"center"}>
            <FormControl
              className="form-content flex-column"
              border={4}
              borderColor={"teal"}
              w={"80%"}
            >
              <FormControl id="book_id" isRequired>
              <FormLabel className="form-label" htmlFor="title">
                Title:
              </FormLabel>
              <Input type="text" id="title" name="title" isRequired
                background={"transparent"}
                color={"black"}
                mb={2}
                />
              </FormControl>

              <FormControl id="year" isRequired>
              <FormLabel className="form-label" htmlFor="year">
                Year Published
              </FormLabel>
              <NumberInput id="year" name="year" isRequired
                color={"black"}
                mb={2}>
                <NumberInputField background={"transparent"} />
                </NumberInput>
              </FormControl>

              <FormControl id="detail" isRequired>
              <FormLabel className="form-label" htmlFor="summary">
                Detail
              </FormLabel>
              <Textarea
                id="summary"
                name="summary"
                rows={5}
                cols={50}
                isRequired
                background={"transparent"}
                color={"black"}
                mb={2}
                ></Textarea>
              </FormControl>

              <FormControl id="genre" isRequired>
              <FormLabel className="form-label" htmlFor="genre">
                Genre
              </FormLabel>
              <Input type="text" id="genre" name="genres" isRequired background={"transparent"}
                color={"black"}
                  mb={2} />
              </FormControl>

              <FormControl id="price" isRequired>
              <FormLabel className="form-label" htmlFor="price">
                Price
              </FormLabel>
              <NumberInput id="price" name="price" isRequired>
                <NumberInputField background={"transparent"}
                  color={"black"}
                  mb={2}
                  />
                </NumberInput>
              </FormControl>

              <FormControl id="audio" isRequired>
              <FormLabel className="file-upload form-label" htmlFor="audio">
                Audio
              </FormLabel>
              <Input
                type="file"
                id="audio"
                name="audio"
                accept="audio/mpeg"
                isRequired
                borderColor={"transparent"}
                />
              </FormControl>
              
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
              >
                Add
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      </Center>
    </>
  );
};

export default AddBookPage;
