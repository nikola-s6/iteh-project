import { React, useEffect, useState } from "react"
import { Avatar, Button, Card } from "antd"
import { HeartOutlined, MessageOutlined, DeleteOutlined } from "@ant-design/icons"
import "./Post.css"
import Modal from "react-modal"
import PostModal from "./PostModal"
import axios from "axios"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
library.add(faHeartRegular, faHeartSolid)

const Post = ({ post }) => {
  let navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [liked, setLiked] = useState(null)
  const [likeNum, setLikeNum] = useState(post.likes.length)
  const [likes, setLikes] = useState(post.likes)
  const loggedUser = JSON.parse(sessionStorage.getItem("logged_user"))

  useEffect(() => {
    function check() {
      var likers = []
      var likersID = []
      likes.forEach((element) => {
        likers.push(element.user)
        likersID.push(element.user.id)
      })
      if (likersID.includes(loggedUser.id)) {
        setLiked(true)
        console.log("sadrzi")
      } else {
        setLiked(false)
      }
    }
    check()
  }, [])

  if (liked == null) {
    return <></>
  }

  function picture() {
    if (post.image === null) {
      return <></>
    } else {
      return (
        <img
          style={{ width: "100%", borderRadius: "2%", border: "solid" }}
          src={`http://127.0.0.1:8000${post.image.url}`}
        ></img>
      )
    }
  }

  const deleteButton = () => {
    const userText = sessionStorage.getItem("logged_user")
    const user = JSON.parse(userText)

    if (user.id === post.user.id) {
      return <Button onClick={handleDelete} style={{ marginTop: "8px" }} type="link" icon={<DeleteOutlined />} />
    }
  }

  async function handleDelete() {
    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/api/post/21/likes",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("auth_key"),
      },
    }
    const response = await axios(config)
  }

  async function handleLike() {
    if (!liked) {
      //like
      var config = {
        method: "post",
        url: `http://127.0.0.1:8000/api/post/${post.id}/likes`,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("auth_key"),
        },
      }
      var response = await axios(config)
      if (response.data.message == "post liked") {
        setLiked(true)
        setLikeNum(likeNum + 1)
      } else {
        console.log(response)
      }
    } else {
      //unlike
      var config = {
        method: "delete",
        url: `http://127.0.0.1:8000/api/post/${post.id}/likes/` + loggedUser.id,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("auth_key"),
        },
      }

      var response = await axios(config)
      if (response.data.message == "post unliked") {
        setLiked(false)
        setLikeNum(likeNum - 1)
      } else {
        console.log(response)
      }
    }
  }

  function goToProfilePage() {
    navigate(`/profile/${post.user.id}`)
  }

  return (
    <Card
      style={{ width: "100%", marginBottom: "16px", border: "solid" }}
      actions={[
        <div
          onClick={handleLike}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}
        >
          <FontAwesomeIcon color="red" icon={liked ? faHeartSolid : faHeartRegular} />
          <p>{likeNum} likes</p>
        </div>,
        <div
          onClick={() => setModalOpen(true)}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}
        >
          <MessageOutlined key="message" />
          <p>comments</p>
        </div>,
        deleteButton(),
      ]}
    >
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
        <PostModal post={post} />
      </Modal>
      <Card.Meta
        avatar={
          <img
            src={`https://api.multiavatar.com/${post.user.username}.png`}
            style={{ borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer" }}
            onClick={goToProfilePage}
          />
        }
        title={post.user.username}
      />
      <br />
      {picture()}
      <Card.Meta description={post.body} />
    </Card>
  )
}

export default Post
