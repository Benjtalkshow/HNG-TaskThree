import "../App.css";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const images = [
    { id: 1, tag: "Sports", url: "https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 2, tag: "Personality", url: "https://images.pexels.com/photos/3810832/pexels-photo-3810832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 3, tag: "Electronics", url: "https://media.istockphoto.com/id/178716575/photo/mobile-devices.jpg?s=612x612&w=0&k=20&c=9YyINgAbcmjfY_HZe-i8FrLUS43-qZh6Sx6raIc_9vQ=" },
    { id: 4, tag: "Personality", url: "https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 5, tag: "Bags", url: "https://images.pexels.com/photos/634538/pexels-photo-634538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 6, tag: "Sports", url: "https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 7, tag: "Bags", url: "https://images.pexels.com/photos/63778/pexels-photo-63778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 8, tag: "Electronics", url: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 9, tag: "Personality", url: "https://images.pexels.com/photos/6142740/pexels-photo-6142740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 10, tag: "Sports", url: "https://images.pexels.com/photos/5247203/pexels-photo-5247203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  ];

const categories = ["All Pictures", "Personal", "Bags", "Electronics", "Sports"];

function Gallery() {
  const [imageList, setImageList] = React.useState(images);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const updatedImageList = [...imageList];
    const [movedItem] = updatedImageList.splice(startIndex, 1);
    updatedImageList.splice(endIndex, 0, movedItem);

    setImageList(updatedImageList);
  };

  return (
    <div>
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        {categories.map((category, index) => (
          <button
            key={index}
            type="button"
            className="text-white border  bg-gray-900  focus:bg-red-500 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3"
          >
            {category}
          </button>
        ))}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-grid" direction="horizontal">
          {(provided) => (
            <div
              className="grid grid-cols-3 md:grid-cols-4 gap-4 px-10"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {imageList.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      key={image.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <h className="bg-red-500 p-2 rounded-br-xl absolute text-white">{image.tag}</h>
                      <img
                        className="h-[400px] w-[500px] rounded-lg object-cover object-center cursor-move"
                        src={image.url}
                        alt={image.tag}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Gallery;
