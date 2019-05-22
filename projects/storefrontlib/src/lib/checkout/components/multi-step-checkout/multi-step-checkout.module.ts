import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from '../../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../../shared/components/spinner/spinner.module';
import { AddressFormModule } from './shipping-address/address-form/address-form.module';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CheckoutModule,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { CartSharedModule } from '../../../../cms-components/checkout/cart/cart-shared/cart-shared.module';
import { MultiStepCheckoutComponent } from './container/multi-step-checkout.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ReviewSubmitComponent } from './review-submit/review-submit.component';
import { PlaceOrderModule } from './place-order/place-order.module';
import {TestComponent} from './container/test/test.component';
import {ShippingAddressComponent} from './shipping-address/shipping-address.component';
import { DeliveryModeComponent } from './delivery-mode/delivery-mode.component';
import {PaymentFormComponent } from './payment-method/payment-form/payment-form.component';
import { IconModule } from '../../../../cms-components/misc/icon/index';
import {BillingAddressFormComponent} from './payment-method/billing-address-form/billing-address-form.component'

@NgModule({
  imports: [
    CommonModule,
    CartSharedModule,
    PlaceOrderModule,
    RouterModule,
    UrlModule,
    AddressFormModule,
    SpinnerModule,
    CardModule,
    NgSelectModule,
    IconModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MultiStepCheckoutComponent: {
          selector: 'cx-multi-step-checkout' ,
          childRoutes: [
          {
            path: 'shippingaddress',
            component: ShippingAddressComponent,
          },
          {
            path: 'shippingmethod',
            component: DeliveryModeComponent,
          },
          {
            path: 'payment',
            component: PaymentMethodComponent,
          },
          {
            path: 'review',
            component: ReviewSubmitComponent,
          },
        ],
        },
      },
    }),
    CheckoutModule,
    I18nModule,
  ],
  declarations: [MultiStepCheckoutComponent,TestComponent,ShippingAddressComponent,DeliveryModeComponent,PaymentMethodComponent,
    ReviewSubmitComponent,PaymentFormComponent,BillingAddressFormComponent],
  entryComponents: [MultiStepCheckoutComponent,TestComponent,ShippingAddressComponent,DeliveryModeComponent,PaymentMethodComponent,
    ReviewSubmitComponent,PaymentFormComponent,BillingAddressFormComponent],
})
export class MultiStepCheckoutModule {}
