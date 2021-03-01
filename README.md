# pinned-tab

Local Routes
- [http://localhost:3000/graph](http://localhost:3000/graph)
- [http://localhost:3000/1/1](http://localhost:3000/USER_ID/LECTURE_ID)

Live Routes
- [https://ct10.ddns.uark.edu:5001/graph](https://ct10.ddns.uark.edu:5001/graph)
- [https://ct10.ddns.uark.edu:5001/1/1](https://ct10.ddns.uark.edu:5001/USER_ID/LECTURE_ID)

### Local

```
npm install
npm run start
```

### Live

Starts the react app as it runs on the live site. HTTPs enabled & different port.

```
npm install
npm run live
```
**NOTE:** Running live will enable HTTPs, currently this causes issues. The  current work around is to allow insecure content in your browsers settings. You'll also have to do this for the live site.

[Instructions to allow insecure content](https://experienceleague.adobe.com/docs/target/using/experiences/vec/troubleshoot-composer/mixed-content.html?lang=en#enabling-mixed-content-in-microsoft-edge)