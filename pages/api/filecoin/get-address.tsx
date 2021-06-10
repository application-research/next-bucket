import * as T from "@common/textile";
import * as S from "@common/server";
import * as U from "@common/utilities";

export default async function filecoinGetAddress(req, res) {
  await S.cors(req, res);

  let addresses;
  try {
    const FilecoinSingleton = await T.getFilecoinAPIFromUserToken({
      key: req.body.key,
    });
    const { filecoin } = FilecoinSingleton;
    addresses = await filecoin.addresses();
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "The server failed to get your filecoin data." });
  }

  let bigIntSafeAddresses = JSON.parse(
    JSON.stringify(addresses, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );

  res.json({ addresses: bigIntSafeAddresses });
}
