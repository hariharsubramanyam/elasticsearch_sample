/**
 * NOTE: In order for this code to be able to make requests to ElasticSearch,
 * you need to enable cross-origin requests on ElasticSearch. To do that, you
 * need to edit <elasticsearch_dir>/config.elasticsearch.yml and append the
 * following lines:
 * http.cors.enabled : true
 * http.cors.allow-origin : "*"
 * http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
 * http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length
 *
 * Also, to load the sample data into ElasticSearch, launch your ElasticSearch node and execute:
 * curl -XPOST 'localhost:9200/bank/account/_bulk?pretty&refresh' --data-binary "@accounts.json"
 */

(function() {
  var client = null;

  // This performs a full-text search for the given search term and
  // executes the given callback(error, response).
  var performSearch = function(term, callback) {
    if (client === null) {
      callback(new Error("Client not yet initialized"));
    } else {
      client.search({
        "index": CONFIG.indexName,
        "body": {
          "query": {
            "match": {
              "_all": term
            }
          }
        }
      }, callback)
    }
  };

  $(document).on("click", "#searchButton", function() {
    var term = $("#searchTerm").val();
    performSearch(term, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        var listHtml = response.hits.hits.map(function(hit) {
          return JSON.stringify(hit);
        }).map(function(stringifiedHit) {
          return "<li>" + stringifiedHit + "</li>";
        }).reduce(function(aggregateHtml, listElement) {
          return aggregateHtml + listElement;
        }, "");
        $("#searchResults").html(listHtml);
      }
    });
  });

  $(document).ready(function() {
    client = new $.es.Client({
      hosts: 'http://localhost:9200'
    });
  });
})();
