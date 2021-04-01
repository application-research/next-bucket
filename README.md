![filecoin](https://user-images.githubusercontent.com/310223/112445121-06e92a00-8d0c-11eb-8e39-f126075a5122.png)

# next-bucket

Why would I use this, Jim?

* Want to put things on [IPFS](https://ipfs.io/) easily.
* Love using [Textile](https://docs.textile.io/buckets/). Data on a Textile Bucket is stored on [IPLD](https://docs.ipld.io/) and pinned on to [IPFS](https://docs.ipfs.io/how-to/pin-files/) automatically.
* You can use any gateway to retrieve your [CID](https://ipfs.io/ipfs/bafybeibgy5fbkzb7jenk2ibo4vch2vmf7tbg5motfe2hpaaod3xvwoizmy/nft.gif). This CID is a GIF version of the NFT-linked-asset that exists for [https://foundation.app/ertdfgcvb/1613493082123-355](https://foundation.app/ertdfgcvb/1613493082123-355).
* **[SOON]** Take your bucket and put it on the Filecoin Network with a storage deal.

### Introduction

Try it online: https://next-bucket.onrender.com

This template should provide an easy way for you to set up Textile Buckets and pin content to the IPFS network. [NextJS](https://nextjs.org/) is the logical choice because [NextJS](https://nextjs.org) and decentralized solutions such as [Magic](https://magic.link/posts/magic-link-nextjs) are an awesome combination if you want to create a website such as [OpenSea](https://opensea.io/).

I would like it to be easy for anyone to roll their own website without the need for a database such as Postgres or MongoDB. If you take a poke around hopefully this is a simple enough configuration for you.

### Setup (MacOS)

Start by cloning the repository, or by clicking on **Use this template** above.

```sh
git clone git@github.com:application-research/next-bucket.git
cd next-bucket
```

* Create a `.env.local` file. 
  * The command: `touch .env.local`. 
* In this file you will want to include your Textile Hub keys and other secrets you don't want exposed to the client.

```sh
TEXTILE_HUB_KEY=XXX
TEXTILE_HUB_SECRET=XXX
IPFS_GATEWAY=https://ipfs.io
```

The easiest way to generate your `user group` keys for Textile is to download the latest version of the  `hub` https://github.com/textileio/textile/releases/tag/v2.6.6

* Stuck? Read this: [https://docs.textile.io/hub/apis/](https://docs.textile.io/hub/apis/). 
  * Still stuck? post an issue if you have any questions :-)

Now install dependencies and run the server.

```sh
npm install
npm run dev
```

Go to `http://localhost:3000` in your browser of choice. Enjoy!

### How do I follow development?

Be sure to follow the Filecoin Community post [here](https://github.com/filecoin-project/community/discussions/118).
