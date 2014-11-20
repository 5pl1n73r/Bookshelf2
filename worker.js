var i = 0

function countSeven() {
	i = i + 7;
	postMessage(i);
	setTimeout(timedCount,1000)
}

timedCount();
