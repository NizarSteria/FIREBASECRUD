import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheet, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';

import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item-interface';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController) {
    // Pointing shoppingListRef$ at Firebase -> 'shopping-list' node
    this.shoppingListRef$ = this.database.list('shopping-list');

    this.shoppingListRef$.subscribe(x => console.log(x));
  }

  navigateToAddShoppingPage() {
    // Navigate user to the AddShoppingPage
    this.navCtrl.push(AddShoppingPage);
  }

  /* Display an action sheet that gives the user the following
 options:

  1. Edit the shopping item
  2; Delete the shopping item
  3. cancel selection
 */
  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            // send the user to the EditShoppingItem Page and pass
            // key as a parameter
            this.navCtrl.push(EditShoppingItemPage,
                 {shoppingItemId: shoppingItem.$key});
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // delete the current ShoppingItem
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("the user has selected the cancel button");
          }
        }
      ]
    }).present();
  }

}
