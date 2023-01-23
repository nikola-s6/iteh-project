import { React, useState } from "react"
import { Avatar, Button, Card } from "antd"
import { HeartOutlined, MessageOutlined, DeleteOutlined } from "@ant-design/icons"
import "./Post.css"
import Modal from "react-modal"
import PostModal from "./PostModal"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
library.add(faHeartRegular, faHeartSolid)

const Post = (props, isUserPost) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [liked, setLiked] = useState(false)

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
        <FontAwesomeIcon onClick={() => setLiked(!liked)} icon={liked ? faHeartSolid : faHeartRegular} />,
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
