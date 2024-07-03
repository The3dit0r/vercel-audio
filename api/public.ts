const publicFiles = {
  "/404.html": "<head>\r  <meta charset=\"UTF-8\" />\r  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r  <title>Audio API - 404</title>\r</head>\r<body>\r  <div class=\"main\">\r    <div class=\"pagetitle tac\" style=\"color: #a966e7\">Bad Music App API</div>\r\r    <div class=\"bframe tac\">\r      <h1 class=\"tac\" style=\"color: #ff0\">404 - Page not found</h1>\r      <h4>Unfortunately, you have stumble across the land of unknown</h4>\r      <a href=\"/\">Return</a>\r    </div>\r    <div class=\"btitle\">Error Log ({date})</div>\r    <div class=\"bframe\" style=\"text-align: left; overflow-x: auto\">\r      <div style=\"white-space: pre-wrap; width: 100vw\">{errorMessage}</div>\r    </div>\r    <footer>\r      © 2019-2024 BadMusicApp, LCC. All right reserve\r      <div>Running on: {serverOrigin}</div>\r    </footer>\r  </div>\r</body>\r",
  "/index.html": "<head>\r  <meta charset=\"UTF-8\" />\r  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r  <title>Audio API - Home</title>\r</head>\r<body>\r  <body>\r    <div class=\"main\">\r      <div class=\"pagetitle tac\" style=\"color: #a966e7\">Bad Music App API</div>\r      <div class=\"bframe tac\">\r        <h2>A poorly serverless function written in TypeScript</h2>\r        <h3>Powered by Vercel</h3>\r      </div>\r\r      <sep></sep>\r      <h2 class=\"tac\">All available endpoint (2)</h2>\r\r      <div class=\"flexx flex\" style=\"gap: 20px\">\r        <div\r          class=\"bframe btt tac\"\r          onclick=\"window.location.replace('/lyrics')\"\r        >\r          <h2>[GET] Lyrics</h2>\r\r          <p>\r            Retrieve lyrics for Spotify tracks <br />\r            Powered by MusixMatch\r          </p>\r        </div>\r        <div\r          class=\"bframe btt tac\"\r          onclick=\"window.location.replace('/stream')\"\r        >\r          <h2>[GET] Stream</h2>\r\r          <p>\r            Generate audio stream for Spotify tracks <br />\r            Powered by Youtube, ytdl-core and yt-search\r          </p>\r        </div>\r      </div>\r      <footer>\r        © 2019-2024 BadMusicApp, LCC. All right reserve\r        <div>Running on: {serverOrigin}</div>\r      </footer>\r    </div>\r  </body>\r</body>\r",
  "/lyrics.html": "<head>\r  <meta charset=\"UTF-8\" />\r  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r  <title>Audio API - Lyrics</title>\r</head>\r<body>\r  <div class=\"main\">\r    <div class=\"pagetitle tac flex coll aictr\">\r      <div style=\"color: #a966e7\">Endpoint - [GET] Lyrics</div>\r      <a href=\"/\" style=\"font-size: 16px\">Return to homepage</a>\r    </div>\r    <div class=\"bframe\">\r      <h2>Retrieve lyrics for Spotify tracks</h2>\r      <h3>Powered by MusixMatch</h3>\r    </div>\r\r    <div class=\"btitle flex spbtw\">\r      Request link\r      <span class=\"btt\" onclick=\"copy('lyurl')\">Copy</span>\r    </div>\r    <div class=\"bframe\">\r      <span class=\"usn\">GET </span>\r      <span id=\"lyurl\">{serverOrigin}/audio?type=lyrics&id=[id]</span>\r    </div>\r\r    <div class=\"btitle flex spbtw\">\r      Response Type\r      <span class=\"btt\" onclick=\"copy('lyres')\">Copy</span>\r    </div>\r    <div class=\"bframe\">\r      <pre id=\"lyres\">\rtype LyricsResponse = {\r    language: string;\r    id: string;\r    lines: {\r        text: string;\r        time: number;\r    }[];\r}</pre\r      >\r    </div>\r\r    <!-- Example -->\r    <sep></sep>\r\r    <div class=\"btitle flex spbtw\">\r      Example - String Theocracy by Mili\r      <span class=\"btt\" onclick=\"copy('lyurla')\">Copy</span>\r    </div>\r    <div class=\"bframe\">\r      <span class=\"usn\">GET </span>\r      <span id=\"lyurla\"\r        >{serverOrigin}/audio?type=lyrics&id=7ETSUd74fhHvG2JldNVizV</span\r      >\r    </div>\r\r    <div class=\"btitle flex spbtw\">\r      Response\r      <span class=\"btt\" onclick=\"copy('lyresa')\">Copy</span>\r    </div>\r    <div class=\"bframe\">\r      <pre id=\"lyresa\">\r{\r      \"langauge\": \"en\",\r      \"id\": \"7ETSUd74fhHvG2JldNVizV\",\r      \"lines\": [\r          {\r              \"text\": \"Open the curtains\",\r              \"time\": 0.54\r          },\r          {\r              \"text\": \"Lights on\",\r              \"time\": 3.5\r          },\r          {\r              \"text\": \"Don't miss a moment of this experiment\",\r              \"time\": 5.48\r          },\r          {\r              \"text\": \"Oh, the book is strange\",\r              \"time\": 9.77\r          },\r          {\r              \"text\": \"Like clockwork orange\",\r              \"time\": 11.72\r          },\r          {\r              \"text\": \"Keep your eyes buttered 'til the end\",\r              \"time\": 13.93\r          },\r          {\r              \"text\": \"Which \\\"you\\\" are you going to be?\",\r              \"time\": 20.12\r          },\r          {\r              \"text\": \"Hm-mm-mm, inside the mirror do you see\",\r              \"time\": 23.11\r          },\r          {\r              \"text\": \"Someone else in that body?\",\r              \"time\": 28.19\r          },\r          {\r              \"text\": \"Dance for me\",\r              \"time\": 31.21\r          },\r          {\r              \"text\": \"One and two and three and turn around\",\r              \"time\": 32.33\r          },\r          {\r              \"text\": \"Sit like a doggy\",\r              \"time\": 35.47\r          },\r          {\r              \"text\": \"'Til I finish my read\",\r              \"time\": 36.85\r          },\r          {\r              \"text\": \"Cut it off, cut down your loss\",\r              \"time\": 38.62\r          },\r          {\r              \"text\": \"All that stubborn loyalty is gonna get you killed\",\r              \"time\": 41.02\r          },\r          {\r              \"text\": \"In a world built on convenient theories\",\r              \"time\": 44.18\r          },\r          {\r              \"text\": \"For all the puppets on TV\",\r              \"time\": 47.09\r          },\r          {\r              \"text\": \"There is comfort in the strings\",\r              \"time\": 49.1\r          },\r          {\r              \"text\": \"If you're gonna control me\",\r              \"time\": 51.03\r          },\r          {\r              \"text\": \"At least make it interesting theatrically\",\r              \"time\": 52.56\r          },\r          {\r              \"text\": \"How does it feel to be free?\",\r              \"time\": 59.36\r          },\r          {\r              \"text\": \"Hm-mm-mm, why don't you try it yourself?\",\r              \"time\": 62.49\r          },\r          {\r              \"text\": \"The gate opened on me\",\r              \"time\": 67.62\r          },\r          {\r              \"text\": \"So I leaped\",\r              \"time\": 70.59\r          },\r          {\r              \"text\": \"Down, down, and down I go\",\r              \"time\": 71.88\r          },\r          {\r              \"text\": \"I tell myself I'm a tough girl\",\r              \"time\": 73.36\r          },\r          {\r              \"text\": \"Down, down, and down I go\",\r              \"time\": 75.63\r          },\r          {\r              \"text\": \"I could never, ever, ever touch the soil\",\r              \"time\": 77.43\r          },\r          {\r              \"text\": \"My heart goes right\",\r              \"time\": 80.54\r          },\r          {\r              \"text\": \"My head goes left\",\r              \"time\": 82.57\r          },\r          {\r              \"text\": \"And end up on your bed\",\r              \"time\": 84.55\r          },\r          {\r              \"text\": \"Sure, I'll be your marionette\",\r              \"time\": 88.39\r          },\r          {\r              \"text\": \"Here, tug on my thread\",\r              \"time\": 90.48\r          },\r          {\r              \"text\": \"Spread me open for dolly pink, snow white artificial beauty\",\r              \"time\": 92.43\r          },\r          {\r              \"text\": \"Maybe we're all cold machines\",\r              \"time\": 96.56\r          },\r          {\r              \"text\": \"Stuffed in the human skin\",\r              \"time\": 98.9\r          },\r          {\r              \"text\": \"With human sins\",\r              \"time\": 101.17\r          },\r          {\r              \"text\": \"Sewed up by the gods of city\",\r              \"time\": 102.38\r          },\r          {\r              \"text\": \"Cut it off, you've already lost\",\r              \"time\": 104.81\r          },\r          {\r              \"text\": \"All that precious bravery is gonna get you hurt\",\r              \"time\": 107.27\r          },\r          {\r              \"text\": \"In a world that feeds on the minority\",\r              \"time\": 110.4\r          },\r          {\r              \"text\": \"May that self-centered belief lead you to peace\",\r              \"time\": 113.05\r          },\r          {\r              \"text\": \"If you're gonna replace me\",\r              \"time\": 117.34\r          },\r          {\r              \"text\": \"At least have the audacity to kill me thoroughly\",\r              \"time\": 118.95\r          },\r          {\r              \"text\": \"When does it end for me?\",\r              \"time\": 125.57\r          },\r          {\r              \"text\": \"Hm-mm-mm, I think I am done with everything\",\r              \"time\": 128.68\r          },\r          {\r              \"text\": \"Now I'm ready to leave\",\r              \"time\": 133.84\r          },\r          {\r              \"text\": \"Dragging out\",\r              \"time\": 136.97\r          },\r          {\r              \"text\": \"One line, two lines, three lines\",\r              \"time\": 137.77\r          },\r          {\r              \"text\": \"Connect our hands when I no longer can live on knowledge alone\",\r              \"time\": 140.19\r          },\r          {\r              \"text\": \"(You give me strength) Hopeful curiosity\",\r              \"time\": 145.33\r          },\r          {\r              \"text\": \"(Maybe there are still happy answers left for my discovery)\",\r              \"time\": 148.53\r          },\r          {\r              \"text\": \"What's the color of the electric sheep you see?\",\r              \"time\": 152.48\r          },\r          {\r              \"text\": \"And if you love me\",\r              \"time\": 156.66\r          },\r          {\r              \"text\": \"Can you love your everything too, for me?\",\r              \"time\": 158.52\r          },\r          {\r              \"text\": \"\",\r              \"time\": 162.52\r          }\r        ],\r}</pre\r      >\r    </div>\r\r    <footer>\r      © 2019-2024 BadMusicApp, LCC. All right reserve\r      <div>Running on: {serverOrigin}</div>\r    </footer>\r  </div>\r</body>\r",
  "/stream.html": "<head>\r  <meta charset=\"UTF-8\" />\r  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r  <title>Audio API - Stream</title>\r</head>\r<body>\r  <div class=\"main\">\r    <div class=\"pagetitle tac flex coll aictr\">\r      <div style=\"color: #a966e7\">Endpoint - [GET] Stream</div>\r      <a href=\"/\" style=\"font-size: 16px\">Return to homepage</a>\r    </div>\r    <div class=\"bframe\">\r      <h2>Retrieve audio stream for Spotify tracks</h2>\r      <h3>Powered by Youtube, ytdl-core and yt-search</h3>\r    </div>\r\r    <div class=\"btitle flex spbtw\">\r      Request link\r      <span class=\"btt\" onclick=\"copy('lyurl')\">Copy</span>\r    </div>\r    <div class=\"bframe\">\r      <span class=\"usn\">GET </span>\r      <span id=\"lyurl\">{serverOrigin}/audio?id=[id]</span>\r    </div>\r\r    <div class=\"btitle flex spbtw\">Response Type</div>\r    <div class=\"bframe\">Audio Stream</div>\r\r    <!-- Example -->\r    <sep></sep>\r\r    <div class=\"btitle flex spbtw\">\r      Example - String Theocracy by Mili\r      <span class=\"btt\" onclick=\"copy('lyurla')\">Copy</span>\r    </div>\r    <div class=\"bframe\">\r      <span class=\"usn\">GET </span>\r      <span id=\"lyurla\">{serverOrigin}/audio?id=7ETSUd74fhHvG2JldNVizV</span>\r    </div>\r\r    <div class=\"btitle flex spbtw\">Response</div>\r    <div class=\"bframe flex jcctr aictr\">\r      <audio\r        src=\"{serverOrigin}/audio?id=7ETSUd74fhHvG2JldNVizV\"\r        controls\r        style=\"width: calc(100% - 100px)\"\r      ></audio>\r    </div>\r    <sep></sep>\r    <footer>\r      © 2019-2024 BadMusicApp, LCC. All right reserve\r      <div>Running on: {serverOrigin}</div>\r    </footer>\r  </div>\r</body>\r",
  "/_index.css": "@import url(\"https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap\");\r\rbody {\r  background-color: #131313;\r  color: #fff;\r\r  display: flex;\r  align-items: center;\r  justify-content: center;\r\r  padding: 0px;\r  margin: 0px;\r\r  width: 100vw;\r  height: 100vh;\r\r  font-family: \"JetBrains Mono\", \"Consolas\", monospace;\r  font-size: 14px;\r}\r\rpre {\r  font-family: \"JetBrains Mono\", \"Consolas\", monospace;\r  margin: 0px;\r  padding: 0px;\r\r  white-space: pre-wrap;\r}\r\r.main {\r  width: 60%;\r  height: 100%;\r\r  overflow-y: auto;\r  overflow-x: hidden;\r\r  display: block;\r\r  padding-right: 40px;\r}\r\r.pagetitle {\r  font-size: 3em;\r  font-weight: 800;\r\r  display: block;\r  padding: 30px;\r}\r\r.bframe {\r  width: calc(100% - 44px);\r  min-height: 20px;\r  padding: 20px;\r\r  border: 2px solid #fff;\r  display: block;\r}\r\r.btitle {\r  font-weight: bold;\r  font-size: 1.2em;\r\r  margin: 30px 0 10px 0;\r}\r\r.tac {\r  text-align: center;\r}\r\r.flex {\r  display: flex;\r}\r\r.aictr {\r  align-items: center;\r}\r\r.jcctr {\r  justify-content: center;\r}\r\r.spbtw {\r  justify-content: space-between;\r}\r\r.coll {\r  flex-direction: column;\r}\r\r.flexx {\r  flex: 1;\r}\r\r.bframe.btt:hover {\r  border-color: #ff0;\r  cursor: pointer;\r}\r\r.btt:hover {\r  color: #ff0;\r  cursor: pointer;\r}\r\ra {\r  color: #fff;\r  text-decoration: underline;\r}\r\ra:hover {\r  color: #ff0;\r}\r\r.usn {\r  user-select: none;\r  font-weight: bold;\r  font-size: 1.1em;\r}\r\rdiv::-webkit-scrollbar {\r  width: 10px;\r  height: 5px;\r}\r\rdiv::-webkit-scrollbar-thumb {\r  background-color: #fff;\r}\r\rsep {\r  display: block;\r  height: 50px;\r}\r\r.cyan {\r  /* color: cyan; */\r  color: #1b6fc2;\r}\r\rfooter {\r  padding: 30px;\r  text-align: center;\r\r  border-top: 2px solid #fff;\r  margin-top: 50px;\r}\r\r.nowrap {\r  white-space: nowrap;\r}\r",
  "/_index.js": "function clip(a) {\r  if (!a || !a.length) alert(\"nothing to save\");\r  else {\r    try {\r      navigator.clipboard.writeText(a);\r      alert(`Saved to clipboard`);\r    } catch (err) {\r      try {\r        const txte = document.createElement(\"span\");\r        txte.innerText = a;\r        txte.select();\r\r        document.execCommand(\"copy\");\r        txte.remove();\r        alert(`Saved to clipboard`);\r      } catch (err) {\r        alert(\"Failed to copy\");\r      }\r    }\r  }\r}\r\rfunction copy(id) {\r  try {\r    const txte = document.getElementById(id);\r    clip(txte.innerText);\r  } catch (err) {\r    console.error(err);\r    alert(\"Failed to copy\");\r  }\r}\r"
};


export default publicFiles;