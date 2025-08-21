import React from "react";
import { Button } from "flowbite-react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handleClick = (direction) => {
    if (!onPageChange) return;
    const newPage = direction === "next" ? page + 1 : page - 1;
    onPageChange(newPage);
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      <Button
        color="gray"
        onClick={() => handleClick("prev")}
        disabled={Number(page) <= 1}
        className="w-28"
      >
        Previous
      </Button>
      <p className="!pt-2 !mx-2">
        Page {page} of {totalPages}
      </p>
      <Button
        onClick={() => handleClick("next")}
        disabled={Number(page) >= totalPages}
        className="w-28 !bg-transparent text-gray-500 border-1 border-gray-400"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
