import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";

export function authGuard(): CanActivateFn {
    return async () => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);

        const isAuthenticated = await firstValueFrom(authService.isAuthSig);

        if(isAuthenticated) {
            return true;
        }
        router.navigate(['/login']);
        return false;
    }
}

export function guestGuard(): CanActivateFn {
    return async () => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);

        const isAuthenticated = await firstValueFrom(authService.isAuthSig);

        if (!isAuthenticated) {
            return true;
        }
        router.navigate(['/']);
        return false;
    }
}