import "./css/Carousel.css";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Carousel = ({ items, selected, setSelected, renderItem }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 800;
    container.scrollBy({
      left: scrollAmount * direction,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel">
      <IoIosArrowBack className="scroll-arrow" onClick={() => scroll(-1)} />
      <div className="carousel-list-wrapper" ref={scrollRef}>
        <div className="carousel-list">
          {items.map((item) =>
            renderItem({
              item,
              selected: selected?.id === item.id,
              onClick: () => setSelected(item),
            })
          )}
        </div>
      </div>
      <IoIosArrowForward className="scroll-arrow" onClick={() => scroll(1)} />
    </div>
  );
};

export default Carousel;
