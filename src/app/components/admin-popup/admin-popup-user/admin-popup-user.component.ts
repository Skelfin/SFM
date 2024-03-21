import { Component, EventEmitter, Output } from '@angular/core';
import { AdminFormUserComponent } from "../../admin-form/admin-form-user/admin-form-user.component";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-admin-popup-user',
    standalone: true,
    templateUrl: './admin-popup-user.component.html',
    styleUrl: './admin-popup-user.component.scss',
    imports: [AdminFormUserComponent],
    animations: [
      trigger('slideInOut', [
        state('in', style({ transform: 'translateY(0)' })),
        transition('void => *', [
          style({ transform: 'translateY(-100%)' }),
          animate('450ms ease-out')
        ]),
        transition('* => void', [
          animate('500ms ease-in-out', style({ transform: 'translateY(-100%)' }))
        ])
      ])
    ]
})
export class AdminPopupUserComponent {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
