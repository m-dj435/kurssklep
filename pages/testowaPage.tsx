import React, { useState } from "react";
import Image from "next/image";

function MyButton({ count, onClick }) {
  return (
    <>
      <button onClick={onClick} className="border-2 bg-red-300">
        you clicked {count} times
      </button>
    </>
  );
}

const user = {
  name: "Ramen",
  imageUrl: "https://i.imgur.com/HT0UPeN.jpeg",
};

function MyApp() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Yo! This is my APp</h1>
      <p>{user.name}</p>
      <Image
        className="awatar"
        src={user.imageUrl}
        alt={"photo of best creature"}
        layout="fixed"
        width={800}
        height={500}
      />
      <br />
      <MyButton count={count} onClick={handleClick} />
      <br />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

export default MyApp;
