import * as T from "@common/textile";
import * as S from "@common/server";
import * as U from "@common/utilities";

export default async function tokenGenerate(req, res) {
  await S.cors(req, res);

  let token;
  try {
    token = await T.generateToken();
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "The server failed to generated a token." });
  }

  if (U.isEmpty(token)) {
    res.status(500).json({ error: "The server did not return a token." });
  }

  res.json({ token });
}
