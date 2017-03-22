# Gif Bar
An OS X menubar app for searching Giphy.

## Demo
![Gif Bar demo](./src/images/gif-bar-screenshot.png "Gif bar demo")

[View a demo of Gif Bar, as a gif, here](http://giphy-menubar.s3.amazonaws.com/gifs/demo.gif).

## Download Demo
This app currently doesn't have a product API key for Giphy, so it could stop working
at any moment. However, if you're cool with that, you can [download the app from here to take it for a spin](https://goo.gl/YoDmgs).

## Local setup
### Install the stuff
`npm install`

### Env file
Create a file called `env.json` in the `src` folder and copy the contents of the `env.example.json` file that is also in this folder.

We're using Giphy's dev/test credentials for accessing their API.

_Note: The Giphy API credentials could change at any moment. Fortunately [Giphy publish them so check the `Readme` for updates](https://github.com/Giphy/GiphyAPI#public-beta-key) if this app doesn't work for you._

### Start the app
`npm run start`

### Package the app
`npm run package`

## Built by
[Pete](http://www.peteroome.com/)

## Thanks
Many thanks to [@llnng](https://twitter.com/llnng) and [@robbarwell](https://twitter.com/robbarwell) for their design input and feedback on this project.
