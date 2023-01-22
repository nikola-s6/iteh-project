import { React, useState } from "react"
import { Avatar, Button, Card } from "antd"
import { HeartOutlined, MessageOutlined, DeleteOutlined } from "@ant-design/icons"
import "./Post.css"
import Modal from "react-modal"
import PostModal from "./PostModal"

function UserPost({ props }) {
  const handleDelete = () => {
    // handle delete
  }
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <Card
      style={{ width: "100%", marginBottom: "16px", border: "solid" }}
      actions={[
        <HeartOutlined key="like" />,
        <MessageOutlined key="message" onClick={() => setModalOpen(true)} />,
        <Button type="link" icon={<DeleteOutlined />} onClick={handleDelete} />,
      ]}
    >
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
        <PostModal avatar={props.avatar} title={props.username} description={props.caption} />
      </Modal>
      <Card.Meta avatar={<Avatar src={props.avatar} />} title={props.username} description={props.caption} />
    </Card>
  )
}

export default UserPost
