import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import { SubmittedPollution } from '../classes/submittedPollution/submitted-pollution';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PollutionAPI {



  constructor(private http:HttpClient) { }



  public getPollutions () : Observable<SubmittedPollution[]> 
  {
    return this.http.get<SubmittedPollution[]>(environment.listPollution)
  }

  public getPollutionById (id : number) : Observable<SubmittedPollution> 
  {
    // besoin de connaissance des routes qu'utilise l'api -> tight coupling
    return this.http.get<SubmittedPollution>(`${environment.listPollution}/${id}`)
    // Parcequ'on utilise un .json, qui ne peut que récupérer des arrays, on filtre tout manuellement.
    // à modifier quand on as un api
    // return this.getPollutions()
    // .pipe(
    //   map(
    //     pollutions => 
    //     {
    //       const pollution = pollutions.find(p => p.id == id);
    //       if (!pollution) {
    //         throw new Error(`Pollution with id ${id} not found`);
    //       }
    //       return pollution;
    //     }
    //   )
    // )

  }


  public postPollution (pollution : SubmittedPollution) : Observable<SubmittedPollution> 
  {
    return this.http.post<SubmittedPollution>(environment.listPollution, pollution)
  }



  public putPollution (pollution : SubmittedPollution) : Observable<SubmittedPollution> 
  {
    return this.http.put<SubmittedPollution>(`${environment.listPollution}/${pollution.id}`, pollution)
  }



  public deletePollution(pollution: SubmittedPollution): Observable<SubmittedPollution>  
  {
    return this.http.delete<SubmittedPollution>(`${environment.listPollution}/${pollution.id}`);
  }
  
}
