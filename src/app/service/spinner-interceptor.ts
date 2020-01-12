import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { SpinnerService } from "./spinner.service";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(public spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // HTTPリクエストのタイミングで呼び出される
    // スピナーを表示する
    this.spinnerService.show();
    return next.handle(req).pipe(finalize(() => this.spinnerService.hide()));
  }
}
