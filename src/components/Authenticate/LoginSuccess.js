import { Center, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

import './LoginSuccess.css';

export function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 5000);
  }, []);

  return (
    <Flex flexDirection={'column'}>
      <div className="wrapper">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 98.5 98.5" enableBackground="new 0 0 98.5 98.5" xmlSpace="preserve">
          <path class="checkmark" fill="none" strokeWidth="8" strokeMiterlimit="10" d="M81.7,17.8C73.5,9.3,62,4,49.2,4C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3" />
        </svg>
      </div>
      <Center>
        <Text>
          Congrats! You have been signed in. Redirecting to dashboard...
        </Text>
      </Center>
    </Flex>
  )
}