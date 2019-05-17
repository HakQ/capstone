Usmaan Sahak -> Solr and Mongodb database configuration, maintanence, and administration



Work here mostly relied on modifying the schemas, collections, and configuration files of Apache Solr and MongoDb and then configuring Mongo-Connector to keep the two in sync. 

Once that is done, api calls are provided for the backend to access data in a quick and efficient manner.


In order to administrate, one must 'ssh' into the EC2 instance at the domain listed by Amazon, and with a secret key store. 

ssh -i /path/to/keypairfile.pem youruser@blahblahblah.amazonaws.com


Once done, I can start, stop, configure, and inspect our in house data sources. We use Mongodb as the main data store, but also use Solr for search and fast data query. They are in sync through a mongo-connector configuration setup.


Important modifications and configurations to Solr include the managed-schema and the solrconfig.xml files.

Mongodb is made to be open to bind to the ip of the snapchaching backend, and is generally configured through the mongo shell. 


