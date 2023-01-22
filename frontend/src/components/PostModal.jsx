import { React, useState } from "react"
import { Avatar, Button, Card } from "antd"
import "./Post.css"
import CommentList from "./CommentList"

const PostModal = ({ avatar, title, description }) => {
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }
  const comments = [
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
  ]
  return (
    <div className="postModal">
      <div className="text">{description}</div>
      <div style={{ borderLeft: "1px solid black", height: "100%" }} />
      <div className="comments">
        <CommentList comments={comments} avatar={avatar} />
        <div className="inputComment" style={{ position: "fixed" }}>
          <input
            className="input"
            value={inputValue}
            type="text"
            placeholder="Add your comment"
            onChange={handleInputChange}
            style={{ width: "80%", border: "none" }}
          />
          <br />
          <br />
          <button className="button">Publish</button>
        </div>
      </div>
    </div>
  )
}

export default PostModal
