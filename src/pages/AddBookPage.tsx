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
  useToast,
  Link
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { axiosConfig } from "../utils/axios";
import { getUsername } from "../utils/auth";
import axios from "axios";
import config from "../config/config";

const AddBookPage: FunctionComponent = () => {
  const [input, setInput] = useState('')
  const [title, setTitle] = useState('');
  const [year, setYear] = useState<Number>(0);
  const [detail, setDetail] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState<Number>(0);
  const [audio, setAudio] = useState<File | null>();
  const newAxiosInstance = axios.create(axiosConfig());
  const toast = useToast();
  const username = getUsername();
  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
    setTitle(e.target.value);
  }
  const handleChangeYear: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
    setYear(Number(e.target.value));
  }
  const handleChangeDetail: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => { 
    setDetail(e.target.value);
  }
  const handleChangeGenre: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
    setGenre(e.target.value);
  }
  const handleChangeDuration: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
    setDuration(Number(e.target.value));
  }
  const handleChangeAudio: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
    setAudio(e.target.files![0]);
  }

  const validate = () => {
    if (title === "") {
      toast({
        title: "Title is required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (year === 0) {
      toast({
        title: "Year is required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (detail === "") { 
      toast({
        title: "Detail of the book is required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (genre === "") {
      toast({
        title: "Genre is required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (duration === 0) {
      toast({
        title: "Duration is required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    if (audio === undefined) {
      toast({
        title: "Audio is required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    return true;
  }

  const handleAddBook = async () => {
    if (validate()) {
      // TODO: fix audio path
      // const formData = new FormData();
      // formData.append('audio', audio!);
      // formData.append('title', title);
      // formData.append('genre', genre);
      // formData.append('year', year.toString());
      // formData.append('content', detail);
      // formData.append('duration', duration.toString());
      // formData.append('createdBy', username);
      // console.log(formData);
      try {
        // const response = await newAxiosInstance.post("/premium", {
        //   formData
        // });
        const response = await newAxiosInstance.post("/premium", {
          title: title,
          genre: genre,
          year: year,
          content: detail,
          duration: duration,
          audioPath: audio ? audio.toString() : "",
          createdBy:username
        });
        if (response.status === 200) {
          toast({
            title: "Book added successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/my-book");
        } else {
          toast({
            title: "Book add failed",
            description: response.data.error,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Book add failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }

  const navigate = useNavigate();

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
          <Link href="/../my-book" color="blue.500" mb={4}>
            Back
          </Link>
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
                  onChange={handleChangeTitle}
                />
              </FormControl>

              <FormControl id="year" isRequired>
              <FormLabel className="form-label" htmlFor="year">
                Year Published
              </FormLabel>
              <NumberInput id="year" name="year" isRequired
                color={"black"}
                  mb={2}
                >
                  <NumberInputField background={"transparent"}
                  onChange={handleChangeYear}/>
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
                  onChange={handleChangeDetail}
                ></Textarea>
              </FormControl>

              <FormControl id="genre" isRequired>
              <FormLabel className="form-label" htmlFor="genre">
                Genre
              </FormLabel>
              <Input type="text" id="genre" name="genres" isRequired background={"transparent"}
                color={"black"}
                  mb={2}
                  onChange={handleChangeGenre}
                />
              </FormControl>

              <FormControl id="duration" isRequired>
              <FormLabel className="form-label" htmlFor="duration">
                Duration (in Minutes)
              </FormLabel>
              <NumberInput id="duration" name="duration" isRequired>
                <NumberInputField background={"transparent"}
                  color={"black"}
                    mb={2}
                    onChange={handleChangeDuration}
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
                  mb={2}
                  onChange={handleChangeAudio}
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
                onClick={handleAddBook}
              >
                Add Book
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      </Center>
    </>
  );
};

export default AddBookPage;
