# elasticsearch_sample

To use this, first open your `<elasticsearch_dir>/config/elasticsearch.yml` file and append the following lines.

```
http.cors.enabled : true
http.cors.allow-origin : "*"
http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length
```

The above configuration lets ElasticSearch accept cross-origin requests.

Next, launch ElasticSearch with

```
<elasticsearch_dir>/bin/elasticsearch
```

Then, load the sample data into the `bank` index with:

```
curl -XPOST 'localhost:9200/bank/account/_bulk?pretty&refresh' --data-binary "@accounts.json"
```

After that, launch a Python web server to serve the index.html file with

```
# Python 3
python -m http.server
```

or 

```
# Python 2
python -m SimpleHTTPServer
```

Finally, navigate to [http://localhost:8000](http://localhost:8000) and issue a search (e.g. "Neptune").
