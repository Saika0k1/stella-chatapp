# STELLA Chat App
## Quick Start
1. To get this app running, first clone this repository.

```
HTTPS:
git clone https://github.com/Saika0k1/norditech-chatapp-assignment.git

SSH:
git clone git@github.com:Saika0k1/norditech-chatapp-assignment.git

GitHub CLI:
gh repo clone Saika0k1/norditech-chatapp-assignment
```

2. Navigate to the repository in a new terminal and follow STELLA's [https://docs.stellaframework.com/Getting_Started.html](Getting Started) guide up until Step 5. 

3. Once the server has started, in the first terminal, navigate to `chat-app` folder and run: 

```npm install```

then start the app by running:

```npm run dev```

## Notes 
This was a really fun and insightful project to work on, and it is my first time working with Nuxt.js (albeit not my first time with Vue.js) and Socket.io. I first planned what I wanted in a Kantan board in Obsidian (similar to Trello), planning out the needs, the wants, etc. Then I looked into Vue.js and relearning it since I have not worked with it for a long time. I first started with working with pages that needs the STELLA API, like the login page, the main page, etc. And I saved Socket.io part for last, this includes connecting to the Socket server, sending and recieving messages from STELLA. As for the design and layout of the app, I took heavy inspirations from Chat GPT and Discord.

I ran into many problems but the most notable one is figuring out how Socket.io works in Nuxt.js. I first had to look at STELLA's source code and see how the developers did it, then try to translate it into JavaScript. However, getting Socket.io to work in Nuxt.js proved to be more of a challenge than I thought it would be, mainly due to the lack of online examples/tutorials on this specific duo. I ended up turning to the [https://nuxt-socket-io.netlify.app/](nuxt-socket-io) which works best in Options API version of Vue 3, however I had been using Composition API for most of the project so it was a little headache to get them to integrate with each other, but it was a really good learning opportunity since I got to learn both Options API and Composition API that way. 

Naturally I ran into many more problems, feel free to ask about them during the next meeting! I'd love to get more into them but I don't want this supposedly short note to become too long. 
