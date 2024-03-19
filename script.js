let W, H;

let images;

let fps = 60;
let interval;
let currentId = 0;
let start;
let delay0 = 2000, delay1 = 5000;
let left, right;

// from SO/q/13382516
function getScrollbarWidth() {
	// Creating invisible container
	const outer = document.createElement('div');
	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll'; // forcing scrollbar to appear
	outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
	document.body.appendChild(outer);

	// Creating inner element and placing it in the container
	const inner = document.createElement('div');
	outer.appendChild(inner);

	// Calculating difference between container's full width and the child width
	const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

	// Removing temporary elements from the DOM
	outer.parentNode.removeChild(outer);

	return scrollbarWidth;
}

smoothstep = t => {return (3-2*t)*t*t};

function fadein() {
	let t = (Date.now()-start) / delay0;
	if (t >= 1) {
		// stop animation, start slides
		window.clearInterval(interval);
		interval = window.setInterval(update, 1000/fps);
	} else {
		left.children[0].style = "filter: opacity("+smoothstep(t)+");";
	}
}

function update() {
	if (document.body.scrollTop > H) return;

	let t = Date.now()-start;
	if (t >= delay1) {
		// switch to next image
		start = Date.now();
		right.innerHTML = '<img src="'+images[++currentId%images.length].src+'">';
	}
	else if (t < 1000) {
		t = -smoothstep(t/1000)*W;
		left.children[0].style = "transform: translateX(" + t + "px)";
		right.children[0].style = "transform: translateX(" + t + "px)";
	}
	else if (right.innerHTML != "") {
		left.innerHTML = right.innerHTML;
		left.children[0].style = "";
		right.innerHTML = "";
	}
}

function init() {
	W = window.innerWidth - getScrollbarWidth();
	H = window.innerHeight;
	document.body.style = "--W: "+W+"; --H: "+H;

	left = document.getElementById("left");
	right = document.getElementById("right");
	images = document.getElementById("bank").children;

	// init slides and start fadein animation
	left.innerHTML = '<img src="'+images[0].src+'" style="display: none">';
	start = Date.now();
	interval = window.setInterval(fadein, 1000/fps);
}
