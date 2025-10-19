import React, { CSSProperties, useState } from "react";

interface AccordionProps {}

const Accordion: React.FC<AccordionProps> = () => {
  const [isAccordionOpen, setAccordionState] = useState<boolean>(false);

  const styles: { [key: string]: CSSProperties } = {
    accordionContent: {
      maxHeight: isAccordionOpen ? "auto" : "0",
      opacity: isAccordionOpen ? 1 : 0,
      transform: isAccordionOpen ? "translateY(0)" : "translateY(-10px)",
      transition: "all 0.5s ease-in-out",
    },
  };

  return (
    <>
      <h1>Accordion</h1>
      <div
        className="h5 px-4 text-light w-100 bg-dark rounded d-flex justify-content-between align-items-center"
        style={{ height: "50px", cursor: "pointer" }}
        onClick={() => {
          setAccordionState(!isAccordionOpen);
        }}
      >
        <div>Accordion</div>
        <div>{isAccordionOpen ? "▲" : "▼"}</div>
      </div>

      <div
        className="w-100 rounded container bg-light accordion-content"
        style={styles.accordionContent}
      >
        <div className="row pt-4">
          <div className="col bg-success mx-2 rounded p-2">
            The old wooden dock, bleached silver by decades of sun, creaked
            softly with each small wave. A single forgotten coffee cup sat
            upright, a relic from a morning fisherman. The water, a sheet of
            polished slate, reflected the slow-moving clouds, holding the
            afternoon in a silent, peaceful pause.
          </div>
          <div className="col bg-danger mx-2 rounded p-2">
            A sudden clatter from the kitchen cupboard announced the escape of
            the baking soda box. It tumbled end over end, leaving a white,
            powdery trail across the tiles. The cat, previously asleep on the
            windowsill, lifted its head with an air of deep, personal offense.
          </div>
          <div className="col bg-warning mx-2 rounded p-2">
            He found the postcard wedged between two textbooks, a vibrant
            picture of a desert canyon. On the back, in faded ink, were only
            three words: "Wish you were..." The rest was a mystery, leaving him
            to wonder who had sent it, and why they had never finished the
            thought.
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;
