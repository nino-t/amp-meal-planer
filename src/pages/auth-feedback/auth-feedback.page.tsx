import React from 'react';
import { Box, Text, Wrap, Button, FormControl, FormLabel, Textarea, WrapItem } from '@chakra-ui/react';

const AuthFeedback = () => {
  return (
    <Box minH="100vh" py={10}>
      <Text fontSize={20} fontWeight="bold" mb={2}>What's is wrong?</Text>
      <Wrap spacing={2}>
        <WrapItem>
          <Button variant="clean" fontWeight="normal" borderRadius={20} border="0.435773px solid #000000" py={1} px={6} fontSize="sm">
            Application bugs
          </Button>
        </WrapItem>
        <WrapItem>
          <Button variant="clean" fontWeight="normal" borderRadius={20} border="0.435773px solid #000000" py={1} px={6} fontSize="sm">
            Customer service
          </Button>
        </WrapItem>
        <WrapItem>
          <Button variant="clean" fontWeight="normal" borderRadius={20} border="0.435773px solid #000000" py={1} px={6} fontSize="sm">
            Slow loading
          </Button>
        </WrapItem>
        <WrapItem>
          <Button variant="clean" fontWeight="normal" borderRadius={20} border="0.435773px solid #000000" py={1} px={6} fontSize="sm">
            Bad navigation
          </Button>
        </WrapItem>
        <WrapItem>
          <Button variant="clean" fontWeight="normal" borderRadius={20} border="0.435773px solid #000000" py={1} px={6} fontSize="sm">
            Weak functionality
          </Button>
        </WrapItem>
        <WrapItem>
          <Button variant="primary" fontWeight="normal" borderRadius={20} border="0.435773px solid #000000" py={1} px={6} fontSize="sm">
            Other problems
          </Button>
        </WrapItem>
      </Wrap>

      <FormControl mb={20} mt={10}>
        <FormLabel fontWeight="bold">Notes</FormLabel>
        <Textarea 
          placeholder="How we can do better?"
          rows={6}
        />
      </FormControl>

      <Button variant="primary" py={8} width="full">
        Submit Feedback
      </Button>
    </Box>
  );
}

export default AuthFeedback;