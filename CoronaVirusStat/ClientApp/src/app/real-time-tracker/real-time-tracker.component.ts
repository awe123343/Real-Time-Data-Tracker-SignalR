import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { SignalRService } from "../services/signal-r.service";
import { TableCol } from "../_interfaces/table-col";
import { AnimationRoute } from "../animations";

const add = (a, b) =>  a + b;
const max = (a, b) => (a > b ? a : b);

@Component({
  selector: "app-real-time-tracker",
  templateUrl: "./real-time-tracker.component.html",
  styleUrls: ["./real-time-tracker.component.css"],
  animations: [AnimationRoute]
})
export class RealTimeTrackerComponent implements OnInit {
  cols: TableCol[];

  constructor(public signalRService: SignalRService) {
    
  }

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

  typeOf(data) {
    return typeof data;
  }

  getTextColor(field: string): string {
    if (field === "recoveredNo") {
      return "green";
    } else if (field === "deathNo") {
      return "red";
    } else {
      return "inherit";
    }
  }

  getPropertySum(prop: string): number {
    let values: number[] = this.signalRService.data.map((row) => row[prop]);
    return values.reduce(add);
  }

  getLastUpdateTime(): Date {
    let dates: Date[] = this.signalRService.data.map(
      (row) => new Date(row.signalTime)
    );
    let resDate: Date = dates.reduce(max);
    return resDate;
  }
}
