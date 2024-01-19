import { fetchPost, fetchUpdate } from './store/pastry'
import { useDispatch, useSelector } from "react-redux"
import Home from "./pages/Home"
import { useState } from 'react'
import axios from 'axios'
import "./App.css"

// Composant racine
function App() {
  const dispatch = useDispatch()
  const { loggedIn } = useSelector((s) => s.login)
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpdate = () => {
    dispatch(fetchUpdate(1, { quantity: 10 }))
  }

  const handlePost = () => {
    dispatch(fetchPost({ quantity: 10, name: "P" }))
  }
  const handlePostImage = () => {
    dispatch(fetchPostImage({ quantity: 10, name: "P" }))
  }

  // voir l'API game pour remettre à jour les pastries
  const handleRefresh = () => { }

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('pastry', JSON.stringify({ name: "a", quantity: 1 }));
    const credential = { name: "a", quantity: 1 };
    try {
      const res = await axios.post(`http://localhost:3001/api/pastry`, formData, {
        withCredentials: true,
        headers: { "content-type": "multipart/form-data" }
      });
      console.log(res.data);
    } catch (error) {
      console.error("Erreur lors de l'appel API :", error);
      // Gérer l'erreur côté client
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <Home />
      {loggedIn && (
        <>
          <p><button onClick={handleUpdate}>update</button></p>
          <p><button onClick={handlePost}>post</button></p>
          <p><button onClick={handlePostImage}>post with image</button></p>
          <p><button onClick={handleRefresh}>refresh API data</button></p>
          <input
            type="file" onChange={handleFileChange}
            accept="image/jpeg, image/jpg, image/png"
          />
          <button onClick={handleUpload}>Upload</button>

          <img
            src="http://localhost:3001/uploads/images/1705623642576.jpeg"
            alt="Description de l'image"
          />
        </>

      )}
    </>
  );
}

export default App;