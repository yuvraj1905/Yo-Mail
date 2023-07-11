import { useParams } from "react-router-dom";
import { useMailContext } from "../context&reducer/MailProvider";
import { DetailPageCard } from "./DetailPageCard";

export const Details = () => {
  const { mailId } = useParams();
  const {
    content: { originalData }
  } = useMailContext();
  const mailDetails = originalData?.find(({ mId }) => mId === mailId);
  return <DetailPageCard mailData={mailDetails} />;
};
