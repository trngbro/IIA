import React, { useEffect, useState } from 'react'
import { Button, Text, Image, VStack } from '@chakra-ui/react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from "axios";
import ggicon from "./google_icon.png"
import { useToast } from "@chakra-ui/react";
import Link, { useHistory } from "react-router-dom";
import './GoogleButton.css'

const LoginComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleLoginSuccess = async (credentialResponse) => {
        const res = await axios.post('/test/login', JSON.stringify({ credentialResponse }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(res);
    }

    return (
        <GoogleOAuthProvider clientId="647101151739-3j5hf16tq8aactbe9pup30la2oqmi67s.apps.googleusercontent.com">
            <VStack
                spacing="5px"
                textAlign="left"
            >
                <Text as='em'

                >
                    Login for starting
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
