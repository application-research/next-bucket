import * as T from "@common/textile";
import * as S from "@common/server";
import * as U from "@common/utilities";

export default async function filecoinGetArchiveHistory(req, res) {
  await S.cors(req, res);

  const { buckets, bucketKey, bucketRoot, bucketName, error } = await T.getBucketAPIFromUserToken({
    key: req.body.key,
    bucketName: req.body.bucketName,
  });

  let archives = null;
  try {
    archives = await buckets.archives(bucketKey);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to get archive history." });
  }

  res.json({ archives });
}
