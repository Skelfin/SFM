import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminFormUserComponent } from "../../admin-form/admin-form-user/admin-form-user.component";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { UserFormService } from '../../../services/user-table/user.form.service';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-admin-popup-user',
    standalone: true,
    templateUrl: './admin-popup-user.component.html',
    styleUrl: './admin-popup-user.component.scss',
    imports: [AdminFormUserComponent, FormsModule, FontAwesomeModule],
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
  faDeleteLeft = faDeleteLeft
  @Output() close = new EventEmitter<void>();
  @Input() user: User | null = null;
  passwordTouched = false;
  passwordModel: string = '';
  nicknameModel: string = '';
  isPasswordTouched = false;
  accessRightsModel: number | undefined;
  clearPassword(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.passwordModel = '';
    this.isPasswordTouched = true; 
  }
  onPasswordChange() {
    this.isPasswordTouched = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      const user: User = changes['user'].currentValue;
      this.nicknameModel = user && user.nickname ? user.nickname : '';
      this.passwordModel = user && user.password ? user.password : '';
      this.accessRightsModel = user?.access_rights ?? 0;
    }
  }

  closeModal() {
    this.close.emit();
  }

  constructor(private userFormService: UserFormService) { }

  saveUser() {
    if (!this.user) {
      console.error('Пользователя не существует');
      return;
    }
  
    const updatedUserData: any = {
      nickname: this.nicknameModel,
      access_rights: this.accessRightsModel,
      avatar: 'path/to/avatar.jpg',
    };
  
    if (this.isPasswordTouched && this.passwordModel.trim() !== '') {
      updatedUserData.password = this.passwordModel;
    }
  
    console.log(updatedUserData);
    this.userFormService.updateUser(this.user.id, updatedUserData);
    this.closeModal();
  }
  
}