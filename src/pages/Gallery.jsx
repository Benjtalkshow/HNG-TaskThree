import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DragAndDrop from "../components/DragAndDrop";
import LogoutButton from "../components/Logout";

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "All Category",
    "Fashion",
    "Flags",
    "Technology",
    "Sports",
  ];

  const filterImages = (images, selectedCategory) => {
    return images.filter((image) => {
      return (
        selectedCategory === "All Category" || image.category === selectedCategory
      );
    });
  };

  const fetchImagesByCategory = (category, searchTerm) => {
    setLoading(true);
    const API_KEY = "mmyqqQoTTmiCejdNnCaeqDUoYO0vOoL0TPPBSxkfOkTKS9mPzN9JTIDH";
    let API_URL = `https://api.pexels.com/v1/search?query=${category}&per_page=40&page=12`;
    if (searchTerm) {
      API_URL = `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=50&page=20`;
    }
    fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const imagesWithCategories = data.photos.map((photo) => ({
          id: photo.id.toString(),
          src: photo.src.large,
          alt: photo.photographer,
          category: category,
        }));
        setImages(imagesWithCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchImagesByCategory(category, searchTerm);
  };

  const handleSearch = () => {
    fetchImagesByCategory(selectedCategory, searchTerm);
  };

  useEffect(() => {
    fetchImagesByCategory(selectedCategory, searchTerm);
  }, [selectedCategory, searchTerm]);

  return (
    <div>
      <LogoutButton />
      <Navbar setSearchTerm={setSearchTerm} onSearch={handleSearch} />

      <div className="mb-[1rem]"></div>

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

      <DragAndDrop
        searchTerm={searchTerm}
        setImages={setImages}
        selectedCategory={selectedCategory}
        images={images}
        loading={loading}
      />
    </div>
  );
};

export default Gallery;
