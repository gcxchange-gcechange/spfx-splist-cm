# spfx-splist-cm

## Summary

This web part connects to the site and reads/writes to a list within that SharePoint site using PnP. Right now it is hardcoded to a list called "Job Postings" so it will only work on a site with that list name.

## Used SharePoint Framework & Node.js Versions

![version](https://img.shields.io/badge/version-1.13-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-v16.3+-green.svg)

## How to run

```
npm install
gulp serve
```

## How to build/package 

```
gulp clean
gulp bundle --ship
gulp package-solution --ship
```

Package will be in the sharepoint/solution folder