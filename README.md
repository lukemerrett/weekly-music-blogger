# Weekly Music Blogger

This project downloads a list of the top albums and tracks listened to by a user from Last.fm scrobbles then outputs it as a Jekyll post (markdown + metadata).

This is used to create the weekly "Coding Music" blog posts on http://lukemerrett.com/

## Dependencies

Prerequisites are:

* NodeJS (tested on v4.5.0)
* NPM (tested on v2.15.9)

This will install the 3 modules inside the root project along with all their pre-requisites

```
npm install
```

## Setup

Populate the `config.json` file in root with your Last.fm API credentials.  You can get an API access key and secret from here: http://www.last.fm/api

Sample:

```json
{
    "username": "bob",
    "apiKey": "xxxx",
    "secret": "xxxx"
}
```

## Run 

From the root directory of the project run:

```
node index.js
```