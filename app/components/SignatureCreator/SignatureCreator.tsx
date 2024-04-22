"use client";
import { ChangeEvent, useRef, useState } from "react";
import Button from "../Button/Button";

const SignatureCreator = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isCanvasPainted, setisCanvasPainted] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000");
  const [selectLineWidth, setLineWidth] = useState(2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    draw(event);
    setIsDrawing(true);
    setisCanvasPainted(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return null;
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    context.lineWidth = selectLineWidth;

    context.lineCap = "round";
    context.strokeStyle = selectedColor;
    context.fillStyle = "rgba(255, 255, 255, 0.5)";

    context.lineTo(offsetX, offsetY);
    context.stroke();
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.beginPath(); // End the current path
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setisCanvasPainted(false);
  };

  const downloadCanvas = (): void => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // Set canvas background to transparent
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "rgba(255, 255, 255, 0.5)"; // Set background to transparent

    // Convert canvas content to data URL
    const dataUrl = canvas.toDataURL("image/png");
    // Create a link element
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "canvas_image.png"; // Set the download attribute
    link.click();
  };

  return (
    <div className="flex flex-col p-3 mt-2 items-center justify-center">
      <canvas
        className="border border-1 rounded border-gray-400"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        width={600}
        height={300}
      />
      <div className="flex flex-col pt-4 items-center justify-center">
        <div className="flex flex-row">
          <div className="flex flex-col p-2 items-center justify-center">
            <label
              htmlFor="default-range"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Color
            </label>
            <input
              type="color"
              className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
              id="hs-color-input"
              value={selectedColor}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSelectedColor(e.target.value)
              }
              title="Choose your color"
            />
          </div>
          <div className="flex flex-col p-2 items-center justify-center">
            <label
              htmlFor="default-range"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Width
            </label>
            <input
              id="width-range"
              type="range"
              max={40}
              min={2}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLineWidth(Number(e.target.value))
              }
              value={selectLineWidth}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
        </div>
        <div className="flex flex-row m-2">
          <Button
            className="border border-1 p-2 mr-2 border-blue-300 rounded"
            onClick={clearCanvas}
            disabled={!isCanvasPainted}
            title="Clear and draw again"
          />
          <Button
            className="p-2 mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => downloadCanvas()}
            disabled={!isCanvasPainted}
            title="Download"
          />
        </div>
      </div>
    </div>
  );
};
export default SignatureCreator;
