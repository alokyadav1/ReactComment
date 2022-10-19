import React, { useState } from "react";
import { FaTrash, FaReply, FaPen, FaPlus, FaMinus } from "react-icons/fa";
function CommentTemplate({
  data,
  username,
  onDelete,
  onReply,
  currentUserImage,
}) {
  const isReply = data.hasOwnProperty("replyingTo");
  const [showReply, setShowReply] = useState(false);
  const handleReply = () => {
    setShowReply(prev => !prev)
  }
  return (
    <div>
      <div className="commentTemplate" id={`comment${data.id}`}>
        <div className="upvote">
          <button>
            <FaPlus />
          </button>
          <p>{data.score}</p>
          <button>
            <FaMinus />
          </button>
        </div>
        <div className="description">
          <div className="header">
            <img
              src={process.env.PUBLIC_URL + data.user.image.png}
              alt="hello"
            />
            <p className="username">
              {data.user.username}
              {username === data.user.username && <span>you</span>}
            </p>
            <p className="time">{data.createdAt}</p>
            <div className="reply">
              {username === data.user.username ? (
                <div>
                  {" "}
                  <div onClick={onDelete} className="del">
                    <span className="deleteIcon">
                      <FaTrash />
                    </span>{" "}
                    <span className="delete">Delete</span>
                  </div>
                  <div className="edit">
                    <FaPen className="editIcon" />
                    <span>Edit</span>
                  </div>
                </div>
              ) : (
                <p onClick={handleReply}>
                  <FaReply className="replyIcon" />
                  <span>Reply</span>
                </p>
              )}
            </div>
          </div>
          <div className="message">
            {isReply && <span>@{data.replyingTo}</span>}
            {data.content}
          </div>
        </div>
      </div>
      {showReply && username !== data.user.username && (
        <div className="replyToUser">
          <div className="addComment">
            <img src={currentUserImage} alt="username" />
            <textarea placeholder="Add a comment..." rows={4} />
            <button>Reply</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default CommentTemplate;
