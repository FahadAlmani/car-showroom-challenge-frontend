import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzDividerModule,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    CommonModule,
    NzModalModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  user: { username: string; password: string } = { username: '', password: '' };

  login() {
    this.authService
      .login(this.user.username, this.user.password)
      .subscribe((object) => {
        localStorage.setItem('token', object.token);
        this.router.navigate(['/car-showroom-management']);
      });
  }
  register() {
    this.authService
      .register(this.user.username, this.user.password)
      .subscribe((object) => {
        localStorage.setItem('token', object.token);
        this.router.navigate(['/car-showroom-management']);
      });
  }
}
