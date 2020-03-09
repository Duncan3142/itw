build:
	docker build -t itw .

start:
	docker run -d -P --name itw itw && docker ps -f name=itw && docker logs -f itw
	# Note the -P flag will publish to a random host port

stop:
	docker stop itw && docker rm itw
