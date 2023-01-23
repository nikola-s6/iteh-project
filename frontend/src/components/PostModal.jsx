import { React, useState } from "react"
import { Avatar, Button, Card } from "antd"
import "./Post.css"
import CommentList from "./CommentList"

const PostModal = ({ avatar, title, description }) => {
  const [comment, setComment] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // handle submit
    setComment("")
  }
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Name1",
      text: "Comment 1",
      date: "Jan 21, 2022",
    },
    {
      id: 2,
      name: "Name2",
      text: "Comment 2",
      date: "Jan 21, 2022",
    },
    {
      id: 3,
      name: "Name3",
      text: "Comment 3",
      date: "Jan 21, 2022",
    },
  ])
  return (
    <div className="postModal">
      <div style={{ display: "block", width: "70%" }}>
        <div style={{ display: "flex", gap: "30px" }}>
          <Card.Meta avatar={<Avatar src={avatar} />} />
          {title}
        </div>
        <br />
        <div className="text">{description}</div>
      </div>
      <div style={{ borderLeft: "1px solid black", height: "100%" }} />
      <div className="comments">
        <CommentList comments={comments} avatar={avatar} />
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
