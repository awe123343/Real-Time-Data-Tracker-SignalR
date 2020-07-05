import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InfectionStatInputModel } from "../_interfaces/infection-stat-input-model";
import { InfectionStatModel } from "../_interfaces/infection-stat-model";
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: "root",
})
export class SignalRService {
  public connected: boolean = false;
  public data: InfectionStatModel[];
  private hubConnection: signalR.HubConnection;

  constructor(private http: HttpClient) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("signalHub")
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection started");
        this.connected = true;
        // this.broadcastData({
        //   country: 'FAKE',
        //   state: 'FAKE',
        //   infectedNo: -1,
        //   recoveredNo: -1,
        //   deathNo: -1
        // });
        this.initialRequest();
      })
      .catch((err) => console.log("Error while starting connection: " + err));
  };

  public addTransferDataListener = () => {
    this.hubConnection.on("transferData", (data) => {
      this.data = data;
      console.log('Data transferred', data);
    });
  };

  public broadcastData = (row) => {
    let input: InfectionStatInputModel = {
      Country: row.country,
      State: row.state,
      InfectedNo: Number(row.infectedNo),
      RecoveredNo: Number(row.recoveredNo),
      DeathNo: Number(row.deathNo)
    };
    this.hubConnection
      .invoke("broadcastdata", input)
      .catch((err) => console.error(err));
  };

  public addBroadcastDataListener = () => {
    this.hubConnection.on("broadcastdata", (data) => {
      this.data = data;
      console.log('New broadcasted data', this.data);
    });
  };

  public stopConnection = () => {
    if (this.hubConnection) {
      this.hubConnection
      .stop()
      .then(() => {
        console.log("Connection stopped");
        this.connected = false;
      })
      .catch((err) => console.log("Error while stopping connection: " + err));
    }
  };

  public initialRequest = () => {
    this.http.get("/api/v1/signals").subscribe((res) => {
      console.log("Initial request", res);
    });
  };
}
