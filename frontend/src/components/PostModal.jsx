import { React, useState, useEffect } from "react"
import { Avatar, Button, Card } from "antd"
import "./Post.css"
import CommentList from "./CommentList"
import axios from "axios"

const PostModal = ({ post, appendComment }) => {
  const [comment, setComment] = useState("")
  const [allComments, setAllComments] = useState(post.comments)

  async function handleSubmit(e) {
    e.preventDefault()

    let data = new FormData()
    data.append("text", comment)
    // data.append("image", null)

    await axios({
      url: `http://127.0.0.1:8000/api/post/${post.id}/comments`,
      method: "post",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("auth_key"),
      },
      data: data,
    })
      .then((response) => {
        if (response.status != 200) {
          console.log(response)
          return
        }
        console.log(response.data)
        if (response.data.message != null && response.data.message == "comment created") {
          appendComment(response.data.comment)
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    setComment("")
  }

  function appendComment(comment) {
    let list = post.comments
    list.unshift(comment)
  }

  function deleteComment(id) {
    let c = allComments

    c.forEach((element) => {
      if (element.id === id) {
        let index = c.indexOf(element)
        c.splice(index, 1)
      }
    })
    setAllComments(c)
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
        <CommentList deleteComment={deleteComment} comments={allComments} />
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
