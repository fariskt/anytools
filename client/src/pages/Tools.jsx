import React, { useState } from "react";
import { Link } from "react-router-dom";

const Tools = () => {
  const [isHovered, setIsHovered] = useState(null);
  const tools = [
    {
      id: 1,
      tool: "Image to PDF",
      link: "/images-to-pdf",
      desc: "Convert multiple images into a single PDF",
    },
    {
      id: 2,
      tool: "Text to PDF",
      link: "/text-to-pdf",
      desc: "Write and download your text as a PDF",
    },
    {
      id: 3,
      tool: "Docx to PDF",
      link: "/docx-to-pdf",
      desc: "Convert and download your Docx as a PDF",
    },
  ];
  return (
    <div className="max-w-4xl mx-auto p-6 text-center font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {tools.map((item) => (
          <div
            className="flex flex-col items-center gap-3 text-center"
            key={item.id}
          >
            <Link to={item.link}>
            <div
              onMouseEnter={() => setIsHovered(item.id)}
              onMouseLeave={() => {
                setTimeout(() => {
                  setIsHovered(null);
                }, 500);
              }}
              className="relative w-[250px] h-[154px] flex items-center justify-center rounded-2xl overflow-hidden bg-[#93accf] transition-transform duration-300 hover:scale-105 shadow-xl"
            >
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255))",
                  animation: `spinSlow ${
                    isHovered === item.id ? "2s" : "10s"
                  } linear infinite`,
                }}
                className="absolute w-[100px] h-[180%] z-0 opacity-80 blur-sm"
              />
              <div className="absolute inset-[5px] bg-[#0041b1] rounded-[15px] z-10" />
              <h2 className="text-white text-2xl font-semibold z-20 relative">
                {item.tool}
              </h2>
            </div>
            <p className="text-gray-800 text-sm max-w-[250px] font-medium mt-2">{item.desc}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
