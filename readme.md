To start webclient:

To run webclient locally you need node and npm on your machine. https://nodejs.org/en/

Then move to webclient root and run: 'npm install' and then 'npm start' 

Then surf in to 'localhost:8090' 

Connect a snakebot to localhost:8080 (and make sure the startGame() method is removed first), 
after that you can run your games from the webclient instead!
 
To build Docker image:
```
> docker build -t snake-web-client .
```

To run:
```
> docker run -it --rm --name snake-web-client -p 8090:8090 snake-web-client
```