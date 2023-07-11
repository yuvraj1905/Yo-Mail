import { useMailContext } from "../context&reducer/MailProvider";
import { MailCard } from "./MailCard";
import deleteicon from "../context&reducer/icons/deleteicon.png";

export const Bin = () => {
  const {
    content: { bin, binSelectorActive },
    unreadFilter,
    isStarredFilter,
    filterHandler,
    binSelectorToggler
  } = useMailContext();
  const binData =
    bin?.length < 1 ? (
      <h1>You dont have any Deleted mails. </h1>
    ) : (
      bin.map((mail) => (
        <li
          className="mailMain"
          style={{ backgroundColor: mail.unread ? "#F2F6FC" : "white" }}
          key={mail.mId}
        >
          <MailCard mailData={mail} bin />
        </li>
      ))
    );
  return (
    <>
      {/* <fieldset>
        <legend>Filters</legend>
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
      </fieldset> */}
      <h1 style={{ marginTop: "12px", borderBottom: "1px dotted" }}>
        Bin here
      </h1>
      <p>
        Deleted mails are kept here for <strong>30days</strong> , after which
        they're permanently deleted automatically !
      </p>
      <div className="trash__selectAllPanel">
        Select All:
        <input
          type="checkbox"
          title="select"
          onChange={() => binSelectorToggler()}
          checked={binSelectorActive}
        />
        <div>{binSelectorActive && bin.length > 0 && <OptionsComponent />}</div>
      </div>

      <div className="contentSectionOfRightDivision">{binData}</div>
    </>
  );
};

function OptionsComponent() {
  const {
    // content: { bin },
    deleteMultipleBin
  } = useMailContext();

  return (
    <>
      <img
        className="imgBtn"
        onClick={() => deleteMultipleBin()}
        src={deleteicon}
        title={"delete"}
        alt=""
        height="22px"
        width="20px"
      />
    </>
  );
}
