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

  return (
    <div className="postModal">
      <div style={{ display: "block", width: "70%" }}>
        <div style={{ display: "flex", gap: "30px" }}>
          <Card.Meta
            avatar={
              <img
                src={`https://api.multiavatar.com/${post.user.username}.png`}
                style={{ borderRadius: "50%", width: "30px", height: "30px" }}
              />
            }
          />
          {post.user.username}
        </div>
        <br />
        <div className="text">{post.body}</div>
      </div>
      <div style={{ borderLeft: "1px solid black", height: "100%" }} />
      <div className="comments">
        <CommentList comments={post.comments} />
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
