# next-daemon-bucket

* Textile Buckets are the future.
* Infinite Scroll's DiD through Daemon Land is also the future.
* NextJS is easy to use.
* No fancy CSS-in-JS, this example use NextJS's support for SASS out of the box.
* No database.
* No express server.
* Deploy anywhere like [Fleek](https://fleek.co/), Render, Vercel or many others!
* I prefer you use Fleek!

### Setup

➟ clone it.

```
git clone git@github.com:application-research/next-daemon-bucket.git
cd next-daemon-bucket
```

* The easiest way to generate your `user group` keeps for Textile is to download the hub https://github.com/textileio/textile/releases/tag/v2.6.6
* You will need to create a Textile `user group` keys. Read this: [https://docs.textile.io/hub/apis/](https://docs.textile.io/hub/apis/). Post an issue if you get stuck.
* create a `.env.local` hidden file. use `touch .env.local`.
* COMING SOON! Daemon Land :-)

```env
TEXTILE_HUB_KEY=XXX
TEXTILE_HUB_SECRET=XXX
DAEMON_LAND_KEY=XXX
```

* run the server.

```sh
npm install
npm run dev
```

* go to `http://localhost:3000` in your browser of choice.
