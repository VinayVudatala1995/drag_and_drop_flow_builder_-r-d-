import React from "react";
import styled from "@emotion/styled";

// Mesh grid
export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-repeat: repeat;
  > * {
    height: 100%;
    min-height: 100%;
    width: 100%;
  }
 
   
`;

// background-image: radial-gradient(rgb(198, 208, 225) 1px, transparent 0px);
// background-position-x: -19px;
// background-position-y: -19px;
// background-size: 40px 40px;
// background-attachment: initial;
// background-origin: initial;
// background-clip: initial;
// background-color: rgb(244, 245, 248);,
export const DiagramCanvas = (props : any) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
};
