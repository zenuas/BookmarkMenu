
window.addEventListener("load", () =>
{
	const body = document.querySelector("body");
	
	function processNodes(parent, nodes)
	{
		for(let i = 0; i < nodes.length; i++)
		{
			const node = nodes[i];
			if (node.children)
			{
				processNodes(parent, node.children);
				continue;
			}
			
			const li = document.createElement("li");
			li.appendChild(document.createTextNode(node.title));
			const url = new URL(chrome.runtime.getURL("/_favicon/"));
			url.searchParams.set("pageUrl", node.url);
			url.searchParams.set("size", "16");
			li.style.backgroundImage = `url(${url.toString()})`;
			
			let target;
			li.onmousedown = e =>
			{
				target = e.target;
				return false;
			};
			li.onmouseup = e =>
			{
				if (target === e.target && (e.button == 0 || e.button == 1)) chrome.tabs.create({ url: node.url, active: (e.button == 0) });
				target = undefined;
			};
			parent.appendChild(li);
		}
	}
	
	chrome.bookmarks.getTree(nodes =>
	{
		const ul = document.createElement("ul");
		processNodes(ul, nodes);
		body.appendChild(ul);
	});
});
