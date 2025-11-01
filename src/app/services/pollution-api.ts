import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import { SubmittedPollution } from '../classes/submittedPollution/submitted-pollution';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PollutionAPI {



  constructor(private http:HttpClient) { }



  public getPollutions () : Observable<SubmittedPollution[]> 
  {
    return this.http.get<SubmittedPollution[]>(environment.backendClient)
  }

  public getPollutionById (id : number) : Observable<SubmittedPollution> 
  {

    // return this.http.get<SubmittedPollution>(`${environment.backendClient}/${id}`)
    // Parcequ'on utilise un .json, qui ne peut que récupérer des arrays, on filtre tout manuellement.
    // à modifier quand on as un api
    return this.getPollutions()
    .pipe(
      map(
        pollutions => 
        {
          const pollution = pollutions.find(p => p.id == id);
          if (!pollution) {
            throw new Error(`Pollution with id ${id} not found`);
          }
          return pollution;
        }
      )
    )

  }


  public postPollution (pollution : SubmittedPollution) 
  {
    this.http.post(environment.backendClient, pollution)
    console.log("Ajout de la pollution!\n Angular ne permet pas la modification d'un asset mock .json.")
  }



  public putPollution (pollution : SubmittedPollution) 
  {
    this.http.put(environment.backendClient, pollution)
    console.log("Modification de la pollution!\n  Angular ne permet pas la modification d'un asset mock .json.")
  }



  public deletePollution (pollution : SubmittedPollution) 
  {
    this.http.delete(environment.backendClient, { body: pollution } )
    console.log("Suppression de la pollution!\n  Angular ne permet pas la modification d'un asset mock .json.")
  }

}
