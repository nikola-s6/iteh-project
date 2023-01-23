import Home from "../Home/Home"
import { React, useState } from "react"
import { Avatar, Button, Card } from "antd"
import Modal from "react-modal"
import AddPostModal from "../../components/AddPostModal"

function UserPage({ avatar, username }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="header" style={{ marginTop: "2%" }}>
          <Card.Meta
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30%" }}
            avatar={<Avatar src={avatar} style={{ width: "15vh", height: "15vh" }} />}
            title={username}
          />
        </div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
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
          <AddPostModal avatar={avatar} username={"neko"} />
        </Modal>
      </div>
      <div style={{ position: "absolute", top: 20, right: 15 }}>
        <button onClick={() => setModalOpen(true)} style={{ width: "20vh", height: "15vh" }} className="button">
          Add new post
        </button>
      </div>
    </div>
  )
}

export default UserPage
