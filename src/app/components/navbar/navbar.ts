import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule], // nécessaire pour la naviguation via router
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

}
