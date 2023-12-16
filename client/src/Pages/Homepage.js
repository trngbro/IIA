import React, { useEffect, useState } from 'react'
import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { useHistory } from "react-router-dom";
import LoginComponent from '../Components/Authen/LoginComponent'
import LicenseComponent from '../Components/Authen/LicenseComponent'

const Homepage = () => {
    const history = useHistory()
    // useEffect(() => {
    //     const user = localStorage.getItem("userInfoDataSaved");
    //     user == null ? history.push() : history.push("/otherpage");
    // })
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
