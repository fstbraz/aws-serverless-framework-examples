const AWS = require('aws-sdk')
class Handler{

    constructor({sqsSvc, s3Svc}){
        this.s3Svc = s3Svc
        this.sqsSvc = sqsSvc
        this.queueName = process.env.SQS_QUEUE
    }

    static getSdks(){
        const host = process.env.LOCALSTACK_HOST || 'localhost'
        const s3port = process.env.S3_PORT || '4572'
        const sqsPort = process.env.SQS_PORT || '4576'
        const isLocal = process.env.isLocal
        const s3endpoint = new AWS.Endpoint(
            `http://${host}:${s3port}`
        )
        const s3config = {
            endpoint: s3endpoint,
            s3ForcePathStyle: true 
        }

        const sqsEndpoint = new AWS.Endpoint(
            `http://${host}:${sqsPort}`
        )

        const sqsConfig = {
            endpoint: sqsEndpoint 
        }

        if(!isLocal){
            delete s3config.endpoint
            delete sqsConfig.endpoint
        }

        return {
            s3: new AWS.S3(s3config),
            sqs: new AWS.SQS(sqsConfig)
        }
    }

    async getQueueUrl(){
        const { QueueUrl } = await this.sqsSvc.getQueueUrl({
            QueueName: this.queueName
        }).promise()

        return QueueUrl
    }

    async main(event){
        const [
            {
                s3: {
                    bucket: {
                        name
                    },
                    object: {
                        key
                    }
                }
            }
        ] = event.Records

        console.log('processing', name, key)
        try {
            console.log('getting queue url...')
            const queueUrl = await this.getQueueUrl();
            const params = {
                Bucket: name, Key: key
            }
            this.s3Svc.getObject(params)
                .createReadStream()
                .on("data", msg => console.log('data!', msg.toString()))
                .on("error", msg => console.log('error!', msg.toString()))
                .on("close", msg => console.log('close!', msg.toString()));

            return {
                statusCode: 200,
                body: 'Hello'
            }
        } catch (error){
            console.log('**error', error.stack)
            return {
                statusCode: 500,
                body: 'Internal Server Error'
            }
        }
    }
}

const { s3, sqs } = Handler.getSdks()
const handler = new Handler({
    sqsSvc: sqs,
    s3Svc: s3
})
module.exports = handler.main.bind(handler)