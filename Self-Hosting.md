# WhatsApp-Botto-Xre Self-hosting Guide


## ⛵ Perquisites

- [Git](https://git-scm.com/)
- [Node.JS](https://nodejs.org/en/)
- [WebP](https://developers.google.com/speed/webp/download)
- [FFMpeg](https://ffmpeg.org/download.html)
- [ImageMagick-Legacy](https://imagemagick.org/index.php)

## 🍀 Installation

Run the following code to clone the repo
```SH
> git clone https://github.com/SomnathDas/Whatsapp-Botto-Xre
> cd Whatsapp-Botto-Xre
```
Run this to install the depencencies

```SH
> npm i && npm i -D
```

## ✍ Configaration

Go to [Mongo Atlas](http://mongodb.com/cloud/atlas) and create an account \
After you set up your account create a new Cluster \
Then copy the connection url to your cluster

If you don't want to use Mongo Atlas you can install MongoDB in your system and use the URI provided in `.env.example`
Follow the instructions [here](https://docs.mongodb.com/manual/installation/) to install MongoDB 

Create a file named `.env` then add the follwoing fields

```env
MONGO_URI=YOUR_CLUSTER_URI
DELTA=https://api.deltaa.me
```

Edit the `config.json` accoring to your needs

```JSON
{
    "name": "Xre",
    "gender": "male",
    "prefix": "!",
    "cron": "0 */6 * * *",
    "admins": [],
    "adminGroupId": ""
}
```
`name` The name of the Bot <br>
`gender` The Gender of the bot. Can be "male" or "female"
`prefix` The Prefix of the Bot <br>
`cron` Cron schedule for clearing all chats (Default: `"0 */6 * * *"`. Every 6 Hours). change this field to `null` if you don't want to schedule. [Learn More](https://www.npmjs.com/package/node-cron) <br>
`admins (optional but recomended)` The [JIDs](https://adiwajshing.github.io/Baileys/interfaces/wauser.html#jid) of the users who you want to the Admins/Mods for the bot <br>
`adminGroupId (optional)` If this field is provied, the members of this group will automatically become admins (use !id to get the gid)

## ⌨ Building

Run `npm run build` and the Compiled JS files, Decleration Files, Maps and Declaration Maps with their folder will appear in the `dist` folder

## 💻 Running

```SH
npm start
```
Running the above command will start the bot. 
To authenticate scan the QR which shows up in the terminal or the link which is logged when the QR event fires using the WA-Web Scanner on your WhatsApp.
Now you're on your own. Good Luck!