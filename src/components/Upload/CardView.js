import React from "react";
import "../styles/box.css";
import { Card } from "react-bootstrap";

const CardView = () => {

  const cardInfo = [
    {
      image: "https://i.insider.com/50f967f56bb3f7830a000019",
      title: "Lebron James",
      text: "THE GOAT",
    },
    {
      image:
        "https://cdn.vox-cdn.com/thumbor/M1qLla2h-V_2yV_Z4nF_NHH_tjA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18286450/usa_today_12495932.jpg",
      title: "Alex Caruso",
      text: "THE TRUE GOAT",
    },
   
  ];

  const renderCard = (card, index) => {

    return (
      <div>
      <Card style={{ width: "18rem" }} key={index} className="box">
        <Card.Img variant="top" src="holder.js/100px180" src={card.image} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.text}</Card.Text>
        </Card.Body>
      </Card>
      </div>
    );
  };

  return <div className="grid">{cardInfo.map(renderCard)}</div>;
};

export default CardView;