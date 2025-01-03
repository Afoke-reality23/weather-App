import socket
import requests

server=socket.socket()
server_IP=''
port=1998
server.bind((server_IP,port))
server.listen()
cached_data={}


def handle_connections():
    while True:
        print('server is listening for connections')
        client_sock,addr=server.accept()
        print(f'client with  IP address {addr[0]} | port{addr[1]} has connected successfully')
        client_sock.send("connection successful".encode("utf-8"))
        data=client_sock.recv(1024).decode()
        if "\r\n\r\n" in data:
            h,b=data.split("\r\n\r\n",1)
            name=b.strip()
        else:
            name=data.strip()
        print(name)
        response=fetch_weather(name)
        print(response)
        client_sock.send(response.encode("utf-8"))



def fetch_weather(name):
    api_Key='1b6adb6d88333ea7af62b2c215398088'
    base_url='https://api.openweathermap.org/data/2.5/weather'
    url=f'{base_url}?q={name}&appid={api_Key}'
    response=requests.get(url)
    cors_headers='HTTP/1.1 200 OK\r\n'
    cors_headers+='Content-Type:application/json\r\n'
    cors_headers+='Access-Control-Allow-Origin:*\r\n'
    cors_headers+='Access-Control-Allow-Methods:GET,POST,OPTIONS\r\n'
    cors_headers+='Access-Control-Allow-Headers:Content-Type\r\n'
    cors_headers+='\r\n'
    try:
        if response.status_code == 200:
            full_response=cors_headers + '\r\n' + response.text
            return full_response
        else:
            if response.status_code == 404:
                return False
    except Exception as e:
        return f'Error fetching weather data:{str(e)}'        
            
            
            
            
            
# def fetch_weather(name):
#     api_Key="1b6adb6d88333ea7af62b2c215398088"
#     base_url="https://api.openweathermap.org/data/2.5/weather"
#     url=f"{base_url}?q={name}&appid={api_Key}"
    
#     response=requests.get(url)
#     cors_headers="HTTP/1.1 200 OK\r\n"
#     cors_headers+="Content-Type:application/json\r\n"
#     cors_headers+="Access-Control-Allow-Origin:*\r\n"
#     cors_headers+="Acceds-Control-Alllow-Methods:GET,POST,OPTION\r\n"
#     cors_headers+="Access-Control-Allow-Headers:Content-Type\r\n"
#     try:
#         if response.status_code==200:
#             full_response=cors_headers +  "\r\n" + response.text
#             #print(full_response)
#             return full_response
#         elif response.status_code==404 or len(name)<=0:
#             return False
#         else:
#             return "unexpected error occurred"
#     except Exception as e:
#         return f"error fetch weather data :{str(e)}"
    
    
    
    
handle_connections()