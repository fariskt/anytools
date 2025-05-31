import React, { useEffect, useState } from "react";
import AxiosInstance from "../../lib/axiosInstance";
import toast from "react-hot-toast";
const DocxToPdf = () => {
  const [credits, setCredits] = useState(0);
  useEffect(() => {
    const getUserCredits = async () => {
      try {
        const res = await AxiosInstance.get("/credits");
        setCredits(res.data.credits || 0);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
    getUserCredits();
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await AxiosInstance.post(
        "/convert/docx-to-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.url) {
        const fileResponse = await fetch(data.url);
        const blob = await fileResponse.blob();

        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = file.name.replace(/\.[^/.]+$/, "") + ".pdf";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        toast.error("No download URL received.");
      }
    } catch (err) {
      toast.error("No credits, come back tommorrow");
      console.error(err);
    }
  };

  return (
    <div className="md:mt-0 mt-20">
      <h2 className="text-right mr-10 absolute md:static top-8 right-0">
        Credits left : {credits}
      </h2>
      <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">
        Convert Docx to PDF
      </h2>
      <div className="md:max-w-md md:mx-auto mt-10 px-10 mx-4 py-10 border rounded shadow">
        <input type="file" accept=".docx" onChange={handleFileUpload} />
      </div>
      <div className="text-sm  text-yellow-800 bg-yellow-200 px-4 py-2 rounded-md mb-4 w-fit md:mx-auto mx-2 relative top-44 md:top-72">
        <strong className="text-yellow-800">Warning:</strong> Files uploaded here are processed by a
        third-party service (CloudConvert).
        <span className="block mt-1">
          <p>
            Do not upload documents containing sensitive, personal, or
            confidential information.
          </p>
        </span>
      </div>
    </div>
  );
};

export default DocxToPdf;
