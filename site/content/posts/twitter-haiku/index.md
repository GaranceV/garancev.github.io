---
title: "EverydayHaikus"
date: 2020-04-06T19:24:03+02:00
draft: false
---

# @EverydayHaikus

A twitter robot delivering a daily dose of Haikus, right in your timeline!

## Quick facts

* The code lives in [Github](https://github.com/garancev/twitterbot-haikus)
* The code is uploaded online on [Heroku](https://heroku.com).
* All the haikus live in a postgreSQL database.</li>
* It is scheduled to tweet every day at 9.30 AM.

## Why Heroku

Amongst others, this [short tutorial by Matt Popovich](https://medium.com/@mattpopovich/how-to-build-and-deploy-a-simple-twitter-bot-super-fast-with-node-js-and-heroku-7b322dbb5dd3) convinced me to used Heroku, due to the scheduler plugin. I took the opportunity to also create the database over there, within the same app.
