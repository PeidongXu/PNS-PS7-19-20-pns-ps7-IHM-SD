
import {BehaviorSubject} from 'rxjs';
import {Site } from '../../Models/Site';
import axios from 'axios'
import {serverUrl} from "../../serverConfig/server.config";


export class SitesService {

  public SiteList: Site[] = [];

  private URL = serverUrl+'/api/sites';
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

