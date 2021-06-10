https://user-images.githubusercontent.com/310223/121464887-94cacd80-c969-11eb-9dd3-2423ba29f32b.mp4

# next-bucket

Why would I use this, Jim?

- Want to put things on [IPFS](https://ipfs.io/).
- You love using [Textile's Bucket](https://docs.textile.io/buckets/). Data on a Textile Bucket is stored with [IPLD](https://docs.ipld.io/) and pinned on to [IPFS](https://docs.ipfs.io/how-to/pin-files/) automatically.
- You can use any IPFS gateway to retrieve your [CID](https://ipfs.io/ipfs/bafybeibgy5fbkzb7jenk2ibo4vch2vmf7tbg5motfe2hpaaod3xvwoizmy/nft.gif). This CID is a GIF version of the NFT-linked-asset that exists for [https://foundation.app/ertdfgcvb/1613493082123-355](https://foundation.app/ertdfgcvb/1613493082123-355).
- Example of Metamask integration.
- Backup your archive on to Filecoin after verifying your address.

### Introduction

Try it online: https://next-bucket.onrender.com

This template uses [NextJS](https://nextjs.org/) because...

- It is easy to learn.
- Minimal setup for maximum output.

In addition, [NextJS](https://nextjs.org) and [Magic](https://magic.link/posts/magic-link-nextjs) are an awesome combination if you want to create a website such as [OpenSea](https://opensea.io/) without needing to roll your own database.

### Setup (MacOS)

Start by cloning the repository, or by clicking on **Use this template** above.

```sh
git clone git@github.com:application-research/next-bucket.git
cd next-bucket
```

- Create a `.env.local` file.
  - The command: `touch .env.local`.
- In this file you will want to include your Textile Hub keys and other secrets you don't want exposed to the client.

```sh
TEXTILE_HUB_KEY=XXX
TEXTILE_HUB_SECRET=XXX
IPFS_GATEWAY=https://ipfs.io
```

The easiest way to generate your `user group` keys for Textile is to download the latest version of the `hub` https://github.com/textileio/textile/releases/tag/v2.6.6

- Stuck? Read this: [https://docs.textile.io/hub/apis/](https://docs.textile.io/hub/apis/).
  - Still stuck? Post an issue if you have any questions :-)

Next,

```sh
npm install
npm run dev
```

Go to `http://localhost:3000` in your browser of choice. Enjoy!

### How do I follow development?

Be sure to follow the Filecoin Community post [here](https://github.com/filecoin-project/community/discussions/118).
