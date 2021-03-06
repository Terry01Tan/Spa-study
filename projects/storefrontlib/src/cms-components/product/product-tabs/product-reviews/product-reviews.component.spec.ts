import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule, ProductReviewService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FormComponentsModule } from '../../../../shared';
import { ProductReviewsComponent } from './product-reviews.component';

const productCode = '123';
const product = { code: productCode, text: 'bla' };
const reviews = [
  { comment: 'bla1', headline: '1', alias: 'test1' },
  { comment: 'bla2', headline: '2', alias: 'test2' },
];

class MockProductReviewService {
  getByProductCode(): Observable<any> {
    return of(reviews);
  }
  add() {}
}

@Component({
  selector: 'cx-star-rating',
  template: '',
})
class MockStarRatingComponent {
  @Input() rating;
  @Input() disabled;
}
describe('ProductReviewsComponent in product', () => {
  let productReviewsComponent: ProductReviewsComponent;
  let fixture: ComponentFixture<ProductReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormComponentsModule, I18nTestingModule],
      providers: [
        {
          provide: ProductReviewService,
          useClass: MockProductReviewService,
        },
      ],
      declarations: [MockStarRatingComponent, ProductReviewsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewsComponent);
    productReviewsComponent = fixture.componentInstance;
    productReviewsComponent.product = product;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(productReviewsComponent).toBeTruthy();
  });

  it('from get reviews by product code', () => {
    productReviewsComponent.ngOnChanges();

    expect(productReviewsComponent.reviews$).toBeTruthy();
    productReviewsComponent.reviews$.subscribe(result => {
      expect(result).toEqual(reviews);
    });
  });

  it('should contain a form object for the review submission form, after init()', () => {
    productReviewsComponent.ngOnInit();
    const props = ['comment', 'title', 'rating', 'reviewerName'];

    props.forEach(prop => {
      expect(productReviewsComponent.reviewForm.controls[prop]).toBeDefined();
    });
  });

  describe('Logic on displaying review submission form', () => {
    it('should be initiated to hide the form', () => {
      expect(productReviewsComponent.isWritingReview).toBe(false);
    });

    it('should display form on initiateWriteReview()', () => {
      productReviewsComponent.initiateWriteReview();
      expect(productReviewsComponent.isWritingReview).toBe(true);
    });

    it('should hide form on cancelWriteReview()', () => {
      productReviewsComponent.cancelWriteReview();
      expect(productReviewsComponent.isWritingReview).toBe(false);
    });

    it('should hide form on submitReview()', () => {
      productReviewsComponent.submitReview();
      expect(productReviewsComponent.isWritingReview).toBe(false);
    });
  });
});
