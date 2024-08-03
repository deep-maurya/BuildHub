import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGithubProfile } from "../../Redux/action";
import axios from "axios";
import logo from '../../../public/logo.png'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NavLink, useParams } from "react-router-dom";
import { RESET_GITHUB_PROFILE } from "../../Redux/actionTypes";

const GithubFetch = () => {
  const {github_id} = useParams();
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.github);
  const removeUsername = () =>{ 
    dispatch({type:RESET_GITHUB_PROFILE});
  }
  const searchUsername = async () => {
    dispatch(fetchGithubProfile(github_id));
  };

  useEffect(()=>{
    searchUsername(github_id)
  },[github_id])

  return (
    <>
    {loading && <Text textAlign={"center"}>Loading</Text>}
    {error && <Text textAlign={"center"}>Page Not found</Text>}
    {data.name != "" && (
    <Box style={{backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundImage:"url('https://media.istockphoto.com/id/1395723007/vector/pink-orange-yellow-and-red-color-gradient-summer-defocused-blurred-motion-abstract.jpg?s=612x612&w=0&k=20&c=qf1HnidyUgJiMLa4bHHomssiu7jdNEL7j-ezmiFrGb8=')"}} >
      <Container maxW={"3xl"} bg={""}>
        <Stack
          as={Box}
          textAlign={"center"}
          align={"center"}
          //   spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
            <Box align={"center"}>
              <Image
                mt={3}
                mb={3}
                style={{ borderRadius: "50%", width: "150px" }}
                src={data.image}
              />
              <Text fontSize={"20px"} as={"b"}>
                {data.name}
              </Text>
              <br/>
              {data.bio!='' && <Text fontSize={"20px"} as={"b"}>
                {data.bio}
              </Text>}
            </Box>
          
        </Stack>
      </Container>
    </Box>)}
    </>
  );
};

export default GithubFetch;
