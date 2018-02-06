function start() {
	sudo NODE_ENV='production' ENCIRCLE2_MONGODB_URL=$ENCIRCLE2_MONGODB_URL ENCIRCLE2_AUTH_SECRET=$ENCIRCLE2_AUTH_SECRET PORT=$1 VZ_EMAIL_PASS=$VZ_EMAIL_PASS forever --uid "web-$1" -o $2 -e $3 start app.js
}

start 8000 ./out1.log ./err1.log
start 8001 ./out2.log ./err2.log
