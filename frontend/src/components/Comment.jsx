import React from "react"
import { Avatar, Button, Card } from "antd"
import { HeartOutlined, MessageOutlined, DeleteOutlined } from "@ant-design/icons"

function Comment({ comment, avatar }) {
  /* const deleteButton = () => {
    if (isUserPost(props.id, sessionStorage)) {
      return <Button onClick={handleDelete} type="link" icon={<DeleteOutlined />} />
    } else {
      return <></>
    }
  }*/

  function handleDelete(e) {
    e.preventDefault()
    //handle delete
  }

  return (
    <div className="comment">
      <div className="comment-header">
        <Card.Meta avatar={<Avatar src={avatar} />} title={comment.name} style={{ display: "flex", gap: "30%" }} />
      </div>
      <p className="comment-text">{comment.text}</p>
      <span className="comment-date" style={{ fontSize: "10px" }}>
        {comment.date}
      </span>
    </div>
  )
}

export default Comment
