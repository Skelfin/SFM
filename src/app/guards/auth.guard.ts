import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";

export function authGuard(): CanActivateFn {
    return async () => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);

        const isAuthenticated = await firstValueFrom(authService.isAuthSig);
        const hasRestrictedAdminAccess = authService.hasRestrictedAdminAccess();

        if (!isAuthenticated) {
            return true;
        }

        if (isAuthenticated && !hasRestrictedAdminAccess) {
            return true;
        }

        if (hasRestrictedAdminAccess) {
            router.navigate(['/admin/users']);
            return false;
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

export function adminGuard(): CanActivateFn {
    return () => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);

        if (authService.hasAdminAccess()) {
            return true;
        }

        if (authService.hasRestrictedAdminAccess()) {
            router.navigate(['/admin/users']);
            return false;
        }

        router.navigate(['/']); 
        return false;
    }
}

export function restrictedAdminGuard(): CanActivateFn {
    return () => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);

        if (authService.hasRestrictedAdminAccess()) {
            return true;
        }

        router.navigate(['/']);
        return false;
    }
}

export function profileGuard(): CanActivateFn {
    return async () => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);

        const isAuthenticated = await firstValueFrom(authService.isAuthSig);
        const hasAdminAccess = authService.hasAdminAccess();
        const hasRestrictedAdminAccess = authService.hasRestrictedAdminAccess();

        if (isAuthenticated && !hasAdminAccess && !hasRestrictedAdminAccess) {
            return true;
        }

        router.navigate(['/']);
        return false;
    }
}
