# Pietro's Image Gallery
A self-contained server and webpage to allow the user to upload and host static image files.

## Origins & Goals
The goal of this was to create a small webserver that anyone could run on their machine so that they could upload and host images via a web UI.

I recently built a blogging web-app that was lacking any sort of static-file uploading functionality (e.g. uploading images to display in my articles). I originally planned to implement it inside of the application, but decided to build it separately in a self-contained package for learning purposes and for reusability.

See the [blog post](http://blog.chewbonga.com/entry/54b204b1606cf296051395c0) for more info.

## How it Works
The app serves just one web page at the root index ('/'). There you will find an upload dialog to select a file and to upload it.

Once submitted, the web page makes an AJAX request to itself to the '/upload' URI and passes the image data using a DataURL. Then the app saves it to the 'public/uploads' folder where it is publically accessible. The URL for the image is provided on the web page.

## Steps
1. 'npm install && bower install'
2. Run 'npm start' to start the server, 'grunt' if you want to start and enable asset pipeline (development).
3. Access http://localhost:3000 in your browser.

## Caution
The body size of requests sent to this server becomes important when dealing with static files (image data can get large). In the Express server, the limit is set to '50mb' which should cover pretty large images. Be aware though, if this app is reverse proxied with a webserver like nginx, the front-facing webserver will most likely have it's own size limit on client request bodies which you will have to disable or set accordingly (e.g. for nginx, you would include 'client_max_body_size 0' in your location directive to disable it). 

Also, to state the obvious, this allows anyone who has access to your app to send large requests. Done repeatedly this could cause unwarranted effects.
