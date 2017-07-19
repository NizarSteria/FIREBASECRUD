import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';

import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item-interface';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams
  , private database: AngularFireDatabase) {
    // Pointing shoppingListRef$ at Firebase -> 'shopping-list' node
    this.shoppingListRef$ = this.database.list('shopping-list');

    this.shoppingListRef$.subscribe( x => console.log(x));
  }

  navigateToAddShoppingPage (){
    // Navigate user to the AddShoppingPage
    this.navCtrl.push(AddShoppingPage);
  }

}
