import { fetchPost, fetchUpdate } from './store/pastry'
import { useDispatch, useSelector } from "react-redux"
import Home from "./pages/Home"
import "./App.css"

// Composant racine
function App() {
  const dispatch = useDispatch()
  const { loggedIn } = useSelector((s) => s.login)

  const handleUpdate = () => {
    dispatch(fetchUpdate(1, { quantity: 10 }))
  }

  const handlePost = () => {
    dispatch(fetchPost({ quantity: 10, name: "P" }))
  }
  const handlePostImage = () => {
    dispatch(fetchPostImage({ quantity: 10, name: "P" }))
  }
  const handleRefresh = () => { }
  return (
    <>
      <Home />
      {loggedIn && (
        <>
          <p><button onClick={handleUpdate}>update</button></p>
          <p><button onClick={handlePost}>post</button></p>
          <p><button onClick={handlePostImage}>post with image</button></p>
          <p><button onClick={handleRefresh}>refresh API data</button></p>
        </>
      )}

    </>
  );
}

export default App;