const redisClient = require('./utils/redis');

async function testRedis() {
    console.log('Checking if Redis is alive:', await redisClient.isAlive());

    console.log('Setting key "myKey" to value "myValue" with expiration of 10 seconds');
    await redisClient.set('myKey', 'myValue', 10);

    console.log('Getting value of key "myKey":', await redisClient.get('myKey'));

    console.log('Deleting key "myKey"');
    await redisClient.del('myKey');

    console.log('Getting value of key "myKey" after deletion:', await redisClient.get('myKey'));
}

testRedis();

