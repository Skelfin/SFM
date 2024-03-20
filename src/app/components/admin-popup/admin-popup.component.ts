import { Component, EventEmitter, Output } from '@angular/core';
import { AdminFormComponent } from "../admin-form/admin-form.component";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-admin-popup',
    standalone: true,
    templateUrl: './admin-popup.component.html',
    styleUrl: './admin-popup.component.scss',
    imports: [AdminFormComponent],
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
export class AdminPopupComponent {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
