import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  ngOnInit(): void {
    /** */
  }
  @Input() show = false;

  close(): void {
    this.show = false;
  }

  open(): void {
    this.show = true;
  }
}
