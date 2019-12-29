var express = require('express');
var router = express.Router();
const Kafka = require('kafka-node');
const config = require('../config');
let util = require("util");

const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({ kafkaHost: "localhost:9000" });
const producer = new Producer(client, { requireAcks: 0, partitionerType: 2 });
var producerReady = null;
producer.on('ready', async function () {
  producerReady = producer;
})


const pushDataToKafka = (dataToPush, callback) => {

  try {
    let payloadToKafkaTopic = [{ topic: "test", messages: JSON.stringify(dataToPush) }];
    console.log(payloadToKafkaTopic);
    producerReady.send(payloadToKafkaTopic, (err, data) => {
      console.log('data: ', data);
      return callback(data);
      // producer.on('error', function (err) {
      //   //  handle error cases here
      //   return callback(err);
      // })
    })
  }
  catch (error) {
    console.log(error);
    return callback(error);
  }

};



/* GET users listing. */
router.get('/:username', function (req, res, next) {
  var momo = Object.assign(res, {});
  pushDataToKafka({ username: req.params.username, res: momo }, (result => {
    console.log(result);
  }));
});

module.exports = router;
