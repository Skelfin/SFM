import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AudioService } from '../services/audio.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService {
    constructor(private router: Router, private audioService: AudioService) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const url: string = state.url;
      
      if (url === '/login' || url === '/signup') {
        this.audioService.clearTrack();
      }
      
      return true;
    }
  }
