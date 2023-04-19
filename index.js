const express = require("express");
const models = require("express-cassandra");

const app = express();

//Tell express-cassandra to use the models-directory, and
//use bind() to load the models using cassandra configurations.
models.setDirectory( __dirname + '/models').bind(
    {
        clientOptions: {
            contactPoints: ['127.0.0.1'],
            localDataCenter: 'datacenter1',
            protocolOptions: { port: 9042 },
            keyspace: 'mykeyspace',
            queryOptions: {consistency: models.consistencies.one},
            socketOptions: { readTimeout: 60000 },
        },
        ormOptions: {
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            migration: 'safe'
        }
    },
    function(err) {
        if(err) throw err;

        // You'll now have a `person` table in cassandra created against the model
        // schema you've defined earlier and you can now access the model instance
        // in `models.instance.Person` object containing supported orm operations.
    }
);


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
