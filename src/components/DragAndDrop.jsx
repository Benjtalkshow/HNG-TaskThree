import AOS from "aos";
import "aos/dist/aos.css"; /* Animation on scroll */
import React, { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const filterImages = (images, searchTerm, selectedCategory) => {
  return images.filter((image) => {
    const isMatchingSelectedCategory =
      selectedCategory === "All Category" || image.category === selectedCategory;
    return isMatchingSelectedCategory;
  });
};

const DragAndDrop = ({
  searchTerm,
  setImages,
  selectedCategory,
  images,
  loading,
}) => {
  const filteredImages = filterImages(images, searchTerm, selectedCategory);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = [...filteredImages];
    const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(reorderedImages);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-gray-900 text-5xl"
          />
        </div>
      ) : (
        <>
          {images.length > 0 ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="image-DragAndDrop" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="image-grid-container mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-10 cursor-move"
                  >
                    {filteredImages.map((image, index) => (
                      <Draggable
                        key={image.id}
                        draggableId={image.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`relative image-container ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="DragAndDrop-image h-[200px] md:h-[400px] w-[500px] rounded-lg object-cover object-center"
                              data-aos="fade-up"
                            />
                            <div className="tag_name bg-red-500 top-0 p-2 rounded-br-xl z-10 absolute text-white text-[8px] sm:text-sm">
                              {image.alt}
                            </div>{" "}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="image-not-found text-red-500 py-10 text-center font-bold w-full">
              Image not found for "{searchTerm}".
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DragAndDrop;
