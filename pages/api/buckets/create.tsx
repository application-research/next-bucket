import Cors from "cors";

import * as T from "@common/textile";
import * as S from "@common/server";

export default async function bucketsCreate(req, res) {
  await S.cors(req, res);

  let bucket = null;
  try {
    bucket = await T.createBucket({ bucketName: req.body.bucketName, key: req.body.key });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e.message,
    });
  }

  if (!bucket) {
    return res.status(500).json({
      error: "No bucket was created.",
    });
  }

  return res.json({ bucket });
}
