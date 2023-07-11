import { useMailContext } from "../context&reducer/MailProvider";
import { MailCard } from "./MailCard";
export const Spam = () => {
  const {
    content: { spam },
    unreadFilter,
    isStarredFilter,
    filterHandler
  } = useMailContext();
  const spamData =
    spam?.length < 1 ? (
      <h1>You dont have any Spam mails. </h1>
    ) : (
      spam.map((mail) => (
        <li
          className="mailMain"
          style={{ backgroundColor: mail.unread ? "#F2F6FC" : "white" }}
          key={mail.mId}
        >
          <MailCard mailData={mail} spam />
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
      <h1
        style={{
          marginTop: "8px",
          borderBottom: "1px dotted",
          paddingBottom: "8px"
        }}
      >
        Spam here
      </h1>

      <p>
        Reported & autoFiltered Spam mails are kept here for{" "}
        <strong>30days</strong> , after which they're permanently deleted
        automatically !
      </p>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>{spamData}</ul>
    </>
  );
};
