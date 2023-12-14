import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const LicenseComponent = () => {
    const history = useHistory()
    const toast = useToast()


    const submitHandle = async () => {

    }

    return (
        <VStack
            spacing="5px"
        >



            <Button
                colorScheme='teal'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={submitHandle}
            >
                Go to login
            </Button>
        </VStack >
    )
}

export default LicenseComponent
