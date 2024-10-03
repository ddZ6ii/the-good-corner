import { useParams } from "react-router-dom";
import { IdParam, IdParamSchema } from "@tgc/common";

export default function AdPage() {
  const params = useParams<IdParam>();
  const { id: parsedAdId } = IdParamSchema.parse(params);

  return <p>Details of ad {parsedAdId}</p>;
}
