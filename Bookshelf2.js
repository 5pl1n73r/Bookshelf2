function Book (bookTitle, authorName, score) {
	this.bookTitle = bookTitle;
	this.authorName = authorName;
	this.score = score;
}

var currentBookName;
var currentAuthorName;
var currentScore;
var w;
var to;
var bookArray = [];
var date = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
window.onload = createDate()

setTimeout(function(){
	startWorker()
}, 500);

function startWorker() {
	if(typeof(Worker) !== "undefined") {
		if(typeof(w) == "undefined") {
			w = new Worker("worker.js");
		}
		w.onmessage = function(event) {
			document.getElementById("result").innerHTML = event.data;
		};
	} else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support web workers...";
	}
}

function createDate() {
	var m = month[date.getMonth()];
	var d = date.getDate()
	var y = date.getFullYear()
	var a = "th"
		if (d == 1 || d == 21 || d == 31){
			a = st
		}
		if (d == 2 || d == 22) {
			a = nd
		}
		if (d == 3 || d == 23) {
			a = rd
		}
	date = (m + " " + d + a +", " + y)
	}

setTimeout(function(){
	if (localStorage.getItem("bookArray") == null || localStorage.getItem("bookArray").length == 0) {
		localStorage.setItem("bookArray", "[]");
	} else {
		bookArray = JSON.parse(localStorage.getItem("bookArray"));
		buildListFromArray(bookArray);
	}
}, 1000);

function showDiv() {
	document.getElementById('input').style.display = "block";
	document.getElementById("bookTitle").focus();
}

function reset() {
	document.getElementById('bookTitle').value = "";
	document.getElementById('bookTitle').style.borderColor = "";
	document.getElementById('authorName').value = "";
	document.getElementById('authorName').style.borderColor = "";
	document.getElementById('score').value = "";
	document.getElementById('score').style.borderColor = "";
}

function removeItem(e) {
	var i = 0;
	var child = e.target.parentElement;
	while( (child = child.previousSibling) != null ) {
		i++;
	};
	bookArray.splice(i-3,1);
	localStorage.setItem("bookArray", JSON.stringify(bookArray));
	e.target.parentElement.remove();
}

function submitEdit(e) {
	if (e.which == 27) {
		e.target.parentElement.parentElement.children[3].value = "edit";
		e.target.parentElement.parentElement.children[3].setAttribute("src", "Images/edit.png")
		var li = e.target.parentElement.parentElement;
		li.children[0].innerHTML = currentBookName;
		li.children[1].innerHTML = currentAuthorName;
		li.children[2].innerHTML = currentScore;
	}
}

