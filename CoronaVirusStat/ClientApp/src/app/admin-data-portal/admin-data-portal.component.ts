import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { SignalRService } from "../services/signal-r.service";
import { TableCol } from "../_interfaces/table-col";
import { InfectionStatModel } from "../_interfaces/infection-stat-model";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { infectionDataValidator } from '../shared/infection-data.validator';

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
  recordUpdateForm: FormGroup;

  constructor(public signalRService: SignalRService, private fb: FormBuilder) {}

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

    this.recordUpdateForm = this.fb.group(
      {
        infectedNo: new FormControl("", [
          Validators.required,
          Validators.min(0),
        ]),
        recoveredNo: new FormControl("", [
          Validators.required,
          Validators.min(0),
        ]),
        deathNo: new FormControl("", [Validators.required, Validators.min(0)]),
      },
      { validators: infectionDataValidator }
    );
  }

  @HostListener("window:beforeunload")
  async ngOnDestroy() {
    // this.signalRService.stopConnection();
  }

  get recordUpdateFormControls() {
    return this.recordUpdateForm.controls;
  }

  save() {
    let records = [...this.signalRService.data];

    console.log('Type', this.recordUpdateFormControls['infectedNo'].value);

    this.record.infectedNo = this.recordUpdateFormControls['infectedNo'].value;
    this.record.recoveredNo = this.recordUpdateFormControls['recoveredNo'].value;
    this.record.deathNo = this.recordUpdateFormControls['deathNo'].value;

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

    this.recordUpdateFormControls['infectedNo'].setValue(this.record.infectedNo);
    this.recordUpdateFormControls['recoveredNo'].setValue(this.record.recoveredNo);
    this.recordUpdateFormControls['deathNo'].setValue(this.record.deathNo);

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
