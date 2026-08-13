import { useState } from 'react'
function APP(){
  const [prompt,setPrompt]=useState("");
  const [image,setImage]=useState("");
  const [loading,setLoading]=useState();
  const [error,setError]=useState("");
  //function to generate image
  const generateImage=async()=>{
    if(!prompt.trim()){
      setError("Please enter a Prompt");
      return;
    }
    setLoading(true);
    setError("");
    setImage("");
    try{
      const response=await fetch("http://localhost:5000/generate-image",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ prompt })
      });
      const data=await response.json();
      setImage(data.image);
    } catch (err) {
      setError("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };
  //displayed on the webpage
  return (
    <div>
      <h1>Chanel Generator</h1>
      <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Describe the image you want to generate..."/>
        <button onClick={generateImage}>Generate Image</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{color:"red"}}>{error}</p>}
        {image && <img src={image} alt="Generated" />}
    </div>
);
  }
export default App;
