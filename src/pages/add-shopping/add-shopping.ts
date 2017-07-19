import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item-interface'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase
  ) {
    this.shoppingItemRef$ = this.database.list('shopping-list');
    /**
     * shopping list
     */
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    console.log(shoppingItem);
    /**
     * Create a new anonyms object and convert itemNumber to 
     * a number.
     * push this to our Firebase database under the 'shopping-list'
     * node.
     */
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });
    /**
   * Reset our hopping item
   */
    this.shoppingItem = {} as ShoppingItem;

    // Navigate the user back to the shopping list page
    this.navCtrl.pop();
  }

}
