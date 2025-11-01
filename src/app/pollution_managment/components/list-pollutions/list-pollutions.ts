import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; 
import { Observable, combineLatest, map, startWith, Subject, switchMap } from 'rxjs';

import { PollutionRecap } from '../pollution-recap/pollution-recap';
import { PollutionAPI } from '../../services/pollution-api';
import { SubmittedPollution } from '../../classes/submittedPollution/submitted-pollution';

@Component({
  selector: 'app-list-pollutions',
  imports: [AsyncPipe, PollutionRecap, ReactiveFormsModule],
  templateUrl: './list-pollutions.html',
  styleUrl: './list-pollutions.scss'
})
export class ListPollutions implements OnInit {

  private refreshTrigger$ = new Subject<void>();

  submittedPollutions$ ? : Observable<SubmittedPollution[]>
  filteredPollutions$ ! : Observable<SubmittedPollution[]>

  searchFilter = new FormControl('')
  typeFilter = new FormControl('')

  showForm : boolean = false // pour permette l'édition via formulaire
  selectedPollution ! : SubmittedPollution

  constructor
  (
    private pollutionApi : PollutionAPI,
    private router: Router
  )
  {
    //
  }

  
  ngOnInit() 
  {

    this.loadPollutions()

  }



  onDelete(pollution: SubmittedPollution) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pollution ?')) {
      this.pollutionApi.deletePollution(pollution).subscribe({
        next: (response) => {
          console.log('Pollution deleted:', response);
          // Rediriger ou rafraîchir la liste
          this.refreshTrigger$.next(); 
        },
        error: (error) => {
          console.error('Error deleting pollution:', error);
        }
      });
    }
  }


  onEdit(pollution: SubmittedPollution) {
    this.router.navigate(['/declare-pollution/edit', pollution.id]);
  }




  loadPollutions()
  {
    // this.submittedPollutions$ = this.pollutionApi.getPollutions()
    this.submittedPollutions$ = this.refreshTrigger$.pipe(
      startWith(undefined), // <- Charge au démarrage
      switchMap(() => this.pollutionApi.getPollutions()) // <- Recharge à chaque émission
    );

    // Combinaison du stream de données original aves les filters controls
    this.filteredPollutions$ = 
    combineLatest
    (
      [
        this.submittedPollutions$,
        this.searchFilter.valueChanges.pipe(startWith('')),
        this.typeFilter.valueChanges.pipe(startWith(''))
      ]
    )
    .pipe
    (
      map( ( [pollutions, searchTerm, type] ) => 
        {
          return pollutions.filter( pollution => 
            {
              // filtrer selon le titre et la description
              const matchesSearch : boolean = 
              (
                !searchTerm // si il n'y as pas de treme de recherche (not null => not false => true)
                || // ou
                pollution.titre?.toLowerCase().includes(searchTerm.toLowerCase()) // si le titre correspond à la recherche
                || // ou
                pollution.description?.toLowerCase().includes(searchTerm.toLowerCase()) // si la description correspond à la recherche
              )
                
              
              // filtrer selon le types
              const matchesType : boolean = 
              (
                !type  // si il n'y as pas de type recherché (not null => not false => true)
                || // ou
                pollution.type_pollution === type // si le type de la pollution correspond au type recherché
              )
              
              return matchesSearch && matchesType
            })
        }
      )
    );
  }

}
