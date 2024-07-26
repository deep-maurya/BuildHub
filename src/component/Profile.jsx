import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { update_data } from "../Redux/actionTypes";

export const Profile = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const ref = useRef([]);
  const details = useSelector((state) => state.github.data);
  //console.log(details);
  const [value, setValue] = useState({
    name: "",
    job: "",
    location: "",
    bio: "",
    socialLinks: "",
  });

  useEffect(() => {
    if (details) {
      setValue(details);
    }
  }, [details]);

  const handle_change = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handle_form_Submit = (e) => {
    e.preventDefault();
    dispatch({ type: update_data, payload: value });
    //alert('Profile updated!');

    toast({
      position: "top",
      title: "Profile Updated.",
      description: "Your Profile Updated Successfully.",
      status: "success",
      duration: 3000,
    });
  };

  return (
    <>
      <Box w={"100%"} display={"grid"} gap={3} flexWrap={"wrap"}>
        <Card maxW="md">
          <CardHeader style={{ borderBottom: "2px solid black" }}>
            <Heading size="md">Update Profile</Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={handle_form_Submit}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  mb={3}
                  name="name"
                  value={value.name}
                  onChange={handle_change}
                  ref={(el) => (ref.current[0] = el)}
                />
                <FormLabel>Job Role</FormLabel>
                <Input
                  type="text"
                  mb={3}
                  name="job"
                  value={value.job}
                  onChange={handle_change}
                  ref={(el) => (ref.current[1] = el)}
                />
                <FormLabel>Country</FormLabel>
                <Input
                  type="text"
                  mb={3}
                  name="location"
                  value={value.location}
                  onChange={handle_change}
                  ref={(el) => (ref.current[2] = el)}
                />
                <FormLabel>Bio</FormLabel>
                <Textarea
                  rows={10}
                  name="bio"
                  value={value.bio}
                  onChange={handle_change}
                  size="sm"
                />
              </FormControl>
              <Button type="submit" mt={5} colorScheme="teal" size="md">
                Update Profile
              </Button>
            </form>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};
