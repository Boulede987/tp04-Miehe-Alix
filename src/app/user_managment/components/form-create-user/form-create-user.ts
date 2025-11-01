import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../classes/user/user';
import { UserApi } from '../../services/userApi/user-api';
import { UserRecap } from '../user-recap/user-recap';


// pour un validateur qui fonctionne
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(control.value) ? null : { emailInvalid: true };
}

@Component({
  selector: 'app-form-create-user',
  imports: [ReactiveFormsModule, UserRecap],
  templateUrl: './form-create-user.html',
  styleUrl: './form-create-user.scss'
})
export class FormCreateUser implements OnInit
{
  user ? : User

  submitted : boolean = false
  loading : boolean = false
  // // isEditMode : boolean = false
  
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, strictEmailValidator]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('user', [Validators.required])
  });


  constructor
  (
    private userApi : UserApi,
    private route : ActivatedRoute,
    private router : Router,
    private cdr: ChangeDetectorRef // pour la suppression future?
  ) 
  {
    //
  }


  ngOnInit() 
  {

    // utilie pour la future édition
    // // // On verifie si on as un id dans l'url
    // // const userId : number = parseInt(this.route.snapshot.paramMap.get('id')!)
    
    // // if (userId) 
    // // {

    // //   // si on en as un, on est en mode edition
    // //   this.isEditMode = true;

    // //   this.userApi.getUserById(userId)
    // //   .subscribe(
    // //     foundUser => 
    // //     {

    // //       this.user = foundUser;

    // //       // on récupère les données de l'objet pollution
    // //       const formValue = 
    // //       {
    // //         id: this.foundUser.id.toString(),
    // //         titre: this.foundUser.titre,
    // //         type_pollution: this.foundUser.role,
    // //         description: this.foundUser.description,
    // //         date_observation: this.foundUser.date_observation.toString(),
    // //         lieu: this.foundUser.lieu,
    // //         longitude: this.foundUser.longitude.toString(),
    // //         latitude: this.foundUser.latitude.toString(),
    // //         photo: this.foundUser.photo_url
    // //       };

    // //       this.userForm.patchValue(formValue); // et on les ajoutes dans le formulaire pour le pré remplir
    // //     }
    // //   );
    // // }
    // // // si on as pas d'id, on reste en mode creation (isEditMode reste a false)

  }


  onSubmit()
  {
    if (!this.loading)
    {

      this.loading = true;
      this.user = Object.assign(new User(), this.userForm.value)
    
      // util quand on auras le mode edition
      // // if (this.isEditMode && this.user) // si on est en mode edition
      // // {
      // //   // Récupérer l'ID depuis l'URL (pas depuis le formulaire)
      // //   const userId = parseInt(this.route.snapshot.paramMap.get('id')!);
      // //   this.user.id = userId; 
        
      // //   this.userApi.putUser(this.user).subscribe({
      // //     next: (response) => {
      // //       console.log('User updated:', response);
      // //       this.submitted = true;
      // //       this.cdr.detectChanges(); // détection des changements pour que submitted mette à jour l'affichage
      // //       this.loading = false
      // //     },
      // //     error: (error) => {
      // //       console.error('Error updating user:', error)
      // //       this.loading = false
      // //     }
      // //   });
      // // }
      // // else  // sinon, on est en creation
      // // {
      // // // Ne pas générer l'ID manuellement, laissez la base de données le faire (autoIncrement)
        this.userApi.postUser(this.user).subscribe({
          next: (response) => {
            console.log('User created:', response);
            this.submitted = true;
            this.cdr.detectChanges(); // détection des changements pour que submitted mette à jour l'affichage
            this.loading = false;
          },
          error: (error) => {
            console.error('Error creating user:', error);
            this.loading = false;
          }
        });
      // // }
    }
  }







  
  cancel() {
    this.router.navigate(['/']);
  }
}
