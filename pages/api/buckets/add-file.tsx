import Cors from "cors";
import BusBoyConstructor from "busboy";

import * as T from "@common/textile";
import * as S from "@common/server";
import * as U from "@common/utilities";

const HIGH_WATER_MARK = 1024 * 1024 * 3;

// NOTE(jim)
// Disable NextJS body parser to support form/multi-part
export const config = {
  api: {
    bodyParser: false,
  },
};

// NOTE(jim)
// Might not be able to handle large file uploads because the data transfer
// endpoint is on the same web server.
export default async function bucketsAddFile(req, res) {
  await S.cors(req, res);

  const { bucketName, bucketKey, key } = U.getBucketDataFromHeader(req.headers.authorization);

  // NOTE(jim)
  // You might want to protect this endpoint some more.
  if (U.isEmpty(bucketName)) {
    return res.status(500).json({ error: true });
  }

  if (U.isEmpty(bucketKey)) {
    return res.status(500).json({ error: true });
  }

  if (U.isEmpty(key)) {
    return res.status(500).json({ error: true });
  }

  const { buckets, bucketRoot, error } = await T.getBucketAPIFromUserToken({
    key,
    bucketName,
  });

  if (error) {
    return res.status(500).json({ error });
  }

  const busboy = new BusBoyConstructor({
    headers: req.headers,
    highWaterMark: HIGH_WATER_MARK,
  });

  let push;
  const _createStreamAndUploadToTextile = async (s): Promise<any> => {
    return new Promise<void>(function (resolve, reject): any {
      s.on("file", async function (fieldname, stream, filename, encoding, mime) {
        console.log(filename);
        console.log(encoding);
        console.log(mime);

        push = await buckets
          .pushPath(bucketKey, filename, stream, {
            progress: function (num) {
              if (num % (HIGH_WATER_MARK * 5) !== 0) {
                return;
              }

              console.log(U.bytesToSize(num));
            },
          })
          .catch((e) => {
            console.log(e.message);
          });

        resolve();
      });

      s.on("error", function (e) {
        throw new Error(e.message);
      });

      return req.pipe(s);
    });
  };

  console.log("upload start!");

  try {
    const response = await _createStreamAndUploadToTextile(busboy);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: true });
  }

  console.log("upload success!");

  return res.json({ success: true });
}
