import React, { useEffect, useState } from 'react'
import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel, useToast } from '@chakra-ui/react'
import { useHistory } from "react-router-dom";
import LoginComponent from '../Components/Authen/LoginComponent'
import LicenseComponent from '../Components/Authen/LicenseComponent'
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from "../store/index"
import { bindActionCreators } from 'redux';
import axios from 'axios';

const Homepage = () => {
    const history = useHistory()

    const state = useSelector((state) => state)

    useEffect(() => {
        if (state.account.token) {
            console.log("da vao day roi xu ly di")
            history.push("/chats");
            return
        }
        // if (Object.keys(state).length !== 0) {
        //     history.push("/chats");
        //     return
        // }
    })

    return (

        <Container maxW='xl' centerContent>
            <Box
                d='flex'
                justifyContent='center'
                p={3}
                bg='#CDDEFF'
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
                textAlign="center"
            >
                <Text
                    fontSize="4xl"
                    fontFamily="Work sans"
                    color="black"
                >IIA</Text>
            </Box>
            <Box
                bg="#CDDEFF"
                w="100%"
                p={4}
                borderRadius="lg"
                borderWidth="1px"
            >
                <Tabs variant='soft-rounded' color='#676FA3'>
                    <TabList
                        mb="1em"
                    >
                        <Tab
                            width="80%"
                        >Login</Tab>
                        <Tab
                            width="20%"
                        >License</Tab>\
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <LoginComponent />
                        </TabPanel>
                        <TabPanel>
                            <LicenseComponent />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Homepage
