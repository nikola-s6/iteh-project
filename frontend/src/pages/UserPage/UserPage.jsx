import Home from "../Home/Home"
import { React, useState, useEffect } from "react"
import { Avatar, Button, Card } from "antd"
import Modal from "react-modal"
import AddPostModal from "../../components/AddPostModal"
import axios from "axios"
import PostList from "../../components/PostList"

function UserPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [posts, setPosts] = useState([])

  const userText = sessionStorage.getItem("logged_user")
  const user = JSON.parse(userText)

  useEffect(() => {
    async function fetchData() {
      const response = await getPosts(user.id)
      setPosts(response.data.data.posts)
      console.log(response.data.data.posts)
    }
    fetchData()
  }, [])

  if (posts.length == 0) {
    return <h1>loading</h1>
  }

  return (
    <div>
      <div style={{ display: "block", justifyContent: "center" }}>
        <div className="header" style={{ marginTop: "2%", marginRight: "25%", marginLeft: "35%" }}>
          <Card.Meta
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10%" }}
            avatar={<Avatar src={sessionStorage.getItem("profile_image")} style={{ width: "15vh", height: "15vh" }} />}
            title={user.username}
          />
        </div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          appElement={document.getElementById("root")}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              color: "#000",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "75%",
              height: "75%",
              backgroundColor: "#fff",
              padding: "2rem",
            },
          }}
        >
          <AddPostModal avatar={sessionStorage.getItem("profile_image")} username={"neko"} />
        </Modal>
        <br />
        <br />
        <br />
        <div style={{ marginRight: "25%", marginLeft: "35%" }}>
          <PostList posts={posts}></PostList>
        </div>
      </div>
      <div style={{ position: "absolute", top: 20, right: 15 }}>
        <button onClick={() => setModalOpen(true)} style={{ width: "20vh", height: "15vh" }} className="button">
          Add new post
        </button>
      </div>
    </div>
  )
}

async function getPosts(id) {
  var config = {
    method: "get",
    url: "http://127.0.0.1:8000/api/user/" + id,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("auth_key"),
    },
  }

  const response = await axios(config)
  console.log(response)
  return response
}

export default UserPage
