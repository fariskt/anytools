import React, { useState } from "react";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
import DownloadButton from "./Downloadbutton";

const ImageToPDF = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImageFiles((prev) => [...prev, evt.target.result]);
        setImagePreviews((prev) => [...prev, evt.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const createPDF = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      toast.error("NO, no you can't do that");
      return;
    }
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < imageFiles.length; i++) {
      const imgData = imageFiles[i];
      const img = new Image();
      img.src = imgData;

      await new Promise((resolve) => {
        img.onload = () => {
          const pxToMm = (px) => (px * 25.4) / 96;
          let mmWidth = pxToMm(img.width);
          let mmHeight = pxToMm(img.height);

          const scale = Math.min(pageWidth / mmWidth, pageHeight / mmHeight, 1);
          mmWidth *= scale;
          mmHeight *= scale;

          const x = (pageWidth - mmWidth) / 2;
          const y = (pageHeight - mmHeight) / 2;

          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, "JPEG", x, y, mmWidth, mmHeight);
          resolve();
        };
      });
    }

    pdf.save("images.pdf");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-center font-sans flex flex-col justify-center mt-24">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Convert Images to PDF
      </h2>
      <form onSubmit={createPDF}>
        <div
          onDrop={handleDrop}
          onDragOver={handleDrag}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          className={`border-4 mx-auto  border-dashed rounded-lg p-10 mb-4 transition ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <p className="text-gray-500">Drag & drop images here</p>
          <p className="text-sm text-gray-400">or</p>
          <div className="flex justify-center w-fit mx-auto">
            <input
              type="file"
              accept="image/*"
              multiple
              className="mt-3 w-full cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {imagePreviews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className="w-full h-32 object-cover rounded shadow"
              />
            ))}
          </div>
        )}
        <div className="w-fit mx-auto">
          <DownloadButton />
        </div>
      </form>
    </div>
  );
};

export default ImageToPDF;
