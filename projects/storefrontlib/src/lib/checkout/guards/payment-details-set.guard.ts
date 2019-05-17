import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServerConfig, RoutingConfigService } from '@spartacus/core';
import { CheckoutDetailsService } from '../services/checkout-details.service';
import { CheckoutStep, CheckoutStepType } from '../model/checkout-step.model';
import { CheckoutConfigService } from '../checkout-config.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailsSetGuard implements CanActivate {
  constructor(
    private checkoutDetailsService: CheckoutDetailsService,
    private checkoutConfigService: CheckoutConfigService,
    private routingConfigService: RoutingConfigService,
    private router: Router,
    private serverConfig: ServerConfig
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const checkoutStep: CheckoutStep = this.checkoutConfigService.getCheckoutStep(
      CheckoutStepType.paymentDetails
    );

    if (!checkoutStep && !this.serverConfig.production) {
      console.warn(
        `Missing step with type ${
          CheckoutStepType.paymentDetails
        } in checkout configuration.`
      );
    }

    return this.checkoutDetailsService
      .getPaymentDetails()
      .pipe(
        map(paymentDetails =>
          paymentDetails && Object.keys(paymentDetails).length !== 0
            ? true
            : this.router.parseUrl(
                checkoutStep &&
                  this.routingConfigService.getRouteConfig(checkoutStep.route)
                    .paths[0]
              )
        )
      );
  }
}