import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import createSpy = jasmine.createSpy;
import { GlobalMessageComponent } from './global-message.component';
import {
  GlobalMessageType,
  GlobalMessageService,
  GlobalMessageEntities,
  I18nTestingModule,
} from '@spartacus/core';

const mockMessages: GlobalMessageEntities = {
  [GlobalMessageType.MSG_TYPE_CONFIRMATION]: [{ raw: 'Confirmation' }],
  [GlobalMessageType.MSG_TYPE_INFO]: [{ raw: 'Info' }],
  [GlobalMessageType.MSG_TYPE_ERROR]: [{ raw: 'Error' }],
};

class MockMessageService {
  remove = createSpy();
  get(): Observable<GlobalMessageEntities> {
    return of(mockMessages);
  }
}

describe('GlobalMessageComponent', () => {
  let globalMessageComponent: GlobalMessageComponent;
  let messageService: GlobalMessageService;
  let fixture: ComponentFixture<GlobalMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [GlobalMessageComponent],
      providers: [
        { provide: GlobalMessageService, useClass: MockMessageService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessageComponent);
    globalMessageComponent = fixture.componentInstance;

    messageService = TestBed.get(GlobalMessageService);
  });

  it('Should create Global message component', () => {
    expect(globalMessageComponent).toBeTruthy();
  });

  it('Should not have duplicate messages per message type', () => {
    globalMessageComponent.ngOnInit();
    globalMessageComponent.messages$.subscribe(messages => {
      expect(messages[GlobalMessageType.MSG_TYPE_CONFIRMATION].length).toBe(1);
    });
  });

  it('Should be able to remove messages', () => {
    globalMessageComponent.clear(GlobalMessageType.MSG_TYPE_CONFIRMATION, 0);
    expect(messageService.remove).toHaveBeenCalledWith(
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      0
    );
  });
});
