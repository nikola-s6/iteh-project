import Home from "../Home/Home"
import { React, useState, useEffect } from "react"
import { Avatar, Button, Card } from "antd"
import Modal from "react-modal"
import AddPostModal from "../../components/AddPostModal"
import axios from "axios"
import PostList from "../../components/PostList"
import { AiFillPlusCircle } from "react-icons/ai"
import { IconContext } from "react-icons"

function UserPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [posts, setPosts] = useState([])

  const userText = sessionStorage.getItem("logged_user")
  const user = JSON.parse(userText)
  // console.log(user)

  useEffect(() => {
    async function fetchData() {
      const response = await getPosts(user.id)
      setPosts(response.data.data.posts)
      // console.log(response.data.data.posts)
    }
    fetchData()
  }, [])

  const showPosts = () => {
    if (posts.length != 0) {
      return (
        <div style={{ marginRight: "25%", marginLeft: "35%" }}>
          <PostList posts={posts}></PostList>
        </div>
      )
    }
    return <></>
  }

  function appendPost(post) {
    let list = posts
    list.unshift(post) //addin to first place
    setPosts(list)
  }
  if (posts.length == 0) {
    console.log("usao")
    return <></>
  }
  function closeModal() {
    setModalOpen(false)
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
          <AddPostModal user={user} appendPost={appendPost} closeModal={closeModal} />
        </Modal>
        <br />
        <br />
        <br />
        {showPosts()}
      </div>
      <div style={{ position: "fixed", top: "90%", right: "3%" }}>
        <button onClick={() => setModalOpen(true)}>
          <IconContext.Provider
            value={{ color: "rgba(163, 229, 190, 0.989)", size: "3vw", position: "absolute", top: "90%" }}
          >
            <div>
              <AiFillPlusCircle></AiFillPlusCircle>
            </div>
          </IconContext.Provider>
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
