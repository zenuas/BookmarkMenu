
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
			
			li.onmousedown = (e) =>
			{
				chrome.tabs.create({ url: node.url, active: (e.button == 0) });
				return false;
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
