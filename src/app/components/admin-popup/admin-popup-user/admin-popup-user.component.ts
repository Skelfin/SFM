import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminFormUserComponent } from "../../admin-form/admin-form-user/admin-form-user.component";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from '../../../types/user';
import { FormsModule } from '@angular/forms'; // Импорт FormsModule

@Component({
    selector: 'app-admin-popup-user',
    standalone: true,
    templateUrl: './admin-popup-user.component.html',
    styleUrl: './admin-popup-user.component.scss',
    imports: [AdminFormUserComponent, FormsModule],
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
  @Input() user: User | null = null; // Принимаем пользователя

  closeModal() {
    this.close.emit();
  }
}
