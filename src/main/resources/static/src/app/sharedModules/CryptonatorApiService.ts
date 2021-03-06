import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CryptonatorApiService {

  public CryptoPaths = {
    "root" : "https://www.cryptocompare.com",
    "api"  : "/api/",
    "data" : "data/",
    "coinList" : "coinlist",
    "coinsnapshotByID" : "coinsnapshotfullbyid/",
    "coinsnapshot" : "coinsnapshot/"
  };

  constructor(private _http:Http) {
  };

  getCoinTypes() : Observable<any> {

    return this._http.get(this.CryptoPaths.root + this.CryptoPaths.api + this.CryptoPaths.data + this.CryptoPaths.coinList)
      .map(res => res.json())
      .catch(CryptonatorApiService.handleError);
  };

  getCoinSnapshot(coinID,currencyType) : Observable<any> {

    // TODO there's an issue where url prama aren't being set the angular way. needs to be resolved

    return this._http.get(
      this.CryptoPaths.root + this.CryptoPaths.api + this.CryptoPaths.data
            + this.CryptoPaths.coinsnapshot + "?fsym=" + coinID + "&tsym=BTC")
      .map(res => res.json())
      .catch(CryptonatorApiService.handleError);
  };

  //  TODO make it more specific
  private static handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
