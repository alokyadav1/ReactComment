import React, { useState } from "react";
import CommentTemplate from "./components/CommentTemplate";
import DeleteModal from "./components/DeleteModal";
import jsonData from "./data.json";
import "./App.scss";
function App() {
  const currentUser = jsonData.currentUser.username;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = () => {
    setShowDeleteModal((prev) => !prev);
  };
  return (
    <>
      <div className="container">
        {jsonData.comments.map((data, index) => {
          if (data.replies.length === 0) {
            return (
              <CommentTemplate
                data={data}
                currentUser={jsonData.currentUser}
                currentUserImage={jsonData.currentUser.image.png}
              />
            );
          } else {
            return (
              <div>
                <CommentTemplate
                  data={data}
                  username={currentUser}
                  currentUserImage={jsonData.currentUser.image.png}
                />
                <div className="replyContainer">
                  {data.replies.map((replyData) => {
                    return (
                      <CommentTemplate
                        data={replyData}
                        username={currentUser}
                        onDelete={handleDelete}
                        currentUserImage={jsonData.currentUser.image.png}
                      />
                    );
                  })}
                </div>
              </div>
            );
          }
        })}
        <div className="addComment">
          <img
            src={process.env.PUBLIC_URL + jsonData.currentUser.image.png}
            alt="username"
          />
          <textarea placeholder="Add a comment..." rows={4} />
          <button>Send</button>
        </div>
      </div>
      {showDeleteModal && <DeleteModal onDelete={handleDelete}/>}
    </>
  );
}

export default App;
