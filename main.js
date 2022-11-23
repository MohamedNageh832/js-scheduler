const container = document.querySelector(".container");

const items = document.querySelectorAll(".item");
const resizers = document.querySelectorAll(".resizer");

let mouseOffset = { x: 0, y: 0 };
let isMouseDown = false;
let activeResizer = false;
let currentItem = null;

function onMouseDown(e, item) {
  isMouseDown = true;
  currentItem = item;

  mouseOffset.x = item.offsetLeft - e.clientX;
  mouseOffset.y = item.offsetTop - e.clientY;

  item.style.background = "#919fe4";

  console.log(mouseOffset);
}

function onMouseMove(e) {
  e.preventDefault();

  if (activeResizer) {
    const mouseYpos = e.clientY - activeResizer.parentElement.offsetTop;
    const parentSpan = Math.floor(mouseYpos / 42);
    const newHeight = parentSpan === 0 ? 42 : parentSpan * 42;
    activeResizer.parentElement.style.height = `${newHeight}px`;
  }

  if (!isMouseDown) return;

  //   const pointerXPos = e.clientX - container.offsetLeft;
  //   const itemGridColumn = Math.ceil(pointerXPos / 275);
  //   currentItem.style.gridRow = itemGridRow;

  const mouseYPos = e.clientY + mouseOffset.y;
  const heightSpan = Math.floor(mouseYPos / 42);

  currentItem.style.top = `${44 * heightSpan}px`;
}

function onMouseUp(e, item) {
  if (item) item.style.background = "#2d4adb";

  activeResizer = false;
  isMouseDown = false;
}

for (let i = 0; i < items.length; i++) {
  const item = items[i];

  item.addEventListener("mousedown", (e) => onMouseDown(e, item));
  item.addEventListener("mousemove", (e) => onMouseMove(e, item));
  item.addEventListener("mouseup", (e) => onMouseUp(e, item));
}

for (let i = 0; i < resizers.length; i++) {
  const resizer = resizers[i];

  resizer.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    activeResizer = resizer;
  });
}

container.addEventListener("mousemove", (e) => onMouseMove(e, currentItem));
container.addEventListener("mouseup", (e) => onMouseUp(e, currentItem));
