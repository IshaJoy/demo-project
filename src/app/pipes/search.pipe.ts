import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {


  // transform(users: any[], searchKey: string): any[] {
  //   if (!users || !searchKey) {
  //     return users;
  //   }

  //   return users.filter(user =>
  //     user.username?.trim().toLowerCase().includes(searchKey.trim().toLowerCase())
  //   );
  // }

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return item.username.toLowerCase().includes(searchText);
    });
  }

}
