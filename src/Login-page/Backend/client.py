import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# the client should connect to the public ip address of the server
client.connect(("localhost", 9999))

message = client.recv(1024).decode()
client.send(input(message).encode())
message = client.recv(1024).decode()
client.send(input(message).encode())
print(client.recv(1024).decode())
