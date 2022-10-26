import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FireserviceService } from '../fireservice.service';
@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories =['work', 'personal', 'home']
  categorySelectedCategory
User:any
  newTaskObj = {}
  itemName
  itemDueDate 
  itemPriority
  itemCategory
infos: any
lesFormations: any
  constructor(public modalCtlr: ModalController,
    public fireService:FireserviceService,
    public router:Router) {

      this.User = this.fireService.getUserId();
      this.fireService.getUserInfos().subscribe(res => {
         res.map(e => {
          if( e.payload.doc.id === this.User ){
            this.infos ={
          formations: e.payload.doc.data()['formations'],
          
        }
        }}) 
        console.log(this.infos);
        console.log("le type de cette object est " + typeof this.infos["formations"])

      },(err:any) => {
        console.log(err)
      })
        console.log(this.infos)

      
        // this.fireService.getFormationDetails().subscribe(res => {
        //   res.map(e => {
        //     for(const property in this.infos){
        //       if( e.payload.doc.id !== this.infos[property] ){
        //         this.lesFormations = {
        //           docid: e.payload.doc.id,
        //           itemName: e.payload.doc.data()["itemName"],
        //           itemCategory: e.payload.doc.data()["itemCategory"],
        //           itemPriority: e.payload.doc.data()["itemPriority"],
        //           itemDueDate: e.payload.doc.data()["itemDueDate"]
        //         }
        //       }
        //     }
            
          
        //   }) 
        //   console.log(this.lesFormations);
    
        // },(err:any) => {
        //   console.log(err)
        // })
       console.log(this.waitForElement()) 
        
     }
  waitForElement(){
      if(typeof this.infos !== "undefined"){
          this.fireService.getFormationDetails().subscribe(res => {
          res.map(e => {
            for(const property in this.infos){
              if( e.payload.doc.id !== this.infos[property] ){
                this.lesFormations = {
                  docid: e.payload.doc.id,
                  itemName: e.payload.doc.data()["itemName"],
                  itemCategory: e.payload.doc.data()["itemCategory"],
                  itemPriority: e.payload.doc.data()["itemPriority"],
                  itemDueDate: e.payload.doc.data()["itemDueDate"]
                }
              }
            }
            
          
          }) 
          console.log(this.lesFormations);
    
        },(err:any) => {
          console.log(err)
        })
        console.log(this.lesFormations)
        return this.lesFormations
      }
      else{
          setTimeout(this.waitForElement, 250);
      }
  }

  ngOnInit() {
  
  }
  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }
  
  async add(){
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority,itemCategory:this.categorySelectedCategory})
    this.dismis()
  }
  async dismis(){
    await this.modalCtlr.dismiss(this.newTaskObj)
  }

}
