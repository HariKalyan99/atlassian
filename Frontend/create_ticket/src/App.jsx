import React, { useState, useEffect, useRef } from "react";
import HelpIcon from "@mui/icons-material/Help";
import EditRoadIcon from '@mui/icons-material/EditRoad';
import SwipeVerticalIcon from '@mui/icons-material/SwipeVertical';
import { IconButton, Tooltip } from "@mui/material";
import ContactModal from "./components/ContactModel"; // Import the separate modal component

function App() {
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const menuRef = useRef(null); // Ref for the Menu Icon
  const isClicked = useRef(false);
  const [isLeft, setIsLeft] = useState(false);
  const [open, setOpen] = useState(false);
  const coords = useRef({ startX: 0, startY: 0 });

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    // Set initial position (right-center)
    box.style.left = `${container.offsetWidth - box.offsetWidth}px`;
    box.style.top = `${(container.offsetHeight - box.offsetHeight) / 2}px`;

    const onMouseDown = (e) => {
      // Allow dragging ONLY if clicking the MenuIcon
      if (!menuRef.current.contains(e.target)) return;

      isClicked.current = true;
      coords.current.startX = e.clientX - box.offsetLeft;
      coords.current.startY = e.clientY - box.offsetTop;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      const { offsetWidth: containerWidth } = container;
      const { offsetWidth: boxWidth, offsetLeft: boxLeft } = box;
      const middle = containerWidth / 2;

      if (boxLeft < middle) {
        box.style.left = "0px";
        setIsLeft(true);
      } else {
        box.style.left = `${containerWidth - boxWidth}px`;
        setIsLeft(false);
      }
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      const { offsetWidth: containerWidth, offsetHeight: containerHeight } =
        container;
      const { offsetWidth: boxWidth, offsetHeight: boxHeight } = box;

      const nextX = e.clientX - coords.current.startX;
      const nextY = e.clientY - coords.current.startY;

      if (nextX >= 0 && nextX <= containerWidth - boxWidth) {
        box.style.left = `${nextX}px`;
      }
      if (nextY >= 0 && nextY <= containerHeight - boxHeight) {
        box.style.top = `${nextY}px`;
      }
    };

    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    return () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };
  }, []);

  return (
    <main>
      <div ref={containerRef} className="container_class">
        <div
          ref={boxRef}
          className={`box ${isLeft ? "left-side" : "right-side"} shadow-xl !rounded-3xl`}
        >
          <IconButton onClick={() => setOpen(true)}>
            <HelpIcon className="text-[white]" />
          </IconButton>
          <p className="text-[white] w-auto">Support?</p>
          <Tooltip title="Click and drag" followCursor>
            <IconButton ref={menuRef}>
              <SwipeVerticalIcon className="text-[white]" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Use ContactModal component */}
      <ContactModal open={open} handleClose={() => setOpen(false)} />

    </main>
  );
}

export default App;
