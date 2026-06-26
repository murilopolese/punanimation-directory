# Run Keystone

```
# /
npm start
```

Environment variables:

```
COOKIE_SECRET=
MONGO_URL=
```

# Run Frontend code

```
# /public
npm start
```

# With Docker compose

```
docker compose up -d
```

Tear down:

```
docker compose down --rmi all
```

# Build and push

```
docker build -t murilopolese/panimation:latest
docker push murilopolese/panimation:latest
```
