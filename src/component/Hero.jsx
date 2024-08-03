'use client'
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Image,
} from '@chakra-ui/react'
import 'animate.css';
import logo from '../../public/logo.png'
import { Link, NavLink } from 'react-router-dom'

export default function Hero() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          {/* <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Make money from <br />
            <Text as={'span'} color={'green.400'}>
              your audience
            </Text>
          </Heading> */}
          <Image className='animate__animated animate__flipInY' src={logo} />
          <Text color={'gray.500'}>
          BuildHub allows users to create professional portfolios using their GitHub ID. It seamlessly integrates with GitHub to showcase your projects and contributions. Future updates will bring additional features for an enhanced experience.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
              as={NavLink}
              to={'./github'}
              >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}