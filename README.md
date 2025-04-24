## Video Chat Component

This repository contains a reusable component implementing basic real-time video and audio calling functionality. It utilizes the WebRTC API for peer-to-peer media streaming and Socket.IO for the necessary signaling to establish connections.

### Technologies Used

* **WebRTC API:** For direct peer-to-peer audio and video communication in the browser.
* **Socket.IO:** For real-time, bidirectional event-based communication used for signaling (exchange of session descriptions and ICE candidates).
* **JavaScript:** The primary programming language for this component.

### Features

* Basic peer-to-peer audio and video calling.
* Real-time connection setup facilitated by Socket.IO signaling.

### Integration

1.  Include the necessary JavaScript files from this component in your web application.
2.  Ensure you have a running Socket.IO server for the signaling process. Configure the client-side code to connect to your Socket.IO server.
