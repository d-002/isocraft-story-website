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

function updateSize() {
	W = window.innerWidth - getScrollbarWidth();
	H = window.innerHeight;
	document.body.style = "--W: "+W+"px; --H: "+H+"px; --margin: "+parseInt(W*0.2)+"px";
}

function closePopup() {
	let popup = document.getElementById("popup");
	popup.className = "hide";
	window.setTimeout(() => popup.remove(), 1000);
}

function init() {
	updateSize();
	window.addEventListener("resize", updateSize);
}
