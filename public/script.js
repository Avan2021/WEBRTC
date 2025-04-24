const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(); // Removed host and port, using default PeerJS server
const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
}).then(stream => {
  addVideoStream(myVideo, stream);

  myPeer.on('call', call => {
    console.log('Incoming call:', call);
    call.answer(stream); 
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
  });

  socket.on('user-connected', userId => {
    console.log('User connected:', userId);
    connectToNewUser(userId, stream);
  });
}).catch(error => {
    console.error("Error getting user media:", error);
});

socket.on('user-disconnected', userId => {
  console.log('User disconnected:', userId);
  if (peers[userId]) {
    peers[userId].close();
    delete peers[userId]; // remove the peer from the object
  }
});

myPeer.on('open', id => {
  console.log('PeerJS ID:', id);
  socket.emit('join-room', ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
  console.log('Connecting to user:', userId);
  const call = myPeer.call(userId, stream);
  const video = document.createElement('video');
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream);
  });
  call.on('close', () => {
    video.remove();
  });
  call.on('error', (err) => {
    console.error("Peer call error", err);
    video.remove();
  });

  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}