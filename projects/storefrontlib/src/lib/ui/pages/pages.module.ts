import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, NotAuthGuard } from '@spartacus/core';
import { LogoutModule } from '../../../cms-components/index';
import {
  PageLayoutComponent,
  PageLayoutModule,
} from '../../../cms-structure/page/index';
import { CmsPageGuard } from '../../cms/guards/cms-page.guard';
import { CartPageModule } from './cart-page/cart-page.module';

import { GuardsModule } from './guards/guards.module';
import { OrderConfirmationPageModule } from './order-confirmation-page/order-confirmation-page.module';
import { ProductPageModule } from './product-page/product-page.module';

const pageModules = [
  CartPageModule,
  OrderConfirmationPageModule,
  ProductPageModule,
  GuardsModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...pageModules,
    PageLayoutModule,
    LogoutModule,
    RouterModule.forChild([
      {
        // This route can be dropped only when we have a mapping path to page label for content pages
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'homepage', cxRoute: 'home' },
      },
      {
        // This route can be dropped only when the link from CMS in MyAccount dropdown menu ("my-account/address-book")
        // is the same as the page label ("address-book"). Or when we have a mapping for content pages.
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        data: { pageLabel: 'address-book', cxRoute: 'addressBook' },
        component: PageLayoutComponent,
      },
      {
        path: null,
        component: PageLayoutComponent,
        canActivate: [AuthGuard, CmsPageGuard],
        data: { pageLabel: 'updatePassword', cxRoute: 'updatePassword' },
      },
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'orders', cxRoute: 'orders' },
      },
      {
        path: null,
        canActivate: [NotAuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'login', cxRoute: 'login' },
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'search', cxRoute: 'search' },
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'category' },
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'brand' },
      },
      {
        path: null,
        component: PageLayoutComponent,
        canActivate: [AuthGuard, CmsPageGuard],
        data: { pageLabel: 'update-email', cxRoute: 'updateEmail' },
      },
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        data: { pageLabel: 'payment-details', cxRoute: 'paymentManagement' },
        component: PageLayoutComponent,
      },
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'order', cxRoute: 'orderDetails' },
      },
      {
        path: null,
        canActivate: [NotAuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'forgotPassword', cxRoute: 'forgotPassword' },
      },
      {
        path: null,
        component: PageLayoutComponent,
        canActivate: [NotAuthGuard, CmsPageGuard],
        data: { pageLabel: 'resetPassword', cxRoute: 'resetPassword' },
      },
      {
        path: null,
        component: PageLayoutComponent,
        canActivate: [AuthGuard, CmsPageGuard],
        data: {
          pageLabel: 'update-profile',
          cxRoute: 'updateProfile',
        },
      },
      {
        path: null,
        component: PageLayoutComponent,
        canActivate: [AuthGuard, CmsPageGuard],
        data: { pageLabel: 'close-account', cxRoute: 'closeAccount' },
      },
    ]),
  ],
})
export class PagesModule {}
