import jsPDF from "jspdf";
import React, { useState } from "react";
import toast from "react-hot-toast";
import DownloadButton from "./Downloadbutton";

const TexttoPdf = () => {
  const [textInput, setTextInput] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [filename, setFilename] = useState("text.pdf");
  const [selectedFontSize, setSelectedFontSize] = useState("16");
  const [selectedFont, setSelectedFont] = useState({
    fontFamily: "helvetica",
    fontStyle: "normal",
  });
  const handleTextChange = (e) => {
    const value = e.target.value;
    setTextInput(value);

    if (!isEditingName) {
      const autoName = value.trim().split(" ").at(0)?.slice(0, 10) || "text";
      setTimeout(() => {
        setFilename(`${autoName}.pdf`);
      }, 700);
    }
  };

  const handleFilenameChange = (e) => {
    setFilename(e.target.value);
    setIsEditingName(true);
  };

  const createPDF = (e) => {
    e.preventDefault()
    if (!textInput.trim()) {
      toast.error("No no, You can't do that");
      return;
    }

    const pdf = new jsPDF();
    pdf.setFontSize(selectedFontSize);
    pdf.setFont(selectedFont.fontFamily, selectedFont.fontSize);
    const lines = pdf.splitTextToSize(textInput, 180);
    pdf.text(lines, 10, 20);

    const safeName = filename.trim() || "text";
    pdf.save(`${safeName}`);
  };

  return (
    <div className="md:max-w-3xl mx-auto p-6 text-center font-sans flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Convert Text to PDF
      </h2>

      <form onSubmit={createPDF}>
        <div className="flex justify-between bg-blue-50">
          <input
            type="text"
            value={filename}
            onChange={handleFilenameChange}
            placeholder="Filename"
            className="border border-gray-300 rounded px-4 py-2 w-full  mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={selectedFont.fontFamily}
            onChange={(e) =>
              setSelectedFont((prev) => ({
                ...prev,
                fontFamily: e.target.value,
              }))
            }
            className="border border-gray-300 rounded md:px-3 py-1 focus:outline-none"
          >
            <option value="">Font Family</option>
            {["helvetica", "times", "courier"].map((family) => (
              <option key={family} value={family}>
                {family}
              </option>
            ))}
          </select>

          <select
            value={selectedFont.fontStyle}
            onChange={(e) =>
              setSelectedFont((prev) => ({
                ...prev,
                fontStyle: e.target.value,
              }))
            }
            className="border border-gray-300 rounded md:px-3 w-20 md:w-auto py-1 focus:outline-none"
          >
            <option value="">Font Style</option>
            {["normal", "bold", "italic", "bolditalic"].map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>

          <select
            value={selectedFontSize}
            onChange={(e) => setSelectedFontSize(e.target.value)}
            className="border border-gray-300 rounded md:px-3 md:w-auto w-10 py-1 focus:outline-none"
          >
            <option value="">Font Size</option>
            {Array.from({ length: 15 }, (_, i) => i + 10).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <textarea
          rows={10}
          placeholder="Type or paste your text here"
          style={{
            // fontStyle: selectedFont.fontStyle,
            fontWeight: selectedFont.fontStyle,
            fontFamily: selectedFont.fontFamily,
            fontSize: `${selectedFontSize}px`,
          }}
          className="border border-gray-300 h-[350px] overflow-y-auto rounded p-4 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={textInput}
          onChange={handleTextChange}
        ></textarea>
        <div className="w-fit mx-auto">
        <DownloadButton />
        </div>
      </form>
    </div>
  );
};

export default TexttoPdf;
