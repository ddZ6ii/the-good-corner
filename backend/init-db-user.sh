#!/usr/bin/env zsh
# Make sure to add permissions to execute this file by running `chmod +x init-db.sh``
docker exec -i tgc-db psql -U thegoodcorner -d tgc < ./dump-user.sql