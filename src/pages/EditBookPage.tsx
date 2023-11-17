import { FunctionComponent, useEffect, useState } from "react";
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
    Link,
    FormHelperText
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { axiosConfig } from "../utils/axios";
import { getUsername } from "../utils/auth";
import axios from "axios";
import config from "../config/config";

const EditBookPage: FunctionComponent = () => {
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
    const axiosInstance = axios.create(axiosConfig());
    const [book, setBook] = useState<PremiumBook>();
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
        if (title === "" && year === 0 && detail === "" && genre === "" && duration === 0 && audio === null) {
            toast({
                title: "No changes made",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return false;
        }
        return true;
    }

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

    const handleEditBook = async () => {
        if (validate()) {
            try {
                const response = await newAxiosInstance.put(`/premium/${book_id}`, {
                    title: title=='' ? book?.title : title,
                    genre: genre=='' ? book?.genre : genre,
                    year: year==0 ? book?.year : year,
                    content: detail=='' ? book?.content : detail,
                    duration: duration==0 ? book?.duration : duration,
                    audioPath: audio ? audio.toString() : "",
                });
                if (response.status === 200) {
                    toast({
                        title: "Book Edited successfully",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate("/my-book");
                } else {
                    toast({
                        title: "Book edit failed",
                        description: response.data.error,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
                console.log(response);
            } catch (error) {
                console.log(error)
                toast({
                    title: "Book edit failed",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    }

    const navigate = useNavigate();

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
                            Edit Book Page</Heading>
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
                                    New Title:
                                </FormLabel>
                                <Input type="text" id="title" name="title"
                                    background={"transparent"}
                                    color={"black"}
                                    mb={2}
                                    onChange={handleChangeTitle}
                                />
                                <FormHelperText mb={2}>
                                    Previous Title: {book?.title}
                                </FormHelperText>
                            </FormControl>

                            <FormControl id="year">
                                <FormLabel className="form-label" htmlFor="year">
                                    New Year Published
                                </FormLabel>
                                <NumberInput id="year" name="year"
                                    color={"black"}
                                    mb={2}
                                >
                                    <NumberInputField background={"transparent"}
                                        onChange={handleChangeYear} />
                                </NumberInput>
                                <FormHelperText mb={2}>
                                    Previous Year: {book?.year}
                                </FormHelperText>
                            </FormControl>

                            <FormControl id="detail">
                                <FormLabel className="form-label" htmlFor="summary">
                                    New Detail
                                </FormLabel>
                                <Textarea
                                    id="summary"
                                    name="summary"
                                    rows={5}
                                    cols={50}

                                    background={"transparent"}
                                    color={"black"}
                                    mb={2}
                                    onChange={handleChangeDetail}
                                ></Textarea>
                            </FormControl>

                            <FormControl id="genre">
                                <FormLabel className="form-label" htmlFor="genre">
                                    New Genre
                                </FormLabel>
                                <Input type="text" id="genre" name="genres" background={"transparent"}
                                    color={"black"}
                                    mb={2}
                                    onChange={handleChangeGenre}
                                />
                                <FormHelperText mb={2}>
                                    Previous Genre: {book?.genre}
                                </FormHelperText>
                            </FormControl>

                            <FormControl id="duration">
                                <FormLabel className="form-label" htmlFor="duration">
                                    New Duration
                                </FormLabel>
                                <NumberInput id="duration" name="duration">
                                    <NumberInputField background={"transparent"}
                                        color={"black"}
                                        mb={2}
                                        onChange={handleChangeDuration}
                                    />
                                </NumberInput>
                                <FormHelperText mb={2}>
                                    Previous Duration: {book?.duration} menit
                                </FormHelperText>
                            </FormControl>

                            <FormControl id="audio">
                                <FormLabel className="file-upload form-label" htmlFor="audio">
                                    New Audio
                                </FormLabel>
                                <Input
                                    type="file"
                                    id="audio"
                                    name="audio"
                                    accept="audio/mpeg"

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
                                onClick={handleEditBook}
                            >
                                Edit Book
                            </Button>
                        </FormControl>
                    </Flex>
                </Flex>
            </Center>
        </>
    );
};

export default EditBookPage;
