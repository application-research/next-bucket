import Cors from "cors";

import * as T from "@common/textile";
import * as S from "@common/server";

export default async function bucketsList(req, res) {
  await S.cors(req, res);

  let buckets: any = [];
  try {
    buckets = await T.listBuckets({ key: req.body.key });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e.message,
    });
  }

  return res.json({ buckets });
}
