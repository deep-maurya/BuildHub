import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGithubProfile } from "../Redux/action";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { RESET_GITHUB_PROFILE } from "../Redux/actionTypes";
import { Header } from "./Profile/Header";

const Github = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.github);
  const removeUsername = () =>{ 
    dispatch({type:RESET_GITHUB_PROFILE});
  }
  const searchUsername = async () => {
    dispatch(fetchGithubProfile(username));
  };
  useEffect(()=>{
    removeUsername()
  },[])

  return (
    <Box style={{height:"100vh",backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundImage:"url('https://media.istockphoto.com/id/1395723007/vector/pink-orange-yellow-and-red-color-gradient-summer-defocused-blurred-motion-abstract.jpg?s=612x612&w=0&k=20&c=qf1HnidyUgJiMLa4bHHomssiu7jdNEL7j-ezmiFrGb8=')"}} >
      <Container maxW={"3xl"} bg={""}>
        <Stack
          as={Box}
          textAlign={"center"}
          align={"center"}
          //   spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          {(data.name == "" ||  username=="") &&(
            <>
              <Heading
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
                fontFamily={ "Calistoga"}
              >
                Enter You Github <br />
                <Text as={"span"} color={"green.400"}>
                  Username
                </Text>
              </Heading>
              <Input
                fontFamily={ "Calistoga"}
                mt={10}
                type="text"
                p={10}
                fontSize={30}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub Username"
                textAlign={"center"}
                mb={0}
              />
              <Button mt={3} p={7} fontFamily={ "Calistoga"} onClick={searchUsername}>
                Fetch GitHub Profile
              </Button>
            </>
          )}
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {data.name!= "" && username!=""  && (
            <Box align={"center"}>
              <Header/>
              <Flex mt={3} justify={"center"} gap={2}>
                  <Button onClick={removeUsername} color={"white"} colorScheme={"red"}>
                    No
                  </Button>
                <NavLink to={`/github/${username}`}>
                  <Button color={"white"} colorScheme={"green"}>
                    Yes
                  </Button>
                </NavLink>
              </Flex>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Github;
