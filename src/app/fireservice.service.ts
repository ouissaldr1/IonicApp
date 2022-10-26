import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import { doc, getDoc } from "firebase/firestore";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {
  toastservice: any;
  UserId: any
  public formationlist = [];
  constructor(
    
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {}
  loginWithEmail(data) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  signup(data) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  //enregistrer les informations de l'utilisateur dans la base de donnée
  saveDetails(data) {
    return this.firestore.collection("users").doc(data.uid).set(data);
  }

  getDetails(data) {
    this.UserId = data.uid
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }
  getUserId(){
    return this.UserId
  }
  getUserFormations(){
    return this.firestore.collection("users").doc(this.UserId)
  }
  getUserInfos(){
    return this.firestore.collection("users").snapshotChanges()
  }
  
  getFormationDetails(){
   return this.firestore.collection("formations").snapshotChanges();
    
  }


  getMarker() {
    return this.firestore.collection("formations").snapshotChanges()
    
}

AddtoUserChart(data){
  const user = this.firestore.collection("users").doc(this.UserId)
  user.update({
    formations: firebase.firestore.FieldValue.arrayUnion(data)
    })
}
}