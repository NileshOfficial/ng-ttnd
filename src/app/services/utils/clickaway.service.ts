import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ClickawayService {
  target: Subject<HTMLElement> = new Subject<HTMLElement>();
  constructor() {}
}
