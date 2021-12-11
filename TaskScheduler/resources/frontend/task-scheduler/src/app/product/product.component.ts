import { Component, OnInit,TemplateRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IProduct } from './product';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ThisReceiver } from '@angular/compiler';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products = <IProduct[]>{};
  public selectProduct = <IProduct>{};
  public modalTitle = '';
  public btnTitle = '';
  public name = new FormControl('');
  public description = new FormControl('');
  public price = new FormControl('');
  modalRef?: BsModalRef;

  constructor(private service:ProductService,private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>,product?:IProduct) {
    if (product) {
      this.modalTitle = "Edit Task";
      this.btnTitle = "Update";
      this.selectProduct = product;
      this.name.setValue(product.name);
      this.description.setValue(product.description);
      this.price.setValue(product.date);
    }else {
      this.modalTitle = "Create New Task";
      this.btnTitle = "Save";
      this.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.list()
    .subscribe(response => this.products = response);
  }

  delete(product:IProduct) {
    this.service.delete(product)
    .subscribe(response => this.getList());
  }

  save() {
    this.selectProduct.name = this.name.value;
    this.selectProduct.description = this.description.value;
    this.selectProduct.date = this.price.value;

    if(this.btnTitle == 'Update'){
      this.service.update(this.selectProduct)
      .subscribe(Response=>{
        this.getList();
      });
    }else{
      this.service.add(this.selectProduct)
      .subscribe(Response=>{
        this.getList();
      });

    }
  }
  reset() {
    this.name.reset();
    this.description.reset();
    this.price.reset();
  }

}
