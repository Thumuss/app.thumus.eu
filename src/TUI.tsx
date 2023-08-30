import React, { useState } from "react";
import { render, Text, Box, useInput } from "ink";

const Counter = () => {
  const [text, setText] = useState("");
  useInput((_, key) => {
    if (key.rightArrow) {
      setText((text + "x"));
    }
	if (key.leftArrow) {
		setText((text.slice(1)));
	  }
  });
  return (
    <Box borderStyle="single" width="80%">
      <Text>{text}</Text>
    </Box>
  );
};

export default () => render(<Counter />);
