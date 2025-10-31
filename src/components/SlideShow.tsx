import React, { useEffect, useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTU2MzZ8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nfGVufDB8fHx8MTc2MTk0MTMwNnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTU2MzZ8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nfGVufDB8fHx8MTc2MTk0MTMwNnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1519996409144-56c88c9aa612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTU2MzZ8MHwxfHNlYXJjaHw2NXx8Zm9vZHxlbnwwfHx8fDE3NjE5NDE0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTU2MzZ8MHwxfHNlYXJjaHw2N3x8Zm9vZHxlbnwwfHx8fDE3NjE5NDE0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1577303935007-0d306ee638cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTU2MzZ8MHwxfHNlYXJjaHw2OXx8Zm9vZHxlbnwwfHx8fDE3NjE5NDE0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1573164574511-73c773193279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTU2MzZ8MHwxfHNlYXJjaHw4MXx8YnVzaW5lc3N8ZW58MHx8fHwxNzYxOTQxNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
];

const SlideShow: React.FC = () => {
  const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);

  const selectImage = (index: number) => {
    setCurrentImageIdx(index % IMAGES.length);
  };

  useEffect(() => {
    console.log(IMAGES.length);
    const timer = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentImageIdx]);
  return (
    <>
      <h2>Welcome to slide show</h2>
      <div className="container">
        <div className="d-flex justify-content-center mt-4 pt-4">
          <img
            src={IMAGES[currentImageIdx]}
            alt="Current Image"
            width="700"
            height="400"
          />
        </div>
        <div className="d-flex justify-content-around mt-3">
          <button
            disabled={currentImageIdx <= 0}
            type="button"
            className="btn btn-dark"
            onClick={() => {
              selectImage(currentImageIdx - 1);
            }}
          >
            Prev
          </button>
          <button
            disabled={currentImageIdx >= IMAGES.length}
            type="button"
            className="btn btn-dark"
            onClick={() => {
              selectImage(currentImageIdx + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default SlideShow;
