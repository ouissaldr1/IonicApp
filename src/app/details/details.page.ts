import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  data: string;
  formationDetails: any

  constructor(
    private activatedRoute: ActivatedRoute,
    public fireService:FireserviceService,
    public router:Router
  ) { 
    // this.activatedRoute.paramMap.subscribe((data) => {console.log(data)})
    this.data = this.activatedRoute.snapshot.paramMap.get('xyz')
    this.fireService.getFormationDetails().subscribe(res => {
      res.map(e => {
        if( e.payload.doc.id === this.data ){
          this.formationDetails = {
            docid: e.payload.doc.id,
            itemName: e.payload.doc.data()["itemName"],
            itemCategory: e.payload.doc.data()["itemCategory"],
            itemPriority: e.payload.doc.data()["itemPriority"],
            itemDueDate: e.payload.doc.data()["itemDueDate"]
          }
        }
      
      }) 
      console.log(this.formationDetails);

    },(err:any) => {
      console.log(err)
    })
  }
  addToChart(data){
    alert("added to chart")
    this.fireService.AddtoUserChart(data)
    this.router.navigateByUrl('home');
  }

  ngOnInit() {
  }

}
