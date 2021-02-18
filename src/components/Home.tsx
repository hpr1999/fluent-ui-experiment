import React from "react";
import Container from "./Container";

export default function Home() {
  return (
    <Container depth={1}>
      <Container depth={2}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum fuga facere
        nemo cumque tenetur, numquam tempora vel sit reiciendis eaque.
        <Container depth={3}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis enim
        cumque reiciendis fugiat ab magni in eos deleniti necessitatibus facere?
      </Container>
      </Container>
      
    </Container>
  );
}
