import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";

const PaginationComponent = () => {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target));
  };

  const renderPageNumbers = pages.map((item) => {
    return (
      <button
        key={item}
        onClick={handleClick}
        className="border-4 p-5 border-gray-500"
      >
        {item}
      </button>
    );
  });

  useEffect(() => {
    fetch("https://naszsklep-api.vercel.app/api/products?take=100&offset=0")
      .then((Response) => Response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <>
      <ul className="flex justify-center">{renderPageNumbers}</ul>
    </>
  );
};

export default PaginationComponent;
