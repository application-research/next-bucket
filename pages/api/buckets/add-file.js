import Cors from "cors";

import * as T from "~/common/textile";
import * as S from "~/common/server";

export default async function bucketsAddFile(req, res) {
  await S.cors(req, res);

  return res.json({ success: true });
}
