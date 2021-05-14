import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private db : AngularFirestore) { }

  public traerCodigo(doc : string)
  {
    return this.db.collection('codigosQr').doc(doc).valueChanges();
  }
}
