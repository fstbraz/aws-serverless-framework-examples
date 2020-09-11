# install serverles framework
npm i -g serverless

# inicialize sls
sls

# deploy sls
sls deploy

# AWS invoke
sls invoke -f hello

# local invoke
sls invoke local -f hello --log

# configure dashboard
sls

#logs
sls logs -f hello -t