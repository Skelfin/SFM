import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { UserFormService } from '../../../services/user-table/user.form.service';
import { User } from '../../../types/user';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss',
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
export class UserPopupComponent {
  faDeleteLeft = faDeleteLeft
  @Output() close = new EventEmitter<void>();
  @Input() user: User | null = null;
  passwordTouched = false;
  passwordModel: string = '';
  nicknameModel: string = '';
  isPasswordTouched = false;

  avatarFile: File | null = null;
  clearPassword(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.passwordModel = '';
    this.isPasswordTouched = true; 
  }

  fileChangeEvent(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files?.length) {
      this.avatarFile = element.files[0];
    } else {
      this.avatarFile = null;
    }
  }

  onPasswordChange() {
    this.isPasswordTouched = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      const user: User = changes['user'].currentValue;
      this.nicknameModel = user && user.nickname ? user.nickname : '';
      this.passwordModel = user && user.password ? user.password : '';
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

  const formData = new FormData();
  formData.append('nickname', this.nicknameModel);

  if (this.isPasswordTouched && this.passwordModel.trim() !== '') {
    formData.append('password', this.passwordModel);
  }

  if (this.avatarFile) {
    formData.append('avatar', this.avatarFile, this.avatarFile.name);
  }

  this.userFormService.updateUser(this.user.id, formData);
  this.closeModal();
}

}
