import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService{

    constructor(public storageServe : StorageService){

    }

    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storageServe.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart = this.storageServe.getCart();
        if(cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto : ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.items.push({quantidade : 1, produto: produto });
        }
        this.storageServe.setCart(cart);
        return cart;
    }

    removeProduto(produto : ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items.splice(position, 1)
        }
        this.storageServe.setCart(cart);
        return cart;
    }

    increaseQuantity(produto : ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade++;
        }
        this.storageServe.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto : ProdutoDTO) : Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade--;
            if(cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storageServe.setCart(cart);
        return cart;
    }

    total() : number{
        let cart = this.getCart();
        let sum = 0;
        for(var i = 0; i <cart.items.length; i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }


    



}