URL=https://jhj6y3posh.execute-api.us-east-1.amazonaws.com/dev/graphql
URL=http://localhost:3000/dev/graphql

curl $URL \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"mutation{createHero, createSkill}"}' --compressed

curl $URL \
    -H 'Content-Type: application/json' \
    --data-binary '{"query":"{getHero, getSkill}"}' --compressed