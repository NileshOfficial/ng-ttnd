import { Component, HostListener } from "@angular/core";
import { ClickawayService } from "./services/utils/clickaway.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(private clickaway: ClickawayService) {}

  @HostListener("document:click", ["$event"]) documentClick(event: any): void {
    this.clickaway.target.next(event.target);
  }
}
