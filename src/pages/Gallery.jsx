import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DragAndDrop from '../components/DragAndDrop';

const DragAndDropPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All'); // Initialize with 'All' or a default tag
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImagesByTag = (tag, searchTerm) => {
    setLoading(true);
    const API_KEY = 'mmyqqQoTTmiCejdNnCaeqDUoYO0vOoL0TPPBSxkfOkTKS9mPzN9JTIDH';
    let API_URL = `https://api.pexels.com/v1/search?query=${tag}&per_page=36&page=10`;
    if (searchTerm) {
      API_URL = `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=50&pagee=20`;
    }
    fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const imagesWithTags = data.photos.map((photo) => ({
          id: photo.id.toString(),
          src: photo.src.large,
          alt: photo.photographer,
        }));
        setImages(imagesWithTags);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    fetchImagesByTag(selectedTag, searchTerm);
  };

  useEffect(() => {
    fetchImagesByTag(selectedTag, searchTerm);
  }, [selectedTag, searchTerm]);

  return (
    <div>
      <Navbar setSearchTerm={setSearchTerm} onSearch={handleSearch} />
 
<div className="mb-[4rem]"></div>

      <DragAndDrop
        searchTerm={searchTerm}
        setImages={setImages}
        selectedTags={selectedTags}
        selectedTag={selectedTag}
        images={images}
        loading={loading}
      />
    </div>
  );
};

export default DragAndDropPage;
