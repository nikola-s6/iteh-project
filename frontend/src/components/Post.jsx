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

const Post = (props) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeNum, setLikeNum] = useState(0)
  const [commentNum, setCommentNum] = useState(0)

  const deleteButton = () => {
    if (props.isUserPost(props.id, sessionStorage)) {
      return <Button style={{ marginTop: "8px" }} type="link" icon={<DeleteOutlined />} />
    } else {
      return <></>
    }
  }

  function handleLike() {
    setLiked(!liked)
    if (liked) setLikeNum(likeNum - 1)
    else {
      setLikeNum(likeNum + 1)
    }
  }

  return (
    <Card
      style={{ width: "100%", marginBottom: "16px", border: "solid" }}
      actions={[
        <div
          onClick={handleLike}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}
        >
          <FontAwesomeIcon color="red" icon={liked ? faHeartSolid : faHeartRegular} />
          <p>{likeNum} likes</p>
        </div>,
        <div
          onClick={() => setModalOpen(true)}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}
        >
          <MessageOutlined key="message" />,<p>{commentNum} comments</p>
        </div>,
        // deleteButton()
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
