import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TaskTemplate } from "interfaces/TaskTemplate";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent implements OnInit {
  @Input() data!: TaskTemplate;
  @Output()
  readonly delete = new EventEmitter<number>();

  constructor() {
    /** */
  }

  ngOnInit(): void {
    /** */
  }

  deleteTask(): void {
    const { id } = this.data;
    if (id) {
      this.delete.emit(id);
    }
  }
}
