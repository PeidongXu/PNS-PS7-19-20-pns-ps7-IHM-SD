
import {BehaviorSubject} from 'rxjs';
import {Event } from '../../Models/Event';
import axios from 'axios'


export class EventsService {

  public EventList: Event[] = [];
  public test: string = "ceci est un test";

  private URL = 'http://172.20.10.2:9428/api/events';
   // private URL = 'http://localhost:9428/api/events';

  constructor() {
      console.log('wsh');
      this.getEvents();
  }

  public Event$: BehaviorSubject<Event[]> = new BehaviorSubject(this.EventList);

 /* public getFilieres() {
    this.http.get<Filiere[]>(this.URL).subscribe((filieres) => {
      this.FiliereList = filieres;
      this.filiere$.next(this.FiliereList);
    });
  }*/

 public getEvents(){
        axios.get<Event[]>(this.URL).then(res =>{
            this.EventList = res.data;
            this.Event$.next(this.EventList)
            console.log(this.Event$);
        } );

 }

}

