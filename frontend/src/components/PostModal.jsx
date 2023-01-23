import { React, useState, useEffect } from "react"
import { Avatar, Button, Card } from "antd"
import "./Post.css"
import CommentList from "./CommentList"
import axios from "axios"

const PostModal = ({ post }) => {
  const [comment, setComment] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // handle submit
    setComment("")
  }
  const [comments, setComments] = useState([])

  useEffect(() => {
    async function fetchData() {
      console.log("usao")
      var config = {
        method: "get",
        url: `http://127.0.0.1:8000/api/post/${post.id}/comments`,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("auth_key"),
        },
      }
      await axios(config)
        .then(function (response) {
          if (response.status == 200) {
            setComments(response.data.data)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      fetchData()
    }
  }, [comments])

  return (
    <div className="postModal">
      <div style={{ display: "block", width: "70%" }}>
        <div style={{ display: "flex", gap: "30px" }}>
          <Card.Meta avatar={<Avatar src={sessionStorage.getItem("user_image")} />} />
          {post.user.username}
        </div>
        <br />
        <div className="text">{post.body}</div>
      </div>
      <div style={{ borderLeft: "1px solid black", height: "100%" }} />
      <div className="comments">
        <CommentList comments={comments} avatar={sessionStorage.getItem("user_image")} />
        <div className="inputComment">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            style={{ width: "100%" }}
          />
          <br />
          <button onClick={handleSubmit} className="button">
            Publish
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostModal
