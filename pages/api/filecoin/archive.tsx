import * as T from "@common/textile";
import * as S from "@common/server";
import * as U from "@common/utilities";

export default async function filecoinArchive(req, res) {
  await S.cors(req, res);

  console.log(req.body.settings);

  const { buckets, bucketKey, bucketRoot, bucketName, error } = await T.getBucketAPIFromUserToken({
    key: req.body.key,
    bucketName: req.body.bucketName,
  });

  let archive = null;

  // NOTE(jim)
  // We can't use async/await for the archive call.
  return buckets
    .archive(bucketKey, { archiveConfig: JSON.parse(JSON.stringify(req.body.settings)) })
    .then((archive) => {
      res.json({ archive });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ error: "Failed to archive this bucket.", message: e.message });
    });
}
