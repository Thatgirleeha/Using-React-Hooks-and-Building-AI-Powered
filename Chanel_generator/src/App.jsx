import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to generate image
  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a Prompt");
      return;
    }

    setLoading(true);
    setError("");
    setImage("");

    try {
      const response = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();

      if (!data.image) {
        throw new Error("No image was returned");
      }

      setImage(data.image);
    } catch (err) {
      console.error(err);
      setError("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  // Displayed on the webpage
  return (
    <div className="app">
      <div className="card">
        <h1>Image Generator</h1>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
        />

        <button onClick={generateImage} disabled={loading}>
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {loading && <p>Loading...</p>}

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {image && (
          <div className="preview">
            <img src={image} alt="Generated" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;