import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useMailContext } from "../context&reducer/MailProvider";
import emptyStar from "../context&reducer/icons/emptyStar.jpg";
import filledStar from "../context&reducer/icons/filledStar.jpg";
import deleteicon from "../context&reducer/icons/deleteicon.png";
import openMessage from "../context&reducer/icons/openMessage.png";
import unreadMessage from "../context&reducer/icons/unreadMessage.png";
import spamIcon from "../context&reducer/icons/spamIcon.png";
import DeleteWarning from "./Toast";

export const MailCard = ({ mailData, inbox, bin, spam, detailsPage }) => {
  const { mId, unread, isChecked, isStarred, subject, content } = mailData;
  const {
    deleteFromInbox,
    permanentMailDeleter,
    mailRecover,
    mailStarrer,
    markAsReadButtonHandler,
    addToSpam,
    deleteFromSpam,
    markAsNotSpam,
    selectMailHandler
  } = useMailContext();
  const navigate = useNavigate();

  const notification = (idPassed) => {
    toast(<DeleteWarning idPassed={idPassed} />);
  };
  return (
    <>
      <section
        className="firstLine"
        onClick={() => navigate(`/details/${mId}`)}
      >
        <div
          className="checkBox__AND__title"
          onClick={(event) => event.stopPropagation()}
        >
          {!spam && !bin && (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => selectMailHandler(mId)}
            />
          )}
          {inbox && (
            <img
              className="imgBtn"
              onClick={(event) => mailStarrer(mId)}
              title={isStarred ? "starred" : "not starred"}
              src={isStarred ? filledStar : emptyStar}
              alt=""
            />
          )}
        </div>
        <h3 onClick={() => navigate(`/details/${mId}`)}>{subject}</h3>
      </section>
      <section
        className="secondLine"
        onClick={() => navigate(`/details/${mId}`)}
      >
        {content}
      </section>

      <section className="thirdLine">
        <div className="buttonsList">
          {spam && (
            <button
              onClick={() => markAsNotSpam(mId)}
              className="btnStyler "
              style={{ color: "green" }}
            >
              Mark as not spam
            </button>
          )}
          {!bin && !spam && (
            <img
              className="imgBtn"
              alt=""
              onClick={() => {
                notification(mId);
                return deleteFromInbox(mId);
              }}
              src={deleteicon}
              title={"delete"}
              width="20px"
            />
          )}
          {spam && (
            <img
              className="imgBtn"
              alt=""
              onClick={() => deleteFromSpam(mId)}
              src={deleteicon}
              title={"delete"}
              width="20px"
              // className="btnStyler"
              // style={{ color: "red" }}
            />
          )}
          {bin && (
            <button
              onClick={() => mailRecover(mId)}
              className="btnStyler"
              style={{ color: "green" }}
            >
              Recover
            </button>
          )}

          {bin && (
            <button
              onClick={() => permanentMailDeleter(mId)}
              className="btnStyler"
              style={{ color: "red" }}
            >
              Delete permanently
            </button>
          )}

          {inbox && unread && (
            <img
              className="imgBtn unreadMsgIcon"
              onClick={() => markAsReadButtonHandler(mId)}
              title="unread mail"
              src={unreadMessage}
              alt=""
            />
          )}
          {inbox && !unread && (
            <img
              className="imgBtn "
              onClick={() => markAsReadButtonHandler(mId)}
              title="already read"
              src={openMessage}
              alt=""
            />
          )}
          {!bin && !spam && (
            <img
              className="imgBtn"
              onClick={() => addToSpam(mId)}
              title="report"
              src={spamIcon}
              alt=""
            />
          )}
        </div>
      </section>
    </>
  );
};
