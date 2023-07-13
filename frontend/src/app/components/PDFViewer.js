import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

const PDFViewer = ({ url }) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe src={url} title="PDF Viewer" width="100%" height="100%" />
    </div>
  );
};

export default PDFViewer;
