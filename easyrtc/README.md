# WebRTC

This can be used directly in the EasyRTC server.

The format of the message is the following jsonifiable Object:

	var p2pMsg = {};
	p2pMsg.destUser = otherEasyrtcid;
	p2pMsg.type = document.getElementById('msgType').value;
	p2pMsg.data = {};
	p2pMsg.data.target = document.getElementById('msgTarget').value;
	p2pMsg.data.command = document.getElementById('msgCommand').value;
	p2pMsg.data.payload = document.getElementById('msgPayload').value;

This is sent over a WebRTC data channel.
