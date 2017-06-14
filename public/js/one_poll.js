function deletedPoll(data) {
    if (data === "error") window.location = baseUrl + "/polls/" + pollId
    else window.location = baseUrl;
}

var baseUrl = window.location.protocol + "//" + window.location.host;

var pollId = window.location.pathname.split("/")[2];
var pollOptions = document.getElementsByClassName("poll-options");
var pollVotes = document.getElementsByClassName("poll-votes");
var pollOptionsArr = [];
var pollVotesArr = [];

for (var i = 0; i < pollOptions.length; i++) {
    pollOptionsArr.push(pollOptions[i].innerHTML);
    pollVotesArr.push(pollVotes[i].innerHTML);
}

var apiUrl = baseUrl + "/polls/" + pollId;

var btnDelete = document.getElementById("btn-delete");
btnDelete.addEventListener("click", (e) => {
    btnDelete.innerText  = "Please wait...";
    btnDelete.disabled = "true";
    e.preventDefault();
    ajaxRequest('DELETE', apiUrl, deletedPoll);
});


//Plotting
var ctx = document.getElementById("poll-chart");
var grd=ctx.getContext("2d").createLinearGradient(0,0,170,0);
grd.addColorStop(0,"black");
grd.addColorStop(1,"white");

var myChart = new Chart(ctx, {
    type: "pie",
    data:  {
        labels: pollOptionsArr,
        datasets: [{
            data: pollVotesArr,
            backgroundColor: ['#332288', '#6699cc', '#88ccee', '#44aa99', '#117733', '#999933', '#ddcc77',
'#661100', '#cc6677', '#aa4466', '#882255', '#aa4499']
        }]
    }

});
/*
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        labels: pollOptionsArr,
        datasets: [{
            label: '# of Votes',
            data: pollVotesArr,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
*/