# Migration from dokku

On the server:

```
dokku mongo:export panimation-directory-db --archive > /dump/dump-2026-06-26.gz
```

Copy dump to local computer:

```
scp -i "permission.pem" user@server:/dump/dump-2026-06-26.gz ./dump/dump-2026-06-26.gz
```

On local docker environment:

```
docker compose exec mongo mongorestore --archive=/dump/dump-2026-06-26.gz --gzip
```

This imports to the wrong database but with MongoDB Compass:

1. Export the collections as json
2. Import the collections in the correct place