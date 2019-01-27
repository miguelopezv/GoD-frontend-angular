import { Component, OnInit } from '@angular/core';
import { PlayersService } from './../services/players.service';
import { Player } from '../interfaces';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  players: Player[];
  playersId: number[] = [];
  loginForm: FormGroup;
  existingUser: AbstractControl;

  constructor(
    private _playersService: PlayersService,
    private _router: Router
    ) {}

  ngOnInit() {
    this.loginForm = this.createFormGroup();
    this.existingUser = this.loginForm.controls['createdUser'];
    this.getPairPlayers(this.playersId);
  }

  getPairPlayers(playersId: number[]) {
    this._playersService
      .getPlayers(playersId)
      .subscribe((players: Player[]) => (this.players = players));
  }

  createFormGroup() {
    return new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      createdUser: new FormControl()
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.playersId.push(1);
    if (this.playersId.length === 2) {
      this._router.navigateByUrl('/game');
    }
    this.loginForm.reset();
  }
}
