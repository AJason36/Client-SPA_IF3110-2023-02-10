import { FunctionComponent, useEffect,useState } from "react";
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
  Text,
  Link
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useLocation,useNavigate, Link as RouterLink } from "react-router-dom";
import { axiosConfig } from "../utils/axios";
import { getRole, getUsername } from "../utils/auth";
import axios from "axios";
import config from "../config/config";

const BookDetail: FunctionComponent = () => {
    type PremiumBook = {
        title: string;
        genre: string;
        year: number;
        content: string;
        duration: number;
        audioPath: string;
    }
  const location = useLocation();
  const { book_id } = location.state;
  const [book,setBook] = useState<PremiumBook>();
  const axiosInstance = axios.create(axiosConfig());
  const username = getUsername();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.get(`${config.REST_API_URL}/premium-details/${book_id}`).then((res) => {
      const bookData: PremiumBook = {
        title: res.data.book.title,
        genre: res.data.book.genre,
        year: res.data.book.year,
        content: res.data.book.content,
        duration: res.data.book.duration,
        audioPath: res.data.book.audioPath,
      }
      setBook(bookData);
     })
  },[])

  return (
    <>
      <Navbar children={undefined} />
      <Center>
        <Flex
          w={{ lg: "80vw" }}
          padding={"2rem"}
          flexDirection={"column"}
        >
          {getRole() === "author" ?
            <Link href="/../my-book" color="blue.500" mb={4}>
              Back
            </Link> :
            <Link href="/../collection" color="blue.500" mb={4}>
            Back
          </Link>
            }
          <Center>
            <Heading
              as="h2"
              mb={4}
            >
              Book Details</Heading>
          </Center>
          
          <Flex border='2px' py={5} borderColor={"teal"} borderRadius={10} alignContent={"center"} justifyContent={"center"}>
            <FormControl
              className="form-content flex-column"
              border={4}
              borderColor={"teal"}
              w={"80%"}
            >
              <FormControl id="book_id">
              <FormLabel className="form-label" htmlFor="title">
                Title:
              </FormLabel>
                <Text mb={4}>
                  {book?.title}
              </Text>
              </FormControl>

              <FormControl id="year">
              <FormLabel className="form-label" htmlFor="year">
                Year Published
              </FormLabel>
                <Text mb={4}>
                  {book?.year}
              </Text>
              </FormControl>

              <FormControl id="detail">
              <FormLabel className="form-label" htmlFor="summary">
                Detail
              </FormLabel>
                <Text mb={4}>
                  {book?.content}
                </Text>
              </FormControl>

              <FormControl id="genre">
              <FormLabel className="form-label" htmlFor="genre">
                Genre
              </FormLabel>
                <Text mb={4}> 
                  {book?.genre}
              </Text>
              </FormControl>

              <FormControl id="duration">
              <FormLabel className="form-label" htmlFor="duration">
                Duration
              </FormLabel>
                <Text mb={4}>
                  {book?.duration} menit
              </Text>
              </FormControl>

              <FormControl id="audio">
              <FormLabel className="file-upload form-label" htmlFor="audio">
                Audio
              </FormLabel>
                <Text mb={4}>
                  {book?.audioPath}
              </Text>
              </FormControl>
              
            </FormControl>
          </Flex>
        </Flex>
      </Center>
    </>
  );
};

export default BookDetail;
