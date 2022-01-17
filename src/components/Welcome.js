
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const Welcome = (props) => {
  const [quotes, setQuotes] = useState("");

  useEffect(() => {

  }, [quotes]);

  return (
    <Card bg="dark" text="light">

      <div>WELCOME TO POST APPLICATION</div>

    </Card>
  );
};

export default Welcome;
