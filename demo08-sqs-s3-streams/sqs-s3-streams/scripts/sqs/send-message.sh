QUEUE_URL=$1
echo 'Sending message' $QUEUE_URL

aws \
    sqs send-message \
    --queue-url $QUEUE_URL \
    --message-body 'Yellow message example'
    --endpoint-url=http://localhost:4576

aws \
    sqs receive-message \
    --queue-url $QUEUE_URL \
    --endpoint-url=http://localhost:4576
