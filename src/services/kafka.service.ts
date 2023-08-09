import { logger } from '@/utils/logger';
import { ConfigSource, Consumer, Kafka, Producer } from 'kafkajs';
import { v4 } from 'uuid';

export class KafkaProducerService {
    private producerClient: Producer;
    constructor() {
        console.log('kafka was initailised');
        this.connect();
    }

    private async connect(): Promise<void> {
        const kafkaConfigInit = new Kafka({
            clientId: 'kafka-producer',
            brokers: ['pkc-7prvp.centralindia.azure.confluent.cloud:9092'],
            sasl: {
                password: 'LIc8cXDbBiaXXR/2mjVzRS1liNHOZpzhLhVIXjmcDVki48DYHRXcPuUAMnAnLze3',
                username: 'WY2YRPNQ4VPEAJFZ',
                mechanism: 'plain',
            },
            ssl: true,
        });
        const producerClient = kafkaConfigInit.producer();
        await producerClient.connect();
        this.producerClient = producerClient;
    }

    async produceMessage(singleChunk: any[], topicName: string): Promise<void> {
        this.producerClient.on('producer.disconnect', async () => {
            console.log('producer was disconnected, reconnecting producer ');
            await this.connect();
        });

        this.producerClient.on('producer.connect', async connecteEvent => {
            console.log(connecteEvent);
            // await this.connect();
        });

        process.on('SIGKILL', () => {
            this.producerClient.disconnect();
        });

        await this.producerClient.send({
            topic: topicName,
            messages: singleChunk.map(item => {
                return {
                    value: JSON.stringify({ actualMessage: item, messageId: v4(), timestamp: new Date().toUTCString() }),
                };
            }),
        });
    }
}

// export class KafkaConsumerService {
//     private consumerClient: Consumer;
//     private topicName: string;
//     private callBackFunction: Function;
//     constructor(topicName: string, onMessageRecivedCallbackFunction: Function) {
//         console.log('kafka consumer was initailised');
//         this.topicName = topicName;
//         this.callBackFunction = onMessageRecivedCallbackFunction;
//         this.connect();
//     }

//     private async connect(): Promise<void> {
//         const kafkaConfigInit = new Kafka({
//             clientId: 'kafka-consumer',
//             brokers: ['pkc-7prvp.centralindia.azure.confluent.cloud:9092'],
//             sasl: {
//                 password: 'LIc8cXDbBiaXXR/2mjVzRS1liNHOZpzhLhVIXjmcDVki48DYHRXcPuUAMnAnLze3',
//                 username: 'WY2YRPNQ4VPEAJFZ',
//                 mechanism: 'plain',
//             },
//             ssl: true,
//         });
//         const consumerClient = kafkaConfigInit.consumer({ groupId: 'sms-consumer-group', sessionTimeout: 900000 });
//         await consumerClient.connect();
//         await consumerClient.subscribe({ topics: [this.topicName], fromBeginning: true });
//         this.consumerClient = consumerClient;

//         console.log('connect method');
//         this.consumerClient.on('consumer.connect', async () => {
//             console.log('consumer was connected');
//         });

//         this.consumerClient.on('consumer.disconnect', async connecteEvent => {
//             console.log('consumer was disconnected');
//             // await this.connect(); // reconnect
//         });

//         this.consumerClient.on('consumer.crash', event => {
//             console.log('=========CONSUMER.CRASH=========');
//             console.log(event);
//             console.log('=========CONSUMER.CRASH=========');
//         });
//         this.consumerClient.on('consumer.disconnect', event => {
//             console.log('========CONSUMER.DISCONNECT==========');
//             console.log(event);
//             console.log('========CONSUMER.DISCONNECT==========');
//         });
//         this.consumerClient.on('consumer.heartbeat', event => {
//             console.log('========CONSUMER.HEARTBEAT==========');
//             console.log(event);
//             console.log('========CONSUMER.HEARTBEAT==========');
//         });
//     }

//     async consumeMessage(singleChunk: any[], topicName: string): Promise<void> {
//         this.consumerClient.on('consumer.connect', async () => {
//             console.log('consumer was connected');
//             // await this.connect();
//         });

//         this.consumerClient.on('consumer.disconnect', async connecteEvent => {
//             console.log('consumer was disconnected');
//             // await this.connect(); // reconnect
//         });

//         // When process was killed
//         process.on('SIGKILL', () => {
//             this.consumerClient.disconnect();
//         });

//         await this.consumerClient.run({
//             eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
//                 console.log('message was recieved');
//                 // this.callBackFunction({ topic, partition, message, heartbeat, pause });
//                 logger.info('message was recieved');
//             },
//         });
//     }
// }
