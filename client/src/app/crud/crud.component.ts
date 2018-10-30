import { Component, OnInit } from '@angular/core';
import { UserItem } from '../UserItem';
//import { CrudS } from '../mock-Cruds';
import { CrudServiceService } from '../crud-service.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  TheUsers: UserItem[];

  selectedUserItem: UserItem;
  selectedCrudItemPriorUsername: string;

  getUsers(): void {
    this.myCrudServiceService.getAllUsers().subscribe((UserData: UserItem[]) => {
      this.TheUsers = UserData;
    })
  }

  onSelect(PassedInUserItem: UserItem): void {
    this.selectedUserItem = PassedInUserItem;
    this.selectedCrudItemPriorUsername = this.selectedUserItem.username;
  }

  addNew(iFirstname: string, iLastname: string, iUsername: string, iPassword: string): void {
    iFirstname = iFirstname.trim();
    iLastname = iLastname.trim();
    iUsername = iUsername.trim();
    if (!iUsername) { return; }
    iPassword = iPassword.trim();
    var newID = Object;
    var newItem: UserItem = { firstname: iFirstname, lastname: iLastname, username: iUsername, password: iPassword, _id: newID };
    this.myCrudServiceService.insertUser(newItem as UserItem)
      .subscribe(oneUser => {
        this.getUsers();    // call our own get all method to get a fresh copy and update our local array
        window.location.reload(); // esp to get the new _id that was created so it is available for deletes and updates
        // this is probably a bad way to refresh our array and browser display
        // I hope a student will tell me how to do this more efficiently
      });
  }

  updateUser(): void {
    var idToUpdate = this.selectedUserItem._id;
    var updateItem: UserItem = this.selectedUserItem;
    this.myCrudServiceService.updateUser(idToUpdate as Number, updateItem as UserItem)
      .subscribe(
        // nothing to do
      );
  }

  deleteUser(deleteUserId: Number): void {
    this.myCrudServiceService.deleteUser(deleteUserId as Number) // it is a base 16 number
      .subscribe();
    // update local data
    var pointer = this.TheUsers.length - 1;
    for (pointer; pointer >= 0; pointer--) {
      if (this.TheUsers[pointer]._id === deleteUserId) {
        this.TheUsers.splice(pointer, 1);
      }
    };
  }

  constructor(private myCrudServiceService: CrudServiceService) { }

  ngOnInit() {
    this.getUsers();
  }

  // oneNote: CrudItem = {
  //   id: 1,
  //   title: "Get Lunch",
  //   detail: "Go to the cafeteria and get some lunch at noon.",
  //   priority: 2
  // }
}
