import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

export const Header = () => {
  const { data } = useSelector((state) => state.github);
  return (
    <>
      <Box align={"center"}>
        <Text fontSize="3xl" as={"b"}>
          Is this Profile Yours?
        </Text>
        <Image
          mt={3}
          mb={3}
          style={{ borderRadius: "50%", width: "150px" }}
          src={data.image}
        />
        <Text fontSize={"20px"} as={"b"}>
          {data.name}
        </Text>
      </Box>
    </>
  );
};
