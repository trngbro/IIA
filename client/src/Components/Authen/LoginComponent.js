import React, { useEffect, useState } from 'react'
import { Button, Text, Image, VStack, InputRightElement, FormControl, FormLabel, InputGroup, Input } from '@chakra-ui/react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from "axios";
import ggicon from "./google_icon.png"
import { useToast } from "@chakra-ui/react";
import Link, { useHistory } from "react-router-dom";
import './GoogleButton.css'

const LoginComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async () => {
        setLoading(true);
        let res;
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        } else {
            if (!email.includes('@')) {
                res = await axios.post('/login/checking', JSON.stringify({ password, username: email }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else if (!email.endsWith("@student.tdtu.edu.vn")) {
                setLoading(false)
                toast({
                    title: "Required sign at tdtu.edu.vn",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setLoading(false);
                return
            } else {
                res = await axios.post('/login/checking', JSON.stringify({ password, email }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

        try {
            setLoading(false);
            if (res.data && res.data.success) {
                toast({
                    title: res.data.message,
                    description: "Sign in",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })

                localStorage.setItem("userToken", JSON.stringify(res.data.data));

                setInterval(function () {
                    history.push("/otherpage");
                }, 1000)
            } else {
                toast({
                    title: res.data.message,
                    description: "Email or password are wrong",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                })
            }
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }

    const handleLoginSuccess = async (credentialResponse) => {
        const res = await axios.post('/login', JSON.stringify({ credentialResponse }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.data && res.data.success) {
            toast({
                title: res.data.message,
                description: "Sign in",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            localStorage.setItem("userToken", JSON.stringify(res.data.data));

            setInterval(function () {
                history.push("/otherpage");
            }, 1000)
        } else {
            if (!res.data.success && res.data.message) {
                toast({
                    title: res.data.message,
                    description: "Please contact us",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: res.data.message,
                    description: "Please contact us",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }
    }

    return (
        <GoogleOAuthProvider clientId="647101151739-3j5hf16tq8aactbe9pup30la2oqmi67s.apps.googleusercontent.com">
            <VStack
                spacing="5px"
                textAlign="left"
            >
                <FormControl id="email" isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                        value={email}
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" ? submitHandler() : setPassword(e.target.value)}
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    colorScheme="blue"
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    isLoading={loading}
                >
                    Login
                </Button>
                <Text as='em'

                >
                    <br />
                    <i>Or using Google account instead</i>
                </Text>
                {
                    !isLoading ?
                        <Button
                            isLoading={isLoading}
                            loadingText='Connect to your Google'
                            colorScheme='teal'
                            variant='outline'
                            spinnerPlacement='start'
                            border="1px solid #EEF2FF"
                            color='#676FA3'
                            w="100%"
                            onClick={() => setIsLoading(true)}
                        >
                            <Image
                                borderRadius='full'
                                boxSize='30px'
                                src={ggicon}
                                alt='SSO with Google'
                            />
                            &nbsp;&nbsp;Continue with Google

                        </Button>
                        :
                        <GoogleLogin
                            className="custom-google-login"
                            onSuccess={credentialResponse => {
                                handleLoginSuccess(credentialResponse)
                            }}
                            onError={() => {
                                toast({
                                    title: 'Fail to authen.',
                                    description: "Account must required sign at tdtu.edu.vn",
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true,
                                })
                            }}
                        />
                }
            </VStack >
        </GoogleOAuthProvider>
    )
}

export default LoginComponent
