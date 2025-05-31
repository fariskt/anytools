import { BrowserRouter, Route, Router, Routes } from "react-router";
import "./App.css";
import ImagetoPdf from "./components/ImagetoPdf";
import Tools from "./pages/Tools";
import Navbar from "./components/Navbar";
import TexttoPdf from "./components/TexttoPdf";
import DocxToPdf from "./components/Docxtopdf";

function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar/>
        <Routes>
          <Route path="/" index element={<Tools />} />
          <Route path="/images-to-pdf" element={<ImagetoPdf />} />
          <Route path="/text-to-pdf" element={<TexttoPdf />} />
          <Route path="/docx-to-pdf" element={<DocxToPdf />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
