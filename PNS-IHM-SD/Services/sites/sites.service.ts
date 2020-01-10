
import {BehaviorSubject} from 'rxjs';
import {Site } from '../../models/Site';
import axios from 'axios'


export class SitesService {

  public SiteList: Site[] = [];

  private URL = 'http://172.20.10.2:9428/api/sites';
   // private URL = 'http://localhost:9428/api/sites';

  constructor() {
      this.getSites();
  }

  public site$: BehaviorSubject<Site[]> = new BehaviorSubject(this.SiteList);

 /* public getFilieres() {
    this.http.get<Filiere[]>(this.URL).subscribe((filieres) => {
      this.FiliereList = filieres;
      this.filiere$.next(this.FiliereList);
    });
  }*/

 public getSites(){
        axios.get<Site[]>(this.URL).then(res =>{
            console.log(JSON.stringify(res.data));
            this.SiteList = res.data;
            this.site$.next(this.SiteList)
        } );

 }

}

