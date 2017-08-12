import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
    getAll() {
        return this.getProducts();
    }

    getAllMerchants() {
        return this.getMerchants();
    }

    getById(id: number) {
        return this.getProducts().find(product => product.id === id);
    }

    getByMerchantId(id: number){
        return this.getMerchants().find(merchant => merchant.id === id);
    }

    transact(transaction: any){
        let transactions = this.getTransactions();

        // create new transaction

        // save to local storage
        transactions.push(transaction);
        this.setTransactions(transactions);
    } 

    saveMerchants(merchant: any) {
        let merchants = this.getMerchants();

        // create new merchant

        // assign id
        var lastmerchant = merchants[merchants.length - 1] || { id: 0 };
        merchant.id = lastmerchant.id + 1;

        // save to local storage
        merchants.push(merchant);
        this.setMerchants(merchants);
    }

    save(product: any) {
        let products = this.getProducts();

        if (product.id) {
            // update existing product

            for (var i = 0; i < products.length; i++) {
                if (products[i].id === product.id) {
                    products[i] = product;
                    break;
                }
            }
            this.setProducts(products);
        } else {
            // create new product

            // assign id
            var lastProduct = products[products.length - 1] || { id: 0 };
            product.id = lastProduct.id + 1;

            // save to local storage
            products.push(product);
            this.setProducts(products);
        }
    }

    delete(id: number) {
        let products = this.getProducts();
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            if (product.id === id) {
                products.splice(i, 1);
                break;
            }
        }
        this.setProducts(products);
    }

    // private helper methods

    private getMerchants(): any[] { 
        if (!localStorage.getItem('merchants')) {
            localStorage.setItem('merchants', JSON.stringify([]));
        }

        return JSON.parse(localStorage.getItem('merchants'));
    }

    private getTransactions(): any[]{
        if (!localStorage.getItem('transactions')) {
            localStorage.setItem('transactions', JSON.stringify([]));
        }

        return JSON.parse(localStorage.getItem('transactions'));
    }

    private setTransactions(transactions: any[]) {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    private setMerchants(merchants: any[]) {
        localStorage.setItem('merchants', JSON.stringify(merchants));
    }

    private getProducts(): any[] {
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify([]));
        }

        return JSON.parse(localStorage.getItem('products'));
    }
    

    private setProducts(products: any[]) {
        localStorage.setItem('products', JSON.stringify(products));
    }
}