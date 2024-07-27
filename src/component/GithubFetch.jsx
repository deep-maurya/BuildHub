import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGithubProfile } from "../Redux/action";
import axios from "axios";
import { Box, Button, Container, Heading, Image, Input, Stack, Text } from "@chakra-ui/react";

const GithubFetch = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.github);

  const handleUpdate = async () => {
    dispatch(fetchGithubProfile(username));
    // console.log(username)
    // // const data = await axios.get(`https://api.github.com/users/${username}`)
    // const data  = await axios.get(`https://api.github.com/users/${username}/repos`)
    // console.log(data.data);
  };

  return (
    <Box bg={'orange'}>
        <Container maxW={'3xl'} bg={''}>
        <Stack
          as={Box}
          textAlign={'center'}
        //   spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Enter You Github <br />
            <Text as={'span'} color={'green.400'}>
              Username
            </Text>
          </Heading>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub Username"
            textAlign={'center'}
            mb={0}
          />
          <Button mt={0} onClick={handleUpdate}>Fetch GitHub Profile</Button>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {data.name!='' &&
            <div>
            <Image src={data.image}/>
            <h3>Profile Data:</h3>
            <p>Name: {data.name}</p>
            <p>Location: {data.location}</p>
            <p>Bio: {data.bio}</p>
            <p>
              GitHub:{" "}
              <a
                href={
                  data.socialLinks.find((link) => link.id === "github")?.url
                }
              >
                GitHub Profile
              </a>
            </p>
          </div>
          }
        </Stack>
      </Container>
    </Box>
    // <Box bg={'red'}>
    //   <Container maxW={"container.xl"} bg={""} p={5}>
    //     <Box marginLeft={'auto'} marginRight={'auto'} maxW={'md'} textAlign={'center'}>
    //     <Heading
    //         fontWeight={600}
    //         fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
    //         lineHeight={'110%'}>
    //         Make money from <br />
    //         <Text as={'span'} color={'green.400'}>
    //           your audience
    //         </Text>
    //       </Heading>
    //       <Input
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         placeholder="Enter GitHub Username"
    //       />
    //       <Button onClick={handleUpdate}>Fetch GitHub Profile</Button>
    //       {loading && <p>Loading...</p>}
    //       {error && <p>Error: {error}</p>}
    //       {data.name!='' &&
    //         <div>
    //         <h3>Profile Data:</h3>
    //         <p>Name: {data.name}</p>
    //         <p>Location: {data.location}</p>
    //         <p>Bio: {data.bio}</p>
    //         <p>
    //           GitHub:{" "}
    //           <a
    //             href={
    //               data.socialLinks.find((link) => link.id === "github")?.url
    //             }
    //           >
    //             GitHub Profile
    //           </a>
    //         </p>
    //       </div>
    //       }
    //     </Box>
    //   </Container>
    // </Box>
  );
};

export default GithubFetch;
