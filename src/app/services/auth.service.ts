import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IAuthUser } from "../types/user.interface";
import { catchError } from "rxjs";
import { Http2ServerResponse } from "http2";


@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly toastr: ToastrService
    ) {}

    signUp(userData: IAuthUser){
        return this.http.post('&{API_URL}/user',userData)
        .pipe(
            catchError(err => {
                this.handeError(err)
                throw new Error(err.message)
            })
        )
        .subscribe(() => this.toastr.success('создано'))
    }

    private handeError(err: HttpErrorResponse): void {
        this.toastr.error(err.error.message)
    }
}