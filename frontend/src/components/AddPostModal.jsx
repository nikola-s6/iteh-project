import { React, useState, useRef } from "react"
import { Avatar, Button, Card } from "antd"
import axios from "axios"
import "./PostModal.css"

function AddPostModal({ user, appendPost, closeModal }) {
  const fileInputRef = useRef(null)

  const [selectedFile, setSelectedFile] = useState(null)
  const [text, setText] = useState("")

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
    console.log(selectedFile)
  }

  async function handlePublish() {
    let data = new FormData()
    data.append("body", text)
    // data.append("image", null)

    await axios({
      url: "http://127.0.0.1:8000/api/post",
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
        if (response.data.message != null && response.data.message == "new post added") {
          // console.log(response.data.post)
          appendPost(response.data.post)
          closeModal()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div>
      <div className="header" style={{ marginTop: "2%" }}>
        <Card.Meta
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5%" }}
          avatar={<Avatar src={sessionStorage.getItem("profile_image")} style={{ width: "10vh", height: "10vh" }} />}
          title={user.username}
        />
        <br />
        <br />
      </div>
      <div className="textAreaContainer">
        <textarea
          placeholder="Add some text"
          name=""
          id=""
          cols="155"
          rows="10"
          onChange={handleTextChange}
          className="textArea"
        ></textarea>
        <div className="twoButtons">
          <button onClick={handleButtonClick} className="button">
            Add picture
          </button>
          <button onClick={handlePublish} className="button">
            Publish
          </button>
        </div>
      </div>
      <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileChange} />
    </div>
  )
}

export default AddPostModal
