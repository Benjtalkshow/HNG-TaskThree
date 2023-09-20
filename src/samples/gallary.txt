import React, { useState, useEffect } from "react";
import images from "../components/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";

const categories = [
  "All Pictures",
  "Personality",
  "Bags",
  "Electronics",
  "Sports",
];

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All Pictures");
  const [isLoading, setIsLoading] = useState(false);

  const filteredImages =
    selectedCategory === "All Pictures"
      ? images
      : images.filter((image) => image.tag === selectedCategory);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <SearchBar className="w-full" />
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        {categories.map((category, index) => (
          <button
            key={index}
            type="button"
            className={`text-white border bg-gray-900 focus:bg-red-500 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 ${
              selectedCategory === category ? "bg-red-500" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div className="flex justify-center text-red-500 items-center h-64">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-10 cursor-move">
          {filteredImages.map((image) => (
            <div key={image.id}>
              <div className="bg-red-500 p-2 rounded-br-xl absolute text-white">
                {image.tag}
              </div>
              <img
                className="h-[200px] md:h-[400px] w-[500px] rounded-lg object-cover object-center"
                src={image.url}
                alt={image.tag}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
