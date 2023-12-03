import { Component, OnInit } from '@angular/core';
import { BsonService } from 'src/app/service/bson.service';
import { SocketService } from 'src/app/service/socket.service';
import { GlobalConstants } from 'src/app/common/GlobalConstant';
import { BSON } from 'bson';
@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css'],
})
export class WebSocketComponent implements OnInit {
  private socket: WebSocket | undefined;
  private readonly SOCKET_URL = GlobalConstants.socketURL;
  constructor(
    private websocketService: SocketService,
    private bsonService: BsonService
  ) {}

  ngOnInit() {
    let obj = {
      SessionId: '1675250678256',
      IP: GlobalConstants.ip,
      Timestamp: 1675250678256,
      UserID: 8006,
    };
    this.websocketService.getApiCall(obj).subscribe((data) => {
      localStorage.setItem('Token', JSON.stringify(data.data.Token));
    });
  }

  /// function for connecting to websocket
  connectToWebSocket() {
    this.socket = new WebSocket(this.SOCKET_URL);

    this.socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened:', event);
    });

    this.socket.addEventListener('message', (event) => {
      console.log('Received message:', event);
    });

    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });

    this.socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event);
    });
  }

  /// function for sending message through websocket
  sendMessage() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const token = localStorage.getItem('Token');
      if (token) {
        const message: any = {
          ProfileID: 8006,
          Token: JSON.parse(token),
          msgtype: 189,
        };
        console.log('Sending message:', message);
        this.socket.send(message);
        console.log('Sent message:', message);
      } else {
        console.error('No token found in localStorage');
      }
    } else {
      console.error('WebSocket connection is not open.');
    }
  }


}
