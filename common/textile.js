import * as U from "~/common/utilities";

import { Buckets, PrivateKey, Filecoin, Client, ThreadID } from "@textile/hub";

const TEXTILE_KEY_INFO = {
  key: process.env.TEXTILE_HUB_KEY,
  secret: process.env.TEXTILE_HUB_SECRET,
};

const BUCKET_NAME = "data";

export const generateToken = async () => {
  const identity = await PrivateKey.fromRandom();
  const api = identity.toString();
  return api;
};

export const getBucketAPIFromUserToken = async ({ token, bucketName }) => {
  const identity = await PrivateKey.fromString(token);
  const name = U.isEmpty(bucketName) ? BUCKET_NAME : bucketName;
  const buckets = await Buckets.withKeyInfo(TEXTILE_KEY_INFO);
  await buckets.getToken(identity);

  let root = null;
  try {
    const created = await buckets.getOrCreate(name);
    root = created.root;
  } catch (e) {
    console.log(e);
    return {
      error: e.message,
      buckets: null,
      bucketKey: null,
      bucketRoot: null,
    };
  }

  if (!root) {
    return { error: "Missing root", buckets: null, bucketKey: null, bucketRoot: null };
  }

  return {
    buckets,
    bucketKey: root.key,
    bucketRoot: root,
    bucketName: name,
  };
};
