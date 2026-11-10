import React, { useEffect, useState } from "react";
import AxiosInstance from "../../lib/axiosInstance";
import toast from "react-hot-toast";
import Loader from "./Loading";
import DownloadButton from "./Downloadbutton";

const DocxToPdf = () => {
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleUploadFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

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
        downloadLink.download =
          selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        toast.error("No download URL received.");
      }
    } catch (err) {
      toast.error("No credits, come back tomorrow.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:mt-0 mt-20">
      {isLoading && <Loader />}
      <h2 className="text-right mr-10 absolute md:static top-8 right-0">
        Credits left : {credits}
      </h2>
      <h2 className="text-3xl text-center font-bold mb-6 text-gray-800">
        Convert Docx to PDF
      </h2>
      <div className="md:max-w-md md:mx-auto mt-10 ">
        <form
          onSubmit={handleFileSubmit}
          className="flex flex-col items-center gap-4"
        >
          <div className="border rounded shadow px-10 mx-4 py-10 ">
            <input
              type="file"
              accept=".docx"
              onChange={handleUploadFileChange}
            />
          </div>
          <DownloadButton isLoading={isLoading}/>
        </form>
      </div>
      <div className="text-sm  text-yellow-800 bg-yellow-200 px-4 py-2 rounded-md mb-4 w-fit md:mx-auto mx-2 relative top-44 md:top-56">
        <strong className="text-yellow-800">Warning:</strong> Files uploaded
        here are processed by a third-party service (CloudConvert).
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
