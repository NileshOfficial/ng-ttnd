import { Directive, ElementRef, Input, OnInit, OnDestroy } from "@angular/core";
import { ClickawayService } from "../services/utils/clickaway.service";
import { Subscription } from "rxjs";

@Directive({
  selector: "[clickaway]",
})
export class ClickawayDirective implements OnInit, OnDestroy {
  @Input() clickaway = null;

  private subscription: Subscription = null;
  constructor(
    private clickawayService: ClickawayService,
    private eleRef: ElementRef
  ) {}

  ngOnInit() {
    this.subscription = this.clickawayService.target.subscribe((target) => {
      if (!this.eleRef.nativeElement.contains(target)) {
        this.clickaway();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
