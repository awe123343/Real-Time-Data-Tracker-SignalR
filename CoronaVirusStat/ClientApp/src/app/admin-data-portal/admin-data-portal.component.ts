import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { SignalRService } from "../services/signal-r.service";
import { TableCol } from "../_interfaces/table-col";
import { InfectionStatModel } from "../_interfaces/infection-stat-model";

const add = (a, b) =>  a + b;
const max = (a, b) => (a > b ? a : b);

@Component({
  selector: "app-admin-data-portal",
  templateUrl: "./admin-data-portal.component.html",
  styleUrls: ["./admin-data-portal.component.css"],
})
export class AdminDataPortalComponent implements OnInit {
  cols: TableCol[];
  selectedRecord: InfectionStatModel;
  displayDialog: boolean;
  record: InfectionStatModel = {};

  constructor(public signalRService: SignalRService) {}

  ngOnInit() {
    this.cols = [
      { field: "country", header: "Country" },
      { field: "state", header: "State" },
      { field: "infectedNo", header: "Infected" },
      { field: "recoveredNo", header: "Recovered" },
      { field: "deathNo", header: "Death" },
      { field: "signalTime", header: "Updated On" },
    ];

    if (!this.signalRService.connected) {
      this.signalRService.startConnection();
    }
    this.signalRService.addTransferDataListener();
    this.signalRService.addBroadcastDataListener();
    // this.signalRService.initialRequest();
  }

  @HostListener("window:beforeunload")
  async ngOnDestroy() {
    // this.signalRService.stopConnection();
  }

  save() {
    let records = [...this.signalRService.data];
    records[this.signalRService.data.indexOf(this.selectedRecord)] = this.record;

    this.signalRService.data = records;
    this.signalRService.broadcastData(this.record);
    this.record = null;
    this.displayDialog = false;
  }

  cancel() {
    this.record = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.record = this.cloneRecord(event.data);
    this.displayDialog = true;
  }

  cloneRecord(c: InfectionStatModel): InfectionStatModel {
    let row = {};
    for (let prop in c) {
      row[prop] = c[prop];
    }
    return row;
  }

  typeOf(data) {
    return typeof data;
  }

  getPropertySum(prop: string): number {
    let values: number[] = this.signalRService.data.map(row => row[prop]);
    return values.reduce(add);
  }

  getLastUpdateTime(): Date {
    let dates: Date[] = this.signalRService.data.map(row => new Date(row.signalTime));
    let resDate: Date = dates.reduce(max);
    return resDate;
  }
}
