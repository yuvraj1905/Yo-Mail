import { useMailContext } from "../context&reducer/MailProvider";

function DeleteWarning({ toastProps, closeToast, idPassed }) {
  const {
    content: { originalData },
    mailRecover
  } = useMailContext();
  const { subject } = originalData.find(({ mId }) => mId === idPassed);
  return (
    <div>
      <p>conversation moved to bin! </p>
      <p style={{ fontStyle: "italic" }}>{subject}</p>
      <button
        onClick={() => {
          mailRecover(idPassed);
          // closeToast("Action done !");
        }}
      >
        Undo
      </button>
    </div>
  );
}

export const DeleteWarningMultiple = ({ idsPassed }) => {
  const { mailRecoverMultiple } = useMailContext();
  // console.log(idsPassed);
  return (
    <div>
      <p>Selected mails moved to bin! </p>
      <button
        onClick={() => {
          mailRecoverMultiple(idsPassed);
          // closeToast("Action done !");
        }}
      >
        Undo
      </button>
    </div>
  );
};

export default DeleteWarning;
