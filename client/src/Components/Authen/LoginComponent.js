import React, { useState } from 'react'
import { Button, Text, Image, VStack } from '@chakra-ui/react'
import axios from "axios";
import ggicon from "./google_icon.png"
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const LoginComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const history = useHistory()

    const submitHandle = async () => {
        setIsLoading(true)
        axios.get(`/test/login`)
            .then(res => {
                if (res.data.success === true) {
                    localStorage.setItem("userInfoDataSaved", JSON.stringify(res.data));
                    console.log(res.data)
                    history.push("/otherpage")
                }
                else {
                    setIsLoading(false)
                    toast({
                        title: 'Login fail.',
                        description: "Student email is required.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                }
            })
        return
    };

    return (
        <VStack
            spacing="5px"
            textAlign="left"
        >
            <Text as='em'

            >
                Login for starting
            </Text>
            <Button
                isLoading={isLoading}
                loadingText='Connect to your Google'
                colorScheme='teal'
                variant='outline'
                spinnerPlacement='start'
                border="1px solid #EEF2FF"
                color='#676FA3'
                w="100%"
                onClick={submitHandle}
            >
                <Image
                    borderRadius='full'
                    boxSize='30px'
                    src={ggicon}
                    alt='SSO with Google'
                />
                &nbsp;&nbsp;Continue with Google
            </Button>
        </VStack >
    )
}

export default LoginComponent
