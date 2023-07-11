import { useNavigate } from "react-router-dom";

export const DetailPageCard = ({ mailData }) => {
  const navigate = useNavigate();
  const { subject, content } = mailData;
  const styler = {
    textAlign: "center",
    lineHeight: "2rem",
    margin: "1rem "
  };
  return (
    <>
      <h1 style={styler}>{subject}</h1>
      <h3 style={{ width: "500px", margin: "2rem auto" }}>{content}</h3>
      <button
        onClick={() => navigate(-1)}
        style={{
          borderRadius: "10px",
          fontSize: "1.3rem",
          display: "block",
          margin: "3rem auto"
        }}
      >
        Go Back
      </button>
    </>
  );
};