function editItem(e) {
	if (e.target.value == "save") {
		var li = e.target.parentElement;
		var i = 0;
		var child = e.target.parentElement;
		var bookName = li.children[0].children[0].value;
		var authorName = li.children[1].children[0].value;
		var score = li.children[2].children[0].value;
		if (bookName == '') {
			alert("Must input title");
			li.children[0].children[0].style.borderColor = "red";
			document.getElementById("editBookTitle").focus();
			return;
		}
		else {
			li.children[0].children[0].style.borderColor = "";
		};
		if (authorName == '') {
			alert("Must input name");
			li.children[1].children[0].style.borderColor = "red";
			document.getElementById("editAuthorName").focus();
			return;
		}
		else {
			li.children[1].children[0].style.borderColor = "";
		};
		if (isNaN(score) || score =='') {
			alert("Must input numbers");
			li.children[2].children[0].style.borderColor = "red";
			document.getElementById("editScore").focus();
			return;
		}
		else {
			li.children[2].children[0].style.borderColor = "";
		};
		if (score > 10 || score < 1){
			alert("Score must be between 1-10")
			li.children[2].children[0].style.borderColor = "red";
			document.getElementById("editScore").focus();
			return;
		}
		else {
			li.children[2].children[0].style.borderColor = "";
			if (score<4){
				li.className = "red";
			}
			if (score>3 && score<8){
				li.className = "yellow";
			}
			if (score>7){
				li.className = "green";
			}
		}
		while( (child = child.previousSibling) != null ) {
			i++;
		};
		bookArray[i-3].authorName = authorName;
		bookArray[i-3].bookTitle = bookName;
		bookArray[i-3].score = score;
		localStorage.setItem("bookArray", JSON.stringify(bookArray));
		
		li.children[0].innerHTML = bookName;
		li.children[1].innerHTML = authorName;
		li.children[2].innerHTML = score;

		e.target.value = "edit";
		e.target.setAttribute("src", "Images/edit.png")
	} 
	else {

		var title = e.target.parentElement.children[0];
		currentBookName = title.innerHTML;
		var newInputt = document.createElement("input");
		newInputt.setAttribute("value", title.innerHTML);
		newInputt.setAttribute("onkeyup", "submitEdit(event)");
		newInputt.setAttribute("class", "editInputs");
		newInputt.setAttribute("id", "editBookTitle");
		title.innerHTML = '';
		title.appendChild(newInputt);

		var author = e.target.parentElement.children[1];
		currentAuthorName = author.innerHTML;
		var newInputa = document.createElement("input");
		newInputa.setAttribute("value", author.innerHTML);
		newInputa.setAttribute("onkeyup", "submitEdit(event)");
		newInputa.setAttribute("class", "editInputs");
		newInputa.setAttribute("id", "editAuthorName");
		author.innerHTML = '';
		author.appendChild(newInputa);

		var score = e.target.parentElement.children[2];
		currentScore = score.innerHTML;
		var newInputs = document.createElement("input");
		newInputs.setAttribute("value", score.innerHTML);
		newInputs.setAttribute("onkeyup", "submitEdit(event)");
		newInputs.setAttribute("class", "editInputs");
		newInputs.setAttribute("id", "editScore");
		score.innerHTML = '';
		score.appendChild(newInputs);

		e.target.value = "save";
		e.target.setAttribute("src", "Images/save.png");
	}
}

function search() {
	if (to) {
		clearTimeout(to);
	}
	to = setTimeout(function(){
		resetListSearch();
		var searchResults = [];
		var nameToSearchFor = document.getElementById("searchName").value;
		for (var i=0;i<bookArray.length;i++) {
			if (bookArray[i].bookTitle.indexOf(nameToSearchFor) > -1 || bookArray[i].authorName.indexOf(nameToSearchFor) > -1 ) {
				searchResults.push(bookArray[i]);
			}
		};
		if (searchResults.length==0) {
			document.getElementById('searchNotFound').style.display = "block";
		}
		if (searchResults.length > 0) {
			document.getElementById('searchNotFound').style.display = "none";
		}
		buildListFromArray(searchResults);
	}, 500)
	
}

function buildListFromArray(searchResults) {
	for (var i=0;i<searchResults.length;i++) {
		addToList(searchResults[i]);
	}
}

function clearSearch() {
	resetListSearch();
	document.getElementById("searchName").value = "";
	buildListFromArray(bookArray);
	document.getElementById('searchNotFound').style.display = "none";
}

function addBookEnter(e) {
	var key=e.keyCode;
	if (key==13){
		addBook()
	}
}

function addBook () {
	var z=document.getElementById('bookTitle').value;
	if (z == '') {
		alert("Must input title");
		document.getElementById('bookTitle').style.borderColor = "red";
		document.getElementById("bookTitle").focus();
		return;
	}
	else {
		document.getElementById('bookTitle').style.borderColor = "";
	};
	var y=document.getElementById('authorName').value;
	if (y == '') {
		alert("Must input name");
		document.getElementById('authorName').style.borderColor = "red";
		document.getElementById("authorName").focus();
		return;
	}
	else {
		document.getElementById('authorName').style.borderColor = "";
	};
	var x=document.getElementById('score').value;
	if (isNaN(x) || x =='') {
		alert("Must input numbers");
		document.getElementById('score').style.borderColor = "red";
		document.getElementById("score").focus();
		return;
	}
	else {
		document.getElementById('score').style.borderColor = "";
	};
	if (x > 10 || x < 1){
		alert("Score must be between 1-10")
		document.getElementById('score').style.borderColor = "red";
		document.getElementById("score").focus();
		return;
	}
	else {
		document.getElementById('bookTitle').style.borderColor = "";
	};
	var book = new Book(
		document.getElementById('bookTitle').value, 
		document.getElementById('authorName').value, 
		document.getElementById('score').value
		);
	bookArray.push(book)
	localStorage.setItem("bookArray", JSON.stringify(bookArray));
	addToList(book);
	reset();
	document.getElementById("bookTitle").focus();
	document.getElementById('searchNotFound').style.display = "none";
	document.getElementById("searchName").value = "";
}

