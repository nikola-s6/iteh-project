import { React, useState } from "react"
import { Avatar, Button, Card } from "antd"
import { HeartOutlined, MessageOutlined, DeleteOutlined } from "@ant-design/icons"
import "./Post.css"
import Modal from "react-modal"
import PostModal from "./PostModal"

const Post = (props, isUserPost) => {
  const [modalOpen, setModalOpen] = useState(false)

  const deleteButton = () => {
    if (isUserPost(props.id, sessionStorage)) {
      return <Button type="link" icon={<DeleteOutlined />} />
    } else {
      return <></>
    }
  }

  return (
    <Card
      style={{ width: "100%", marginBottom: "16px", border: "solid" }}
      actions={[
        <HeartOutlined key="like" />,
        <MessageOutlined key="message" onClick={() => setModalOpen(true)} />,
        //  deleteButton(),
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

export default Post
