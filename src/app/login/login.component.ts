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
  // player: Player;
  players: Player[] = [];
  playersId: number[] = [];
  loginForm: FormGroup;
  existingUser: AbstractControl;

  constructor(
    private _playersService: PlayersService,
    private _router: Router
    ) {}

  ngOnInit() {
    this.loginForm = this._createFormGroup();
    this.existingUser = this.loginForm.controls['createdUser'];
  }

  /**
   * Submit the data from the form
   */
  onSubmit() {
    this._getPlayer(this.loginForm.value);

    this.loginForm.reset();
    if (this.playersId.length === 2) { this._router.navigateByUrl('/game'); }
  }

  /**
   * Retrieves or saves an user from the Database
   * @param formData the data from the loginForm
   */
  private _getPlayer(formData: Player) {
    if (this.existingUser) {
      this._playersService.getPlayer(formData)
      .subscribe((player: Player) => {
        this.players.push(player);
        this.playersId.push(player.id);
      });
    } else {
      this._playersService.createPlayer(formData)
      .subscribe((player: Player) => {
        this.players.push(player);
        this.playersId.push(player.id);
      });
    }
  }

  /**
   * Creates the Form Group to control the form
   */
  private _createFormGroup() {
    return new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      createdUser: new FormControl()
    });
  }
}
