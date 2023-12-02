import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/GlobalConstant';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: WebSocket;
  private baseUrl = GlobalConstants.apiURL;
  private readonly SOCKET_URL = GlobalConstants.socketURL;
  constructor(private http: HttpClient) {
    this.socket = new WebSocket(this.SOCKET_URL);
  }

  public connect(): Observable<MessageEvent> {
    this.socket = new WebSocket(this.SOCKET_URL);

    // Create an observable that will be used to subscribe to incoming messages
    const observable = new Observable<MessageEvent>((observer) => {
      this.socket.addEventListener('message', (event: MessageEvent) => {
        observer.next(event);
      });

      // Handle errors and completion of the WebSocket connection
      this.socket.addEventListener('error', (event: Event) => {
        observer.error(event);
      });

      this.socket.addEventListener('close', () => {
        observer.complete();
      });
    });

    // Return the observable
    return observable;
  }

  // Send a message through the WebSocket connection
  public sendMessage(message: any): void {
    this.socket.send(JSON.stringify(message));
  }

  // Close the WebSocket connection
  public closeConnection(): void {
    this.socket.close();
  }

  getApiCall(data: any): Observable<any> {
    console.log('data', data);
    return this.http.post(this.baseUrl, data);
  }
}
