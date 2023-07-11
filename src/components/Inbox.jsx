import { useMailContext } from "../context&reducer/MailProvider";
import { MailCard } from "./MailCard";
import searchIcon from "../context&reducer/icons/searchIcon.webp";
import deleteicon from "../context&reducer/icons/deleteicon.png";
import openMessage from "../context&reducer/icons/openMessage.png";
import unreadMessage from "../context&reducer/icons/unreadMessage.png";
import spamIcon from "../context&reducer/icons/spamIcon.png";
import { DeleteWarningMultiple } from "./Toast";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

export const Inbox = () => {
  const [loading, setLoading] = useState(false);
  const {
    content: {
      displayData,
      isStarredFilter,
      unreadFilter,
      inputValue,
      universalSelectorActive,
      universalFilterCategoriesSelector,
      currentPage
    },

    currentRenderingData,
    dispatch,
    filterHandler,
    universalSelectorToggler,
    pageChangeHandler,
    categoryUniversalSelector,
    numberOfPagesCalculator
  } = useMailContext();

  let unreadCount = 0;
  const mailsToDisplay = currentRenderingData?.map((mail) => {
    mail?.unread && unreadCount++;
    return (
      <li
        className="mailMain"
        style={{ backgroundColor: mail.unread ? "#F2F6FC" : "white" }}
        key={mail.mId}
      >
        <MailCard mailData={mail} inbox />
      </li>
    );
  });
  const override = {
    position: "absolute",
    top: "350px",
    left: "50%",
    margin: "0 auto",
    borderColor: "red"
  };

  useEffect(() => {
    dispatch({ name: "ResetSelectors" });
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }, [currentPage]);
  return (
    <>
      <fieldset>
        <legend>Filters (Overall)</legend>
        <div className="searchbar">
          <img src={searchIcon} alt="" height="19px" width="19px" />{" "}
          <input
            value={inputValue}
            onChange={(e) =>
              dispatch({ name: "searchInputHandler", payload: e.target.value })
            }
            // onKeyDown={(e) => e.key === "Enter" && searchInputHandler(input)}
            size="35"
            style={{ border: "none", padding: "4px" }}
            type="text"
            placeholder="Search mail by subject or content"
          />
        </div>
        <div className="globalFilters">
          <input
            type="checkbox"
            checked={unreadFilter}
            onChange={() => filterHandler("unread")}
          />
          Show Unread
          <input
            style={{ marginLeft: "1rem" }}
            type="checkbox"
            checked={isStarredFilter}
            onChange={() => filterHandler("isStarred")}
          />
          Show Starred
        </div>
      </fieldset>
      <div className="unreadCount__AND__pagination">
        {unreadCount < 1 ? (
          <h3>No unread mails !</h3>
        ) : (
          <h3
            style={{
              textAlign: "left",
              paddingLeft: "16px",
              fontStyle: "italic"
            }}
          >
            Total Unread mails:{unreadCount}
          </h3>
        )}
        {currentRenderingData.length >= 1 && (
          <div className="goToPageSection">
            <h3>Go to:</h3>
            <div className="pagination">
              <span
                style={{ display: currentPage === 1 ? "none" : "" }}
                onClick={() =>
                  pageChangeHandler(currentPage - 1, numberOfPagesCalculator)
                }
                className="arrow__buttons"
                role="img"
                aria-label=""
              >
                ⬅️
              </span>
              {[...Array(numberOfPagesCalculator)].map((_, index) => (
                <span
                  onClick={() =>
                    pageChangeHandler(index + 1, numberOfPagesCalculator)
                  }
                  style={{
                    backgroundColor: currentPage === index + 1 ? "grey" : ""
                  }}
                  className="page__numbers"
                >
                  {index + 1}
                </span>
              ))}
              <span
                style={{
                  display: currentPage === numberOfPagesCalculator ? "none" : ""
                }}
                onClick={() =>
                  pageChangeHandler(currentPage + 1, numberOfPagesCalculator)
                }
                className="arrow__buttons"
                role="img"
                aria-label=""
              >
                ➡️
              </span>
            </div>
          </div>
        )}
      </div>
      <section className="selectPanel">
        <div>
          Selected:
          <input
            type="checkbox"
            title="select"
            onChange={() => universalSelectorToggler(currentPage)}
            checked={universalSelectorActive}
          />
        </div>
        <div>
          Select by category : {""}
          <select
            onChange={(e) =>
              categoryUniversalSelector(e.target.value, currentPage)
            }
          >
            <option
              value="none"
              selected={
                universalFilterCategoriesSelector === "none" ? true : false
              }
            >
              none
            </option>
            <option value="all">All</option>
            <option value="unread">unread</option>
            <option value="read">read</option>
            <option value="starred">Starred</option>
          </select>
        </div>
        <div>{universalSelectorActive && <OptionsComponent />}</div>
      </section>
      {loading ? (
        <PulseLoader
          color="black"
          loading={loading}
          size={20}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {mailsToDisplay.slice(currentPage * 8 - 8, currentPage * 8)}
        </ul>
      )}
    </>
  );
};

function OptionsComponent() {
  const {
    content: { displayData },
    deleteMultiple
  } = useMailContext();

  const selectedMailsIds = [...displayData]
    .filter(({ isChecked }) => isChecked === true)
    .map(({ mId }) => mId);

  const notification = (idPassed) => {
    toast(<DeleteWarningMultiple idsPassed={idPassed} />);
  };

  return (
    <>
      <img
        className="imgBtn"
        onClick={() => {
          notification(selectedMailsIds);
          return deleteMultiple();
        }}
        src={deleteicon}
        title={"delete"}
        alt=""
        height="22px"
        width="20px"
      />
    </>
  );
}