function finish() {
	document.getElementById('input').style.display = "none";
}

function addToList (book) {
	var newElement = document.createElement("li");
	if (book.score<4){
		newElement.setAttribute("class", "red")
	}
	if (book.score>3 && book.score<8){
		newElement.setAttribute("class", "yellow")
	}
	if (book.score>7){
		newElement.setAttribute("class", "green")
	}
	var bookTitleDiv = document.createElement("div");
	bookTitleDiv.innerHTML = book.bookTitle;
	bookTitleDiv.className = "center";
	var bookAuthorDiv = document.createElement("div");
	bookAuthorDiv.innerHTML = book.authorName;
	bookAuthorDiv.className = "center";
	var scoreDiv = document.createElement("div");
	scoreDiv.innerHTML = book.score;
	scoreDiv.className = "center";
	var edit = document.createElement("input");
	edit.setAttribute("type", "image");
	edit.setAttribute("src", "Images/edit.png");
	edit.setAttribute("style", "width:20px;margin-left:65;");
	edit.setAttribute("onclick", "editItem(event)");
	edit.className = "center";
	var x = document.createElement("input");
	x.setAttribute("type", "image");
	x.setAttribute("src", "Images/trash.png");
	x.onclick = removeItem;
	x.className = "right";
	var dateDiv = document.createElement("div");
	dateDiv.innerHTML = date;
	dateDiv.className = "date";
	newElement.appendChild(bookTitleDiv)
	newElement.appendChild(bookAuthorDiv)
	newElement.appendChild(scoreDiv)
	newElement.appendChild(edit)
	newElement.appendChild(x);
	newElement.appendChild(dateDiv);
	var ul = document.getElementById("bookList");
	ul.appendChild(newElement);
};

function resetListSearch() {
	var parent = document.getElementById("bookList");
	parent.innerHTML = '';
	var newElement = document.createElement("li");
	newElement.className = "header";
	var bookTitleDiv = document.createElement("div");
	bookTitleDiv.innerHTML = "Title";
	bookTitleDiv.className = "left";
	var bookAuthorDiv = document.createElement("div");
	bookAuthorDiv.innerHTML = "Author";
	bookAuthorDiv.className = "center";
	var scoreDiv = document.createElement("div");
	scoreDiv.innerHTML = "Score";
	scoreDiv.className = "center";
	var editDiv = document.createElement("div");
	editDiv.innerHTML = "Edit";
	editDiv.className = "center";
	var xDiv = document.createElement("div");
	xDiv.innerHTML = "Delete";
	xDiv.className = "right";
	newElement.appendChild(bookTitleDiv);
	newElement.appendChild(bookAuthorDiv);
	newElement.appendChild(scoreDiv);
	newElement.appendChild(editDiv);
	newElement.appendChild(xDiv);
	var ul = document.getElementById("bookList");
	ul.appendChild(newElement);
};

function resetList() {
	var parent = document.getElementById("bookList");
	parent.innerHTML = '';
	var newElement = document.createElement("li");
	newElement.className = "header";
	var bookTitleDiv = document.createElement("div");
	bookTitleDiv.innerHTML = "Title";
	bookTitleDiv.className = "left";
	var bookAuthorDiv = document.createElement("div");
	bookAuthorDiv.innerHTML = "Author";
	bookAuthorDiv.className = "center";
	var scoreDiv = document.createElement("div");
	scoreDiv.innerHTML = "Score";
	scoreDiv.className = "center";
	var editDiv = document.createElement("div");
	editDiv.innerHTML = "Edit";
	editDiv.className = "center";
	var xDiv = document.createElement("div");
	xDiv.innerHTML = "Delete";
	xDiv.className = "right";
	newElement.appendChild(bookTitleDiv);
	newElement.appendChild(bookAuthorDiv);
	newElement.appendChild(scoreDiv);
	newElement.appendChild(editDiv);
	newElement.appendChild(xDiv);
	var ul = document.getElementById("bookList");
	ul.appendChild(newElement);
	bookArray = [];
	localStorage.setItem("bookArray", JSON.stringify(bookArray));

};
