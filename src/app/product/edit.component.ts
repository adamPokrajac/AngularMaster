import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../models/product';
import { ShopService } from '../services/shop.service';

@Component({
    selector: 'edit-product',
    templateUrl: './edit.component.html'
})
export class EditProductComponent implements OnInit {

    data: Product = new Product();
    categories: string[] = [];

    @Output()
    closeFormClicked = new EventEmitter();

    constructor(private shopService: ShopService) { }

    ngOnInit(): void {
        this.shopService.getCategories().subscribe(p => { this.categories = p });
    }

    closeForm() {
        this.closeFormClicked.emit();
    }

    onSubmit(form: NgForm) {
        console.log(form.value);

        console.log(this.data);

        this.shopService.saveProduct(this.data).subscribe(response => {
            console.log(response);
            form.resetForm();
        });
    }

}
