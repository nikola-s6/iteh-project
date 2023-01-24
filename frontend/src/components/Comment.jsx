import { React, useState } from "react"
import { Avatar, Button, Card } from "antd"
import Modal from "react-modal"
import { HeartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import UpdateComment from "./UpdateComment"
import axios from "axios"

function Comment({ comment }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [commentText, setCommentText] = useState(comment.text)

  const updateButton = () => {
    const userText = sessionStorage.getItem("logged_user")
    const user = JSON.parse(userText)
    console.log(comment.user.id)
    if (user.id === comment.user.id) {
      return <Button onClick={handleUpdate} type="link" icon={<EditOutlined />} />
    } else {
      return <></>
    }
  }

  async function handleUpdate(e) {
    e.preventDefault()

    var data = new FormData()
    data.append("text", commentText)

    var config = {
      method: "put",
      url: `http://127.0.0.1:8000/api/post/${comment.post.id}/comments/${comment.id}`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("auth_key"),
      },
      data: data,
    }
    const response = await axios(config)
  }

  const deleteButton = () => {
    const userText = sessionStorage.getItem("logged_user")
    const user = JSON.parse(userText)
    console.log(comment.user.id)
    if (user.id === comment.user.id) {
      return <Button onClick={(e) => handleDelete(e)} type="link" icon={<DeleteOutlined />} />
    } else {
      return <></>
    }
  }

  async function handleDelete(e) {
    e.preventDefault()
    var config = {
      method: "delete",
      url: `http://127.0.0.1:8000/api/post/${comment.post.id}/comments/${comment.id}`,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("auth_key"),
      },
    }
    const response = await axios(config)
  }

  function date() {
    let date = comment.created_at
    return Date(date).slice(0, 16)
  }

  return (
    <div className="comment">
      <div className="comment-header">
        <Card.Meta
          avatar={
            <img
              src={`https://api.multiavatar.com/${comment.user.username}.png`}
              style={{ borderRadius: "50%", width: "30px", height: "30px" }}
            />
          }
          title={comment.user.username}
          style={{ display: "flex", gap: "5%" }}
        />
      </div>
      <p className="comment-text">{comment.text}</p>
      <span className="comment-date" style={{ display: "flex", fontSize: "10px" }}>
        <div style={{ width: "100%" }}>{date()}</div>
        <div style={{ display: "flex", gap: "2%", marginTop: "20px" }}>
          {updateButton()}
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
                width: "30%",
                height: "30%",
                backgroundColor: "#fff",
                padding: "2rem",
              },
            }}
          >
            <UpdateComment comment={comment} handleUpdate={setCommentText} />
          </Modal>
          {deleteButton()}
        </div>
      </span>
    </div>
  )
}

export default Comment
