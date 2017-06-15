(function() {
    var btnGetPolls = document.getElementById("get-polls");
    var allPolls = document.getElementById("all-polls");
    var apiUrl = window.location.protocol + "//" + window.location.hostname + "/get-polls";

    //Function to check when the document is fully loaded
    function ready (fn) {
        if (typeof fn !== 'function') {
            return;
        }
        if (document.readyState === 'complete') {
            return fn();
        }

        document.addEventListener('DOMContentLoaded', fn, false);
    }
    function showPolls(data) {
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            var onePoll = '<a href="/polls/' + data[i]._id + '"><div class="one-poll"><h1>' + data[i].title +'</h1>Number of votes: ' + data[i].votes.reduce(function(a, b){return a+b;}) + '</div></a>';
            allPolls.innerHTML += onePoll;
        }
        //allPolls.innerHTML = data;
    }
    
    
    btnGetPolls.addEventListener("click", (e) => {
        allPolls.innerHTML = "";
        ajaxRequest('GET', apiUrl, showPolls);
    });
    
    ready(ajaxRequest('GET', apiUrl, showPolls));
})();