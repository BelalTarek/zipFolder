const Kafka = require('kafka-node');
const config = require('./config');

const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({ kafkaHost: "localhost:9000" });
const producer = new Producer(client, { requireAcks: 0, partitionerType: 2 });



const pushDataToKafka = (dataToPush, callback) => {

    try {
        let payloadToKafkaTopic = [{ topic: "test", messages: dataToPush }];
        console.log(payloadToKafkaTopic);
        producer.on('ready', async function () {
            producer.send(payloadToKafkaTopic, (err, data) => {
                console.log('data: ', data);
                return callback(data); aa
            });

            producer.on('error', function (err) {
                //  handle error cases here
                return callback(err);
            })
        })
    }
    catch (error) {
        console.log(error);
        return callback(error);
    }

};
function pushDataToKafkaBroker(msg, callback) {
    pushDataToKafka(msg, () => { });
};
module.exports = pushDataToKafkaBroker;


