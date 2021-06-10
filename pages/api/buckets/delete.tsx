import Cors from "cors";

import * as T from "@common/textile";
import * as S from "@common/server";

export default async function bucketsDelete(req, res) {
  await S.cors(req, res);

  let bucket = null;
  try {
    bucket = await T.deleteBucket({
      bucketKey: req.body.bucketKey,
      bucketName: req.body.bucketName,
      key: req.body.key,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e.message,
    });
  }

  return res.json({ success: true });
}
