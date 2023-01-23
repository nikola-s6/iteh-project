import { React, useState, useRef } from "react"
import { Avatar, Button, Card } from "antd"
import axios from "axios"

function AddPostModal({ avatar, username }) {
  const fileInputRef = useRef(null)

  const [selectedFile, setSelectedFile] = useState(null)

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
    console.log(selectedFile)
  }

  function handlePublish() {
    let formdata = new FormData()
    formdata.append("image", selectedFile)

    axios({
      url: "",
      method: "POST",
      headers: {
        authorization: "token",
      },
      data: formdata,
    }).then((res) => {})
  }

  return (
    <div>
      <div className="header" style={{ marginTop: "2%" }}>
        <Card.Meta
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5%" }}
          avatar={<Avatar src={avatar} style={{ width: "10vh", height: "10vh" }} />}
          title={username}
        />
        <br />
        <br />
      </div>
      <textarea placeholder="Add some text" name="" id="" cols="155" rows="10"></textarea>
      <br />
      <br />
      <button onClick={handleButtonClick} className="button">
        Add picture
      </button>
      <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileChange} />
    </div>
  )
}

export default AddPostModal
