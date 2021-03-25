![filecoin](https://user-images.githubusercontent.com/310223/112445121-06e92a00-8d0c-11eb-8e39-f126075a5122.png)

# next-daemon-bucket
You can play with it here: https://next-daemon-bucket.onrender.com

* [Textile Buckets](https://docs.textile.io/buckets/) ([IPFS](https://ipfs.io/)) are the future and fun to use.
* COMING SOON — [Infinite Scroll](https://www.infinitescroll.org/)'s DiD through Daemon Land!
* [NextJS](https://github.com/vercel/next.js/) is a popular framework for building websites.
* No fancy CSS-in-JS, this example use NextJS's support for SASS out of the box.
* No database.
* No express server.
* Deploy anywhere like [Fleek](https://fleek.co/), [Render](https://render.com/), [Vercel](https://vercel.com/) or many others!
  * I prefer you use [Fleek](https://fleek.co/)!

### Setup

Clone this repository.

```sh
git clone git@github.com:application-research/next-daemon-bucket.git
cd next-daemon-bucket
```

You will want to create a `.env.local` file. The command you use is: `touch .env.local`. In this file you will want to include your Textile Hub keys and other secrets you don't want exposed.

The easiest way to generate your `user group` keys for Textile is to download the latest version of the  `hub` https://github.com/textileio/textile/releases/tag/v2.6.6

* Stuck? Read this: [https://docs.textile.io/hub/apis/](https://docs.textile.io/hub/apis/). Post an issue if you have any questions :-)

```env
TEXTILE_HUB_KEY=XXX
TEXTILE_HUB_SECRET=XXX
DAEMON_LAND_KEY=XXX
```

Now run the server.

```sh
npm install
npm run dev
```

Go to `http://localhost:3000` in your browser of choice. Enjoy!
