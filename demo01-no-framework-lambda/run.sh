#1 - create security policy file
#2 - create security role from aws

aws iam create-role \
    --role-name example-lambda \
    --assume-role-policy-document file://politics.json \
    | tee logs/role.log

#3 - create file with content and zip it
zip function.zip index.js

#4 - create lambda function
aws lambda create-function \
    --function-name hello-cli \
    --zip-file fileb://function.zip \
    --handler index.handler \
    --runtime nodejs12.x \
    --role arn:aws:iam::052330205372:role/example-lambda \
    | tee logs/lambda-create.log

# 5 - invoke lambda
aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-exec.log

# 6 - zip to update
zip function.zip index.js

# 7 - update
aws lambda update-function-code \
    --zip-file fileb://function.zip \
    --function-name hello-cli \
    --publish \
    | tee logs/lambda-update.log

# 8 - invoke lambda
aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-exec-update.log

# 9 - delete function
aws lambda delete-function \
    --function-name hello-cli

# 10 - delete role
aws iam delete-role \
    --role-name example-lambda 