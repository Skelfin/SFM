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
  emailModel: string = '';
  isPasswordTouched = false;
  accessRightsModel: number | undefined;
  private isMouseDownInsideModal: boolean = false;

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
      this.emailModel = user && user.email ? user.email : '';
      this.accessRightsModel = user?.access_rights ?? 0;
    }
  }

  closeModal() {
    this.close.emit();
  }

  onMouseDownInsideModal(event: MouseEvent): void {
    this.isMouseDownInsideModal = true;
    event.stopPropagation();
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isMouseDownInsideModal) {
      this.closeModal();
    }
    this.isMouseDownInsideModal = false;
  }

  constructor(private userFormService: UserFormService) { }

saveUser() {
  if (!this.user) {
    console.error('Пользователя не существует');
    return;
  }

  const formData = new FormData();
  formData.append('nickname', this.nicknameModel);
  formData.append('email', this.emailModel);
  formData.append('access_rights', String(this.accessRightsModel));
  

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