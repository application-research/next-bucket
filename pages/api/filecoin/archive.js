import * as T from "~/common/textile";
import * as S from "~/common/server";
import * as U from "~/common/utilities";

export default async function filecoinArchive(req, res) {
  await S.cors(req, res);

  const { buckets, bucketKey, bucketRoot, bucketName, error } = await T.getBucketAPIFromUserToken({
    key: req.body.key,
    bucketName: req.body.bucketName,
  });

  let archive = null;
  try {
    archive = await buckets.archive(bucketKey, req.body.settings);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to archive this bucket.", message: e.message });
  }

  res.json({ archive });
}
