import React, { useState, useEffect } from "react";
import images from "../components/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
// Import react-beautiful-dnd components
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  // Use state to store the images array
  const [imageList, setImageList] = useState(images);

  const filteredImages =
    selectedCategory === "All Pictures"
      ? imageList
      : imageList.filter((image) => image.tag === selectedCategory);

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

  // Define a function to handle drag end
  const handleDragEnd = (result) => {
    // If there is no destination, do nothing
    if (!result.destination) return;
    // Get the source and destination indexes
    const { source, destination } = result;
    // Make a copy of the images array
    const newImageList = [...imageList];
    // Remove the dragged item from the source index
    const [draggedItem] = newImageList.splice(source.index, 1);
    // Insert the dragged item at the destination index
    newImageList.splice(destination.index, 0, draggedItem);
    // Update the state with the new array
    setImageList(newImageList);
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
        // Wrap the grid with DragDropContext and provide onDragEnd prop
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Wrap the grid with Droppable and provide droppableId prop */}
          <Droppable droppableId="image-grid">
            {/* Wrap the content of Droppable with a function */}
            {(provided, snapshot) => (
              // Return a div element with required props and custom styles
              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-10 cursor-move"
                {...provided.droppableProps}
                ref={provided.innerRef}
                // Apply some styles based on snapshot.isDraggingOver
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? "rgba(255, 0, 0, 0.1)"
                    : "transparent",
                }}
              >
                {filteredImages.map((image, index) => (
                  // Wrap each image with Draggable and provide draggableId and index props
                  <Draggable
                    key={image.id}
                    draggableId={image.id}
                    index={index}
                  >
                    {/* Wrap the content of Draggable with a function */}
                    {(provided) => (
                      // Return a div element with required props and custom styles
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        // Apply some styles based on provided.isDragging
                        style={{
                          ...provided.draggableProps.style,
                          opacity: provided.isDragging ? 0.5 : 1,
                        }}
                      >
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
                      </div>
                    )}
                  </Draggable>
                ))}
                {/* Add a placeholder for the Droppable component */}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default Gallery;
