import { useParams } from "react-router-dom";

export default function AdPage() {
  const { id } = useParams();

  return <p>Details of ad {id}</p>;
}
