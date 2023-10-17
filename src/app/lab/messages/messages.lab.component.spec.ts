import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageComponent } from './message.component'; 
import { MessageService } from './message.service'; 
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe("2-message component integration testing:", () => {
  let fixture: ComponentFixture<MessageComponent>;
  let component: MessageComponent;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent], 
      providers: [MessageService],
     
    });

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);
  });

  it("expect comp. created successfully", () => {
    expect(component).toBeTruthy();
  });

  it("expect component template to be empty", () => {
  
    fixture.detectChanges(); 
    const container = fixture.nativeElement.querySelector('#container');
    expect(container).toBeNull(); 
  });

  it("then expect div.msg to have the messages after setting it", () => {
    const testMessages = ['Message 1', 'Message 2'];
    messageService.messages = testMessages;

    fixture.detectChanges(); 

    const msgDivs = fixture.nativeElement.querySelectorAll('.msg');
    expect(msgDivs.length).toBe(testMessages.length);

    for (let i = 0; i < testMessages.length; i++) {
      expect(msgDivs[i].textContent).toContain(testMessages[i]);
    }
  });
});
