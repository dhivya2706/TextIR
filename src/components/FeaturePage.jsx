import React, { useState } from "react";

const FeaturePage = ({ title }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="feature-page">
      <h2>{title}</h2>

      <input
        type="text"
        placeholder="Enter enhancement instructions..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {preview && <img src={preview} alt="preview" className="preview" />}

      <button className="action-btn">Process Image</button>
    </div>
  );
};

export default FeaturePage;