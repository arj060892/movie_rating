import { FormGroup } from '@angular/forms';
export class Utility {

   static onValidateForm(formGroup: FormGroup): boolean {
      Object.keys(formGroup.controls).map(controlName => {
         formGroup.get(controlName).markAsTouched({ onlySelf: true });
      });
      return false;
   }
   static sort(itemList: any[], sortOn: any, sortByAsc: boolean): any[] {
      let returnValue = 0;
      if (sortOn === 'movie') {
         itemList.sort((a, b) => {
            const firstString = a[sortOn].toLowerCase().trim(),
               secondString = b[sortOn].toLowerCase().trim();
            returnValue = (sortByAsc) ?
               (firstString < secondString ? -1 : 1) : (firstString > secondString ? -1 : 1);
            return returnValue;
         });
      } else if (sortOn === 'releaseDate') {
         itemList.sort((a, b) => {
            returnValue = (sortByAsc) ?
               (new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
               : (new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
            return returnValue;
         });
      }
      return itemList;
   }
   static search(itemList: any[], searchOn: any, searchString: string) {
      return itemList.filter(e => (e[searchOn].toLowerCase().trim().indexOf(searchString) !== -1));
   }
}
